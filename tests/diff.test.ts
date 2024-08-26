import { fetchRecursiveNodes } from "../src/diff/diff.js";
import { DiffStatus } from "../src/diff/types.js";

describe('Diff Module', () => {
    describe('fetchRecursiveBlobs', () => {
        it('given max_depth is negative, it should return an empty array', async () => {
            // Arrange
            // create mock driver
            const mockDriver = {} as any

            const result = fetchRecursiveNodes(
                mockDriver,
                "Tree0",
                "abcd",
                "WinSxS",
                DiffStatus.NEW,
                -1,
                null
            );

            // assert
            await expect(result).resolves.toEqual([]);
        });
    });
});
