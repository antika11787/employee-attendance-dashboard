import { Schema, model } from "mongoose";
import { IFile } from "../types/interface";

const fileUploadSchema = new Schema<IFile>({
  file: [
    {
      employee: String,
      employee_id: String,
      check_in: Date,
      check_out: Date,
      worked_hours: Number,
      late_hours: Number,
      early_leave_hours: Number,
      over_time: Number,
    },
  ],
});

const FileUpload = model<IFile>("file", fileUploadSchema);
module.exports = FileUpload;
