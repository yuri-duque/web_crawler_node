import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import defaultRouter from "./controllers/crawlerController";

dotenv.config();

const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOSTNAME || "http://localhost";

const app = express();

app.use(express.static("public"));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: ["http://localhost:4000"] }));

app.use("/api", defaultRouter);

app.use(function (req, res) {
  res.status(404).json({ message: "Erro ao get router" });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${HOSTNAME}:${PORT}/docs`);
});
