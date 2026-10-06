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