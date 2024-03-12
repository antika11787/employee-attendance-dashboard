import { Request, Response } from "express";
const { success, failure } = require("../utils/successError");
const xlsx = require("xlsx");
const fileModel = require("../model/file");
import { FileResponse, FileResponseRaw } from "../types/interface";

class FileController {
  async fileUpload(req: Request, res: Response): Promise<Response> {
    try {
      const file = req.file as Express.Multer.File | undefined;

      if (!file) {
        return res.status(400).send(failure("No file uploaded"));
      }

      const workbook = xlsx.read(file.buffer);
      let workbook_sheet = workbook.SheetNames;
      let workbook_response = xlsx.utils.sheet_to_json(
        workbook.Sheets[workbook_sheet[0]]
      );

      const workbook_response_columns = workbook_response.map(
        (entry: FileResponseRaw) => {
          const checkIn = new Date(entry["Check In"]);
          const checkOut = new Date(entry["Check Out"]);

          checkIn.setHours(checkIn.getHours() + 6);
          checkOut.setHours(checkOut.getHours() + 6);

          const mappedEntry: FileResponse = {
            employee: entry.Employee,
            employee_id: entry["Employee ID"],
            check_in: checkIn,
            check_out: checkOut,
            worked_hours: entry["Worked Hours (H.M)"],
            late_hours: entry["Late Hours (H.M)"],
            early_leave_hours: entry["Early Leave Hours (H.M)"],
            over_time: entry["Over Time (H.M)"],
          };
          return mappedEntry;
        }
      );

      const workbook_response_trimmed = workbook_response_columns.map(
        (entry: FileResponse) => {
          if (entry.employee) {
            entry.employee = entry.employee.replace(/\s+\d+$/, "");
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

  async getDates(req: Request, res: Response): Promise<Response> {
    try {
      const dates = await fileModel.findOne();
      const result = dates?.file.map((entry: FileResponse) => {
        return new Date(entry.check_in).toISOString().split("T")[0];
      });
      // .filter(
      //   (date: string, index: number, self: string[]) =>
      //     self.indexOf(date) === index
      // );

      return res
        .status(200)
        .send(success("Dates fetched successfully", result));
    } catch (error) {
      console.log(error);
      return res.status(500).send(failure("Something went wrong", error));
    }
  }

  async totalCheckIns(req: Request, res: Response): Promise<Response> {
    try {
      const { date } = req.body;
      if (!date) {
        return res.status(400).send(failure("No date provided"));
      }

      const count = await fileModel.countDocuments({ check_in: date });

      return res.status(200).send(success("Dates fetched successfully", count));
    } catch (error) {
      console.log(error);
      return res.status(500).send(failure("Something went wrong", error));
    }
  }
}

export default new FileController();
