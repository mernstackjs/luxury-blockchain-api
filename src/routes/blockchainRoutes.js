import express from "express";
import { getChain, createTransaction } from "../controllers/blockchainController.js";

const router = express.Router();

router.get("/chain", getChain);
router.post("/transactions", createTransaction);

export default router;