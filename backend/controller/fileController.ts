import { Request, Response } from "express";
const { success, failure } = require("../utils/successError");
const xlsx = require("xlsx");
const fileModel = require("../model/file");
import { FileResponse } from "../types/interface";

class FileController {
  async fileUpload(req: Request, res: Response): Promise<Response> {
    try {
      const file = req.file as Express.Multer.File | undefined;

      if (!file) {
        return res.status(400).send(failure("No file uploaded"));
      }

      const workbook = xlsx.read(file.buffer, { type: "buffer" });
      let workbook_sheet = workbook.SheetNames;
      let workbook_response = xlsx.utils.sheet_to_json(
        workbook.Sheets[workbook_sheet[0]]
      );

      const workbook_response_trimmed = workbook_response.map(
        (entry: FileResponse) => {
          if (entry.Employee) {
            entry.Employee = entry.Employee.replace(/\s+\d+$/, "");
          }
          return entry;
        }
      );

      const newFile = new fileModel({
        file: workbook_response_trimmed,
      });

      const saveFile = await newFile.save();

      return res
        .status(200)
        .send(success("File uploaded successfully", saveFile));
    } catch (error) {
      console.log(error);
      return res.status(500).send(failure("Something went wrong", error));
    }
  }
}

export default new FileController();
