import { describe, it, expect } from "@jest/globals";
import {
    mapNodeToCommit,
    mapPropsToCommit,
} from "../../src/git-log/commit-mapper.js";

describe("commit-mapper", () => {
    describe("mapNodeToCommit", () => {
        it("should map node properties to Commit type", () => {
            const mockNode = {
                properties: {
                    hash: "abc123def456",
                    name: "Test Commit",
                    date: "2024-01-01T00:00:00Z",
                    description: "Test description",
                },
            } as any;

            const result = mapNodeToCommit(mockNode);

            expect(result.hash).toBe("abc123def456");
            expect(result.name).toBe("Test Commit");
            expect(result.date).toBe("2024-01-01T00:00:00Z");
            expect(result.description).toBe("Test description");
        });

        it("should create empty connection fields", () => {
            const mockNode = {
                properties: {
                    hash: "abc123",
                    name: "Test",
                    date: "2024-01-01",
                },
            } as any;

            const result = mapNodeToCommit(mockNode);

            expect(result.next).toEqual([]);
            expect(result.previous).toBeNull();
            expect(result.nextConnection.edges).toEqual([]);
            expect(result.nextConnection.totalCount).toBe(0);
            expect(result.previousConnection.edges).toEqual([]);
            expect(result.previousConnection.totalCount).toBe(0);
            expect(result.filesystemConnection.edges).toEqual([]);
            expect(result.filesystemConnection.totalCount).toBe(0);
        });

        it("should handle missing optional fields", () => {
            const mockNode = {
                properties: {
                    hash: "abc123",
                    name: "Test",
                    date: "2024-01-01",
                    // description is missing
                },
            } as any;

            const result = mapNodeToCommit(mockNode);

            expect(result.description).toBeUndefined();
        });

        it("should set correct pageInfo structure", () => {
            const mockNode = {
                properties: {
                    hash: "abc123",
                    name: "Test",
                    date: "2024-01-01",
                },
            } as any;

            const result = mapNodeToCommit(mockNode);

            expect(result.nextConnection.pageInfo).toEqual({
                hasNextPage: false,
                hasPreviousPage: false,
            });
            expect(result.previousConnection.pageInfo).toEqual({
                hasNextPage: false,
                hasPreviousPage: false,
            });
            expect(result.filesystemConnection.pageInfo).toEqual({
                hasNextPage: false,
                hasPreviousPage: false,
            });
        });
    });

    describe("mapPropsToCommit", () => {
        it("should map raw properties to Commit type", () => {
            const props = {
                hash: "xyz789",
                name: "Another Commit",
                date: "2024-06-15T12:00:00Z",
                description: "Another description",
            };

            const result = mapPropsToCommit(props);

            expect(result.hash).toBe("xyz789");
            expect(result.name).toBe("Another Commit");
            expect(result.date).toBe("2024-06-15T12:00:00Z");
            expect(result.description).toBe("Another description");
        });

        it("should create empty connection fields", () => {
            const props = {
                hash: "xyz789",
                name: "Test",
                date: "2024-01-01",
            };

            const result = mapPropsToCommit(props);

            expect(result.next).toEqual([]);
            expect(result.previous).toBeNull();
            expect(result.nextConnection.totalCount).toBe(0);
            expect(result.previousConnection.totalCount).toBe(0);
            expect(result.filesystemConnection.totalCount).toBe(0);
        });

        it("should produce same output as mapNodeToCommit for equivalent input", () => {
            const props = {
                hash: "abc123",
                name: "Test",
                date: "2024-01-01",
                description: "Desc",
            };

            const mockNode = {
                properties: props,
            } as any;

            const fromNode = mapNodeToCommit(mockNode);
            const fromProps = mapPropsToCommit(props);

            expect(fromNode).toEqual(fromProps);
        });
    });
});
