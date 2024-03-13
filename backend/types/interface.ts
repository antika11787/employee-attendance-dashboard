import { Document, Types } from "mongoose";
import { Request } from "express";

interface CustomRequest extends Request {
  file_extension?: string;
}

interface FileResponse {
  employee: String;
  employee_id: String;
  check_in: String;
  check_out: String;
  worked_hours: Number;
  late_hours: Number;
  early_leave_hours: Number;
  over_time: Number;
}

interface IFile extends Document {
  file: FileResponse[];
}

interface ITotal extends Document {
  total: string;
}

interface FileResponseRaw {
  Employee: String;
  "Employee ID": String;
  "Check In": String;
  "Check Out": String;
  "Worked Hours (H.M)": Number;
  "Late Hours (H.M)": Number;
  "Early Leave Hours (H.M)": Number;
  "Over Time (H.M)": Number;
}

export { CustomRequest, IFile, FileResponse, FileResponseRaw, ITotal };