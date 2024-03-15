import { Request, Response } from "express";
import { FileResponse, FilterType } from "../types/interface";
const { success, failure } = require("../utils/successError");
const totalEmployeeModel = require("../model/totalEmployee");
const fileModel = require("../model/file");

class EmployeeController {
  async setTotalEmployees(req: Request, res: Response): Promise<Response> {
    try {
      const { total } = req.body;

      const newTotal = new totalEmployeeModel({
        total,
      });

      const saveTotal = await newTotal.save();

      return res
        .status(200)
        .send(success("Total employees set successfully", saveTotal));
    } catch (error) {
      console.log(error);
      return res.status(500).send(failure("Something went wrong", error));
    }
  }
  async updateTotalEmployees(req: Request, res: Response): Promise<Response> {
    try {
      const { total } = req.body;
      await totalEmployeeModel.updateOne({ total });

      return res
        .status(200)
        .send(success("Total employees updated successfully"));
    } catch (error) {
      console.log(error);
      return res.status(500).send(failure("Something went wrong", error));
    }
  }

  async getTotalEmployees(req: Request, res: Response): Promise<Response> {
    try {
      const total = await totalEmployeeModel.findOne();
      return res
        .status(200)
        .send(success("Total employees fetched successfully", total));
    } catch (error) {
      console.log(error);
      return res.status(500).send(failure("Something went wrong", error));
    }
  }

  async getAllEmployees(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { search } = req.query; // Extract search query parameter

      if (!id) {
        return res.status(400).send(failure("No file id provided"));
      }

      const files = await fileModel.findById(id);
      if (!files) {
        return res.status(400).send(failure("No data found"));
      }

      // Filter files based on search criteria (employee name)
      const filteredFiles = search
        ? files.file.filter(
            (emp: any) =>
              emp.employee
                .toLowerCase()
                .includes(search.toString().toLowerCase()) ||
              emp.employee_id.includes(search.toString())
          )
        : files.file;

      // Count occurrences of each employee ID in filtered files
      const employeeCountMap = new Map<string, number>();
      filteredFiles.forEach((emp: any) => {
        const employeeId = emp.employee_id;
        if (employeeCountMap.has(employeeId)) {
          employeeCountMap.set(
            employeeId,
            employeeCountMap.get(employeeId)! + 1
          );
        } else {
          employeeCountMap.set(employeeId, 1);
        }
      });

      // Calculate averages for each employee in filtered files
      const employeeAverages: Record<string, any>[] = [];
      filteredFiles.forEach((emp: any) => {
        const employeeId = emp.employee_id;
        const count = employeeCountMap.get(employeeId)!;
        const avgWorkedHours = (emp.worked_hours / count).toFixed(2);
        const avgLateHours = (emp.late_hours / count).toFixed(2);
        const avgEarlyLeaveHours = (emp.early_leave_hours / count).toFixed(2);
        const avgOverTime = (emp.over_time / count).toFixed(2);

        const existingEmployee = employeeAverages.find(
          (e) => e.employee_id === employeeId
        );
        if (!existingEmployee) {
          employeeAverages.push({
            employee: emp.employee,
            employee_id: emp.employee_id,
            worked_hours: parseFloat(avgWorkedHours),
            late_hours: parseFloat(avgLateHours),
            early_leave_hours: parseFloat(avgEarlyLeaveHours),
            over_time: parseFloat(avgOverTime),
          });
        } else {
          const employeeIndex = employeeAverages.findIndex(
            (e) => e.employee_id === employeeId
          );
          employeeAverages[employeeIndex].worked_hours +=
            parseFloat(avgWorkedHours);
          employeeAverages[employeeIndex].late_hours +=
            parseFloat(avgLateHours);
          employeeAverages[employeeIndex].early_leave_hours +=
            parseFloat(avgEarlyLeaveHours);
          employeeAverages[employeeIndex].over_time += parseFloat(avgOverTime);
        }
      });

      return res
        .status(200)
        .send(success("Files fetched successfully", employeeAverages));
    } catch (error) {
      console.log(error);
      return res.status(500).send(failure("Something went wrong", error));
    }
  }

  async getEmployeeDetails(req: Request, res: Response): Promise<Response> {
    try {
      const { id, date } = req.params;
      if (!id || !date) {
        return res.status(400).send(failure("No id or date provided"));
      }

      const files = await fileModel.findById(id);

      if (!files) {
        return res.status(400).send(failure("No data found"));
      }

      const employees = files.file.filter((data: FileResponse) => {
        return data.check_in === date;
      });

      return res
        .status(200)
        .send(success("Files fetched successfully", employees));
    } catch (error) {
      console.log(error);
      return res.status(500).send(failure("Something went wrong", error));
    }
  }
}

export default new EmployeeController();
