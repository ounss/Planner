import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import weddingRoutes from "./routes/wedding.js";
import guestRoutes from "./routes/guest.js";
import vendorRoutes from "./routes/vendor.js";
import budgetRoutes from "./routes/budget.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/wedding", weddingRoutes);
app.use("/api/guest", guestRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/budget", budgetRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
