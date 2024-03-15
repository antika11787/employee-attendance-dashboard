import { axiosInstance, axiosInstanceToken } from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { FileResponse, FileUpload } from "@/types/interface";
import dotenv from "dotenv";
dotenv.config();

export const UploadFileApi = async (file: any) => {
  return axiosInstance
    .post("/api/v1/file/upload-file", file)
    .then((response) => {
      console.log("re", response.data.data);
      toast.success("File uploaded successfully");
      return response.data.data;
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const totalCheckInApi = async (id: string, date: any) => {
  return axiosInstance
    .post("/api/v1/file/total-checkin", {
      id: id,
      date: date,
    })
    .then((response) => {
      console.log("response", response.data.data);
      return response.data.data;
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const totalLateApi = async (id: string, date: any) => {
  return axiosInstance
    .post("/api/v1/file/total-late", {
      id: id,
      date: date,
    })
    .then((response) => {
      console.log("response", response.data.data);
      return response.data.data;
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const GetUniqueDatesApi = async (id: string) => {
  return axiosInstance
    .get(`/api/v1/file/get-dates/${id}`)
    .then((response) => {
      console.log("response", response.data.data);
      return response.data.data;
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const FileHistoryApi = async () => {
  return axiosInstance
    .get(`/api/v1/file/get-all-files`)
    .then((response) => {
      console.log("response", response.data.data);
      return response.data.data;
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const DeleteFileApi = async (id: string) => {
  return axiosInstance
    .delete(`/api/v1/file/delete-file/${id}`)
    .then((response) => {
      console.log("response", response.data.data);
      return response.data.data;
    })
    .catch((error) => {
      console.log("error", error);
    });
};
