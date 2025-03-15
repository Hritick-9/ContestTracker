
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './src/config/db.js';
import dotenv from 'dotenv';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});