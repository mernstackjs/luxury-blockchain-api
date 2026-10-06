import { describe, it, expect } from "vitest";
import Blockchain from "../src/engine/Blockchain.js";

describe("Blockchain", () => {
    it("creates a genesis block", () => {
        const blockchain = new Blockchain();

        expect(blockchain.chain.length).toBe(1);
        expect(blockchain.chain[0].index).toBe(0);
    });

    it("adds a transaction to pending transactions", () => {
        const blockchain = new Blockchain();

        blockchain.addTransaction({
            serialNumber: "ROLEX-001",
            from: "Rolex",
            to: "Ahmed"
        });

        expect(blockchain.pendingTransactions.length).toBe(1);
    });

    it("mines pending transactions", () => {
        const blockchain = new Blockchain();

        blockchain.addTransaction({
            serialNumber: "ROLEX-001",
            from: "Rolex",
            to: "Ahmed"
        });

        blockchain.minePendingTransactions();

        expect(blockchain.chain.length).toBe(2);
        expect(blockchain.pendingTransactions.length).toBe(0);
    });

    it("rejects transaction from wrong owner", () => {
        const blockchain = new Blockchain();

        blockchain.addTransaction({
            serialNumber: "ROLEX-001",
            from: "Rolex",
            to: "Ahmed"
        });

        blockchain.minePendingTransactions();

        expect(() => {
            blockchain.addTransaction({
                serialNumber: "ROLEX-001",
                from: "Ali",
                to: "Muna"
            });
        }).toThrow("Sender is not the current owner");
    });

    it("detects an invalid blockchain", () => {
        const blockchain = new Blockchain();

        blockchain.addTransaction({
            serialNumber: "ROLEX-001",
            from: "Rolex",
            to: "Ahmed"
        });

        blockchain.minePendingTransactions();

        expect(blockchain.isChainValid()).toBe(true);

        blockchain.chain[1].data[0].to = "Ali";

        expect(blockchain.isChainValid()).toBe(false);
    });

    it("rejects invalid transaction data", () => {
        const blockchain = new Blockchain();

        expect(() => {
            blockchain.addTransaction({
                serialNumber: 123,
                from: "Rolex",
                to: "Ahmed"
            });
        }).toThrow("Invalid transaction data");
    });

    it("rejects transaction with same sender and receiver", () => {
        const blockchain = new Blockchain();

        expect(() => {
            blockchain.addTransaction({
                serialNumber: "ROLEX-001",
                from: "Ahmed",
                to: "Ahmed"
            });
        }).toThrow("Sender and receiver cannot be the same");
    });
});