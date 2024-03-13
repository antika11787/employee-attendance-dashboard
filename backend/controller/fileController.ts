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
          const mappedEntry: FileResponse = {
            employee: entry.Employee,
            employee_id: entry["Employee ID"],
            check_in: entry["Check In"],
            check_out: entry["Check Out"],
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

      newFile.file.forEach((entry: FileResponse) => {
        if (entry.check_in) {
          entry.check_in = entry.check_in.split(" ")[0];
        }
        if (entry.check_out) {
          entry.check_out = entry.check_out.split(" ")[0];
        }
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

  async totalCheckIns(req: Request, res: Response): Promise<Response> {
    try {
      const { id, date } = req.body;
      let total = 0;
      if (!id || !date) {
        return res.status(400).send(failure("No date provided"));
      }

      const files = await fileModel.findById(id);

      const checkIns = files.file.filter((data: FileResponse) => {
        return data.check_in === date;
      });

      total = checkIns.length;

      return res.status(200).send(success("Dates fetched successfully", total));
    } catch (error) {
      console.log(error);
      return res.status(500).send(failure("Something went wrong", error));
    }
  }

  async totalLate(req: Request, res: Response): Promise<Response> {
    try {
      const { id, date } = req.body;
      let total = 0;
      if (!id || !date) {
        return res.status(400).send(failure("No date provided"));
      }

      const files = await fileModel.findById(id);

      const late = files.file.filter((data: FileResponse) => {
        return (data.late_hours as number) > 0 && data.check_in === date;
      });

      total = late.length;

      return res.status(200).send(success("Dates fetched successfully", total));
    } catch (error) {
      console.log(error);
      return res.status(500).send(failure("Something went wrong", error));
    }
  }
}

export default new FileController();
