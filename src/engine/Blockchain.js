import Block from "./Block.js";

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.pendingTransactions = [];
        this.difficulty = 2;
    }

    createGenesisBlock() {
        return new Block(
            0,
            Date.now(),
            {
                message: "Genesis Block"
            },
            "0"
        );
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(data) {
        const newBlock = new Block(
            this.chain.length,
            Date.now(),
            data,
            this.getLatestBlock().hash
        );

        newBlock.mineBlock(this.difficulty);

        this.chain.push(newBlock);

        return newBlock;
    }

    addTransaction(transaction) {
        const { serialNumber, from, to } = transaction;

        if (!serialNumber || !from || !to) {
            throw new Error("Missing transaction data");
        }

        const currentOwner = this.getCurrentOwner(serialNumber);

        if (currentOwner && currentOwner !== from) {
            throw new Error("Sender is not the current owner");
        }

        this.pendingTransactions.push(transaction);

        return transaction;
    }

    minePendingTransactions() {
        if (this.pendingTransactions.length === 0) {
            return null;
        }

        const newBlock = new Block(
            this.chain.length,
            Date.now(),
            this.pendingTransactions,
            this.getLatestBlock().hash
        );

        newBlock.mineBlock(this.difficulty);

        this.chain.push(newBlock);

        this.pendingTransactions = [];

        return newBlock;
    }

    getCurrentOwner(serialNumber) {
        let currentOwner = null;

        for (const block of this.chain) {
            if (!Array.isArray(block.data)) {
                continue;
            }

            for (const transaction of block.data) {
                if (transaction.serialNumber === serialNumber) {
                    currentOwner = transaction.to;
                }
            }
        }

        for (const transaction of this.pendingTransactions) {
            if (transaction.serialNumber === serialNumber) {
                currentOwner = transaction.to;
            }
        }

        return currentOwner;
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

export default Blockchain;