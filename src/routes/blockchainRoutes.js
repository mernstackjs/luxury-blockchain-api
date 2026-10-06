import express from "express";
import { getChain, createTransaction, mineTransactions, verifyProduct } from "../controllers/blockchainController.js";

const router = express.Router();

router.get("/chain", getChain);
router.post("/transactions", createTransaction);
router.post("/mine", mineTransactions);
router.get("/verify/:id", verifyProduct);
export default router;