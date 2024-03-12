import { axiosInstance, axiosInstanceToken } from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { FileResponse, FileUpload } from "@/types/interface";
import dotenv from "dotenv";
dotenv.config();

export const UploadFileApi = async (file: any) => {
  return axiosInstance
    .post("/api/v1/file/upload-file", file)
    .then((response) => {
      console.log("response", response.data.data);
      toast.success("File uploaded successfully");
      return response.data.data;
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const totalCheckInApi = async (date: any) => {
  return axiosInstance
    .post("/api/v1/file/total-checkin", {date: date})
    .then((response) => {
      console.log("response", response.data.data);
      return response.data.data;
    })
    .catch((error) => {
      console.log("error", error);
    });
};
