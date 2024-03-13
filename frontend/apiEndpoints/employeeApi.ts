import { axiosInstance, axiosInstanceToken } from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { FileResponse, FileUpload } from "@/types/interface";
import dotenv from "dotenv";
dotenv.config();

export const UpdateTotalEmployeeApi = async (data: any) => {
  return axiosInstance
    .patch("/api/v1/employee/update-total-employees", data)
    .then((response) => {
      console.log("response", response.data.data);
      toast.success("Updated successfully");
      return response.data.data;
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const GetTotalEmployeeApi = async () => {
  return axiosInstance
    .get("/api/v1/employee/get-total-employee")
    .then((response) => {
      console.log("response", response.data.data);
      return response.data.data;
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const GetAllEmployeesApi = async (id: string) => {
  return axiosInstance
    .get(`/api/v1/employee/get-all-employees/${id}`)
    .then((response) => {
      console.log("response", response.data.data);
      return response.data.data;
    })
    .catch((error) => {
      console.log("error", error);
    });
};
