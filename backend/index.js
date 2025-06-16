import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import data from "./models/user.js";
import authRouter from "./Routes/auth.js";
import cookieParser from "cookie-parser";

const app = express();
connectDB();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;
const coreOptions = {
  origin: FRONTEND_URL,
  methods: ["POST", "GET"],
  credentials: true,
};
app.use(cors(coreOptions));

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Your server is running at port ${PORT} `);
});
