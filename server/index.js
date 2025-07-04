import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import {connectDB} from "./utils/dbConnection.js";
import userRouter from "./routes/user.route.js"
import driverRouter from "./routes/driver.route.js"

dotenv.config(
    {
        path: "./.env"
    }
);

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

//Middlewares-->
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(
    {
        origin: "http://localhost:5173", 
        credentials: true,
    }
));

//Routes-->
app.use("/api/v1/users",userRouter);
app.use("/api/v1/drivers",driverRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 