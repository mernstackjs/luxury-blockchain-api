import express from "express";
import { getChain, createTransaction, mineTransactions } from "../controllers/blockchainController.js";

const router = express.Router();

router.get("/chain", getChain);
router.post("/transactions", createTransaction);
router.post("/mine", mineTransactions);

export default router;