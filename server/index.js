import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import {connectDB} from "./utils/dbConnection.js";
dotenv.config(
    {
        path: "./.env"
    }
);

const app = express();
connectDB();

//Middlewares-->
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin: "http://localhost:5173", 
        credentials: true,
    }
));

//Routes-->

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 