import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRouter from "./route/userRoutes.js";
import connectDataBase from "./utils/db.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: ['http://localhost:5000', 'https://customauth.framer.website'],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
})

app.use('/api/v1/user', userRouter);

const connection = async () => {
    await connectDataBase();
    app.listen(port, () => {
        console.log(`http://localhost:${port}`)
    })
}

connection();
