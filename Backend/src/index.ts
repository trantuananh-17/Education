import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import logRequestTime from "./middleware/winston.middleware";
import router from "./routes";
import { connectDB } from "./config/db.config";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;
const CLIENT_URL = process.env.CLIENT_URL || "";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(logRequestTime);

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
  connectDB();
});
