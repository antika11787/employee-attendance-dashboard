import { Document, Types } from "mongoose";
import { Request } from "express";

interface CustomRequest extends Request {
  file_extension?: string;
}

interface IFile extends Document {
  file: string;
}

interface FileResponse {
  Employee: string;
  "Employee ID": string;
  "Check In": Date;
  "Check Out": Date;
  "Worked Hours (H.M)": Number;
  "Late Hours (H.M)": Number;
  "Early Leave Hours (H.M)": Number;
  "Over Time (H.M)": Number;
}

export { CustomRequest, IFile, FileResponse };
