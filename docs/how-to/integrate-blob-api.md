# How to Integrate the Blob Download API (Frontend)

## Overview

This guide shows how to integrate the blob download REST API into your frontend application.

## Prerequisites

- Access to the GraphQL API (for getting blob hashes)
- API base URL (e.g., `https://api.oswatcher.io`)
- Optional: Auth0 JWT token for authenticated requests

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
   * @param authToken Optional JWT token
   */
  async downloadBlob(
    hash: string,
    filename?: string,
    authToken?: string
  ): Promise<void> {
    const url = `${this.blobBaseUrl}/${hash}`;

    const headers: Record<string, string> = {};
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    try {
      const response = await fetch(url, { headers });

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
      case 403:
        throw new Error('This file is restricted and cannot be downloaded.');
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
    filename?: string,
    authToken?: string
  ): Promise<void> {
    const url = `${this.blobBaseUrl}/${hash}`;

    const headers: Record<string, string> = {};
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    const response = await fetch(url, { headers });

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
import { useAuth0 } from '@auth0/auth0-react';

export function FileExplorer() {
  const blobService = new BlobService(API_CONFIG.blobUrl);
  const { getAccessTokenSilently } = useAuth0();

  const handleDownload = async (blobHash: string, filename: string) => {
    try {
      // Get auth token if available
      const token = await getAccessTokenSilently().catch(() => undefined);

      // Download blob
      await blobService.downloadBlob(blobHash, filename, token);

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

## Step 4: Handle Restricted Blobs

### Show User-Friendly Error Messages

```typescript
// components/DownloadButton.tsx

import { useState } from 'react';
import { BlobService } from '../services/blobService';

interface DownloadButtonProps {
  hash: string;
  filename: string;
  authToken?: string;
}

export function DownloadButton({ hash, filename, authToken }: DownloadButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const blobService = new BlobService(API_CONFIG.blobUrl);

  const handleDownload = async () => {
    setLoading(true);
    setError(null);

    try {
      await blobService.downloadBlob(hash, filename, authToken);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleDownload}
        disabled={loading}
      >
        {loading ? 'Downloading...' : 'Download'}
      </button>

      {error && (
        <div className="error-message">
          {error}
          {error.includes('restricted') && (
            <p className="help-text">
              This file is from a restricted branch (e.g., Windows)
              and cannot be downloaded due to licensing restrictions.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
```

### Precheck Before Download (Optional)

You can add a HEAD request to check if a blob is accessible before attempting download:

```typescript
export class BlobService {
  /**
   * Check if a blob is accessible
   */
  async isAccessible(hash: string, authToken?: string): Promise<boolean> {
    const url = `${this.blobBaseUrl}/${hash}`;
    const headers: Record<string, string> = {};
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    try {
      const response = await fetch(url, {
        method: 'HEAD',
        headers
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

// Usage:
const accessible = await blobService.isAccessible(hash, token);
if (!accessible) {
  showWarning('This file is restricted');
}
```

## Step 5: Update Existing S3 References

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
await blobService.downloadBlob(blobHash, filename, authToken);
```

## Testing

### Test Cases

1. **Unrestricted blob download**
   - Expected: Successful download

2. **Restricted blob download**
   - Expected: 403 error with user-friendly message

3. **Invalid hash format**
   - Expected: 400 error

4. **Non-existent blob**
   - Expected: 404 error

5. **Authenticated vs unauthenticated**
   - Both should work the same (auth doesn't affect restrictions currently)

### Example Test

```typescript
// blobService.test.ts

describe('BlobService', () => {
  it('should download unrestricted blob', async () => {
    const service = new BlobService('http://localhost:4000/blob');
    await expect(
      service.downloadBlob('a94a8fe5ccb19ba61c4c0873d391e987982fbbd3')
    ).resolves.not.toThrow();
  });

  it('should reject restricted blob', async () => {
    const service = new BlobService('http://localhost:4000/blob');
    await expect(
      service.downloadBlob('restricted_hash_here')
    ).rejects.toThrow('restricted');
  });
});
```

## Performance Considerations

### Caching

The API doesn't cache authorization results, so each download checks the database.

**Recommendation**: Cache the accessibility check result client-side for a short time:

```typescript
const accessCache = new Map<string, { accessible: boolean; timestamp: number }>();
const CACHE_TTL = 60000; // 1 minute

async function isCachedAccessible(hash: string, token?: string): Promise<boolean> {
  const cached = accessCache.get(hash);
  const now = Date.now();

  if (cached && now - cached.timestamp < CACHE_TTL) {
    return cached.accessible;
  }

  const accessible = await blobService.isAccessible(hash, token);
  accessCache.set(hash, { accessible, timestamp: now });
  return accessible;
}
```

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
- [Configure Blob Restrictions](./configure-blob-restrictions.md) - Backend configuration
- [Authorization Explanation](../explanation/blob-authorization.md) - How restrictions work
