import { Document, Types } from "mongoose";
import { Request } from "express";

interface CustomRequest extends Request {
  file_extension?: string;
}

interface FileResponse {
  employee: String;
  employee_id: String;
  check_in: Date;
  check_out: Date;
  worked_hours: Number;
  late_hours: Number;
  early_leave_hours: Number;
  over_time: Number;
}

interface IFile extends Document {
  file: FileResponse[];
}

interface FileResponseRaw {
  Employee: String;
  "Employee ID": String;
  "Check In": Date;
  "Check Out": Date;
  "Worked Hours (H.M)": Number;
  "Late Hours (H.M)": Number;
  "Early Leave Hours (H.M)": Number;
  "Over Time (H.M)": Number;
}

export { CustomRequest, IFile, FileResponse, FileResponseRaw };
