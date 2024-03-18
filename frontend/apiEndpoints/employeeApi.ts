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

export const GetAllEmployeesApi = async (id: string, searchQuery?: string) => {
  try {
    const queryParams: { [key: string]: string | number | undefined } = {
      search: searchQuery,
    };

    let queryString = Object.entries(queryParams)
      .filter(([key, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    const response = await axiosInstance(
      `/api/v1/employee/get-all-employees/${id}?${queryString}`
    );
    const data = response.data;
    console.log("items", data.data);

    if (data.success === false) {
      console.log("Error: ", data.message);
    }

    return data.data;
  } catch (error: any) {
    console.error(
      error.message || "An unknown error occurred during fetching data"
    );
  }
};

export const GetEmployeeDetailsApi = async (id: string, date: any) => {
  return axiosInstance
    .get(`/api/v1/employee/get-employee-details/${id}/${date}`)
    .then((response) => {
      console.log("response", response.data.data);
      return response.data.data;
    })
    .catch((error) => {
      console.log("error", error);
    });
};
