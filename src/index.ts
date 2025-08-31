import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRouter from "./route/userRoutes.js";
import connectDataBase from "./utils/db.js";
import axios from "axios";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: ['http://localhost:5000', 'https://customauth.framer.website'],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use('/api/v1/user', userRouter);

app.get("/keep-alive", (req, res) => {
    res.json({
        success: true
    });
})

const keepAlive = async () => {
    try {
        const { data } = await axios.get(`${process.env.BACKEND_URL}/keep-alive`);
    } catch (e) {
        console.log('Keep-ALive Ping Failed', e);
    }
}

if(process.env.BACKEND_URL){
    setInterval(keepAlive, 1000*14*60);
}


const connection = async () => {
    await connectDataBase();
    app.listen(port, () => {
        console.log(`http://localhost:${port}`)
    })
}

connection();
