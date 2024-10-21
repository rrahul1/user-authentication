import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

app.use(
   cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
      credentials: true,
   })
);

mongoose
   .connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => console.log("Connected to MongoDB"))
   .catch((err) => console.log("Error connecting to MongoDB:", err));

app.use(express.json());

// Server
const PORT = 5000;
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});

app.use("/api/user", authRoutes);
