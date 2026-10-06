import { describe, it, expect } from "vitest";
import Block from "../src/engine/Block.js";

describe("Block", () => {
    it("creates a block", () => {
        const block = new Block(
            1,
            1000,
            {
                from: "Rolex",
                to: "Ahmed"
            },
            "abc123"
        );

        expect(block.index).toBe(1);
        expect(block.timestamp).toBe(1000);
        expect(block.previousHash).toBe("abc123");
        expect(block.nonce).toBe(0);
        expect(block.hash).toBeDefined();
    });

    it("changes hash when data changes", () => {
        const block = new Block(
            1,
            1000,
            {
                from: "Rolex",
                to: "Ahmed"
            },
            "abc123"
        );

        const oldHash = block.hash;

        block.data.to = "Muna";

        const newHash = block.calculateHash();

        expect(newHash).not.toBe(oldHash);
    });

    it("mines a block with the correct difficulty", () => {
        const block = new Block(
            1,
            1000,
            {
                from: "Rolex",
                to: "Ahmed"
            },
            "abc123"
        );

        block.mineBlock(2);

        expect(block.hash.startsWith("00")).toBe(true);
    });
});