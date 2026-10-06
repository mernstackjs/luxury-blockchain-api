import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";

import app from "../src/app.js";
import blockchain from "../src/services/blockchainService.js";

describe("Blockchain API", () => {
    beforeEach(() => {
        blockchain.chain = [blockchain.createGenesisBlock()];
        blockchain.pendingTransactions = [];
    });

    it("gets the blockchain", async () => {
        const response = await request(app)
            .get("/api/chain");

        expect(response.status).toBe(200);
        expect(response.body.chain.length).toBe(1);
        expect(response.body.pendingTransactions).toEqual([]);
    });

    it("adds a transaction", async () => {
        const response = await request(app)
            .post("/api/transactions")
            .send({
                serialNumber: "ROLEX-001",
                from: "Rolex",
                to: "Ahmed"
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Transaction added");
        expect(response.body.transaction.to).toBe("Ahmed");
    });

    it("mines pending transactions", async () => {
        await request(app)
            .post("/api/transactions")
            .send({
                serialNumber: "ROLEX-001",
                from: "Rolex",
                to: "Ahmed"
            });

        const response = await request(app)
            .post("/api/mine");

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Block mined");

        expect(blockchain.chain.length).toBe(2);
        expect(blockchain.pendingTransactions.length).toBe(0);
    });

    it("verifies a product", async () => {
        await request(app)
            .post("/api/transactions")
            .send({
                serialNumber: "ROLEX-001",
                from: "Rolex",
                to: "Ahmed"
            });

        await request(app)
            .post("/api/mine");

        const response = await request(app)
            .get("/api/verify/ROLEX-001");

        expect(response.status).toBe(200);
        expect(response.body.serialNumber).toBe("ROLEX-001");
        expect(response.body.currentOwner).toBe("Ahmed");
        expect(response.body.history.length).toBe(1);
    });

    it("returns 404 when product does not exist", async () => {
        const response = await request(app)
            .get("/api/verify/NOT-FOUND");

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Product not found");
    });

    it("rejects a transaction from the wrong owner", async () => {
        await request(app)
            .post("/api/transactions")
            .send({
                serialNumber: "ROLEX-001",
                from: "Rolex",
                to: "Ahmed"
            });

        await request(app)
            .post("/api/mine");

        const response = await request(app)
            .post("/api/transactions")
            .send({
                serialNumber: "ROLEX-001",
                from: "Ali",
                to: "Muna"
            });

        expect(response.status).toBe(422);
        expect(response.body.message)
            .toBe("Sender is not the current owner");
    });

    it("returns 400 for invalid transaction data", async () => {
        const response = await request(app)
            .post("/api/transactions")
            .send({
                serialNumber: 123,
                from: "Rolex",
                to: "Ahmed"
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid transaction data");
    });

    it("returns 422 when sender and receiver are the same", async () => {
        const response = await request(app)
            .post("/api/transactions")
            .send({
                serialNumber: "ROLEX-001",
                from: "Ahmed",
                to: "Ahmed"
            });

        expect(response.status).toBe(422);

        expect(response.body.message)
            .toBe("Sender and receiver cannot be the same");
    });
});