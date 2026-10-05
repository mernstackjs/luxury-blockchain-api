import express from "express";
import blockchainRoutes from "./routes/blockchainRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Luxury Blockchain API"
    });
});

app.use("/api", blockchainRoutes);

export default app;