# How to Integrate the Blob Download API (Frontend)

## Overview

This guide shows how to integrate the blob download REST API into your frontend application.

## Prerequisites

- Access to the GraphQL API (for getting blob hashes)
- API base URL (e.g., `https://api.oswatcher.io`)

## Step 1: Update Configuration

Add the API base URL to your frontend configuration:

```typescript
// config.ts
export const API_CONFIG = {
  graphqlUrl: 'https://api.oswatcher.io/graphql',
  blobUrl: 'https://api.oswatcher.io/blob',
};
```

## Step 2: Create a Blob Download Service

### Basic Implementation

```typescript
// services/blobService.ts

interface BlobDownloadError {
  error: string;
  message: string;
}

export class BlobService {
  constructor(private blobBaseUrl: string) {}

  /**
   * Download a blob by hash
   * @param hash SHA-1 hash of the blob
   * @param filename Optional filename for download
   */
  async downloadBlob(
    hash: string,
    filename?: string
  ): Promise<void> {
    // Pass `filename` as a query param so the API can serve Windows PE files
    // from the Winbindex fast path. It is ignored for non-PE names.
    const url = filename
      ? `${this.blobBaseUrl}/${hash}?filename=${encodeURIComponent(filename)}`
      : `${this.blobBaseUrl}/${hash}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        await this.handleError(response);
        return;
      }

      // Get blob content
      const blob = await response.blob();

      // Trigger download
      this.triggerDownload(blob, filename || hash);
    } catch (error) {
      console.error('Blob download failed:', error);
      throw error;
    }
  }

  private async handleError(response: Response): Promise<never> {
    const data: BlobDownloadError = await response.json();

    switch (response.status) {
      case 404:
        throw new Error('File not found in storage.');
      case 429:
        throw new Error('Too many requests. Please try again later.');
      default:
        throw new Error(data.message || 'Failed to download file.');
    }
  }

  private triggerDownload(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  /**
   * Get the download URL for a blob (for direct linking)
   */
  getBlobUrl(hash: string): string {
    return `${this.blobBaseUrl}/${hash}`;
  }
}
```

### With Progress Tracking

```typescript
// services/blobService.ts (extended)

export class BlobService {
  // ... previous methods ...

  /**
   * Download blob with progress callback
   */
  async downloadBlobWithProgress(
    hash: string,
    onProgress: (percent: number) => void,
    filename?: string
  ): Promise<void> {
    const url = filename
      ? `${this.blobBaseUrl}/${hash}?filename=${encodeURIComponent(filename)}`
      : `${this.blobBaseUrl}/${hash}`;

    const response = await fetch(url);

    if (!response.ok) {
      await this.handleError(response);
      return;
    }

    const contentLength = response.headers.get('content-length');
    const total = parseInt(contentLength || '0', 10);

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Response body is not readable');
    }

    const chunks: Uint8Array[] = [];
    let receivedLength = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      chunks.push(value);
      receivedLength += value.length;

      if (total > 0) {
        const percent = (receivedLength / total) * 100;
        onProgress(percent);
      }
    }

    // Combine chunks
    const blob = new Blob(chunks);
    this.triggerDownload(blob, filename || hash);
    onProgress(100);
  }
}
```

## Step 3: Integrate with GraphQL Queries

### Keep Using Blob Hashes in Queries

**Important**: Do NOT remove blob hash fields from your GraphQL queries. They are needed for UI display and download triggering.

```typescript
// queries.ts - NO CHANGES NEEDED
export const LIST_ENTRIES_FOR_TREE = gql`
  query ListEntriesForTree($tree_hash: String!) {
    trees(where: { hash: $tree_hash }) {
      child_blobs {
        hash              # Still needed!
        has_winreg {
          hash
        }
      }
      child_trees {
        hash
      }
    }
  }
`;
```

### Download Handler

```typescript
// components/FileExplorer.tsx

import { BlobService } from '../services/blobService';
import { API_CONFIG } from '../config';

export function FileExplorer() {
  const blobService = new BlobService(API_CONFIG.blobUrl);

  const handleDownload = async (blobHash: string, filename: string) => {
    try {
      // Download blob
      await blobService.downloadBlob(blobHash, filename);

      // Success notification
      toast.success(`Downloaded ${filename}`);
    } catch (error) {
      // Error notification
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div>
      {blobs.map(blob => (
        <div key={blob.hash}>
          <button onClick={() => handleDownload(blob.hash, blob.name)}>
            Download
          </button>
        </div>
      ))}
    </div>
  );
}
```

## Step 4: Update Existing S3 References

If you previously downloaded directly from S3, update those references:

### Before (Direct S3)

```typescript
// ❌ Old approach
const s3Url = `https://s3.amazonaws.com/bucket/objects/${blobHash}`;
window.open(s3Url, '_blank');
```

### After (API Proxy)

```typescript
// ✅ New approach
const apiUrl = `https://api.oswatcher.io/blob/${blobHash}`;
await blobService.downloadBlob(blobHash, filename);
```

## Testing

### Test Cases

1. **Blob download**
   - Expected: Successful download

2. **Invalid hash format**
   - Expected: 400 error

3. **Non-existent blob**
   - Expected: 404 error

### Example Test

```typescript
// blobService.test.ts

describe('BlobService', () => {
  it('should download a blob', async () => {
    const service = new BlobService('http://localhost:4000/blob');
    await expect(
      service.downloadBlob('a94a8fe5ccb19ba61c4c0873d391e987982fbbd3')
    ).resolves.not.toThrow();
  });
});
```

## Performance Considerations

### Concurrent Downloads

Implement a download queue to prevent overwhelming the server:

```typescript
class DownloadQueue {
  private queue: Array<() => Promise<void>> = [];
  private running = 0;
  private maxConcurrent = 3;

  async add(download: () => Promise<void>): Promise<void> {
    if (this.running >= this.maxConcurrent) {
      await new Promise(resolve => {
        const check = () => {
          if (this.running < this.maxConcurrent) {
            resolve(undefined);
          } else {
            setTimeout(check, 100);
          }
        };
        check();
      });
    }

    this.running++;
    try {
      await download();
    } finally {
      this.running--;
    }
  }
}
```

## Related Documentation

- [Blob API Reference](../reference/blob-api.md) - Complete API specification
