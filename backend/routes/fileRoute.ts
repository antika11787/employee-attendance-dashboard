import express, { Router } from "express";
import upload from "../config/handleFile";
import fileController from "../controller/fileController";

const routes: Router = express.Router();

routes.post("/upload-file", upload.single("file"), fileController.fileUpload);

export = routes;
