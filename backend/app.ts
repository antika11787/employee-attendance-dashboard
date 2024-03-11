import { Request, Response } from "express";
const express = require("express");
const cors = require("cors");
const databaseConnection = require("./config/database");
const { handleSyntaxError } = require("./utils/errorHandler");
const fileRouter = require("./routes/fileRoute");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(handleSyntaxError);

app.use("/file", fileRouter);

app.route("*").all((req: Request, res: Response) => {
  res.status(400).send("Invalid route!");
});

databaseConnection(() => {
  app.listen(8000, () => {
    console.log("Server is running on port 8000...");
  });
});
