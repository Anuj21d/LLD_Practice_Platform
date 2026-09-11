import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import problemRouter from "./routes/problem.routes";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/problem", problemRouter);

export default app;
