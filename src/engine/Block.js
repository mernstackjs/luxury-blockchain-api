import crypto from "crypto";

import canonicalStringify from "../utils/canonicalStringify.js";

class Block {
    constructor(index, timestamp, data, previousHash = "") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;

        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        const blockData =
            this.index +
            this.timestamp +
            canonicalStringify(this.data) +
            this.previousHash +
            this.nonce;

        return crypto
            .createHash("sha256")
            .update(blockData)
            .digest("hex");
    }

    mineBlock(difficulty) {
        const target = "0".repeat(difficulty);

        while (!this.hash.startsWith(target)) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }
}

export default Block;