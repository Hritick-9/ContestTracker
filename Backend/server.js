
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './src/config/db.js';
import dotenv from 'dotenv';
import contestRoutes from './src/routes/contestRoutes.js';
import "./src/cron/index.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());



app.use("/api/contests", contestRoutes);

app.get("/", (req, res) => {
    res.send("🚀 Contest Tracker API is Running...");
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});