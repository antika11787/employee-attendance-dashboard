import { Schema, model } from "mongoose";
import { IFile } from "../types/interface";

const fileUploadSchema = new Schema<IFile>({
  file: [
    {
      Employee: String,
      "Employee ID": String,
      "Check In": Date,
      "Check Out": Date,
      "Worked Hours (H.M)": Number,
      "Late Hours (H.M)": Number,
      "Early Leave Hours (H.M)": Number,
      "Over Time (H.M)": Number,
    },
  ],
});

const FileUpload = model<IFile>("file", fileUploadSchema);
module.exports = FileUpload;
