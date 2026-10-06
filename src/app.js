import express from "express";
import blockchainRoutes from "./routes/blockchainRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Luxury Blockchain API"
    });
});

app.use("/api", blockchainRoutes);

app.use((_req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

app.use(errorHandler);
export default app;