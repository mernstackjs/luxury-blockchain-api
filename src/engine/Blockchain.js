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
}

export default Blockchain;