import blockchain from "../services/blockchainService.js";

export function getChain(req, res) {
    res.status(200).json({
        chain: blockchain.chain,
        pendingTransactions: blockchain.pendingTransactions
    });
}

export function createTransaction(req, res) {
    const transaction = blockchain.addTransaction(req.body);

    res.status(201).json({
        message: "Transaction added",
        transaction
    });
}

export function mineTransactions(req, res) {
    const block = blockchain.minePendingTransactions();

    if (!block) {
        return res.status(400).json({
            message: "No pending transactions to mine"
        });
    }

    res.status(201).json({
        message: "Block mined",
        block
    });
}