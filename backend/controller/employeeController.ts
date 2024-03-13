import { Request, Response } from "express";
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
      if (!id) {
        return res.status(400).send(failure("No file id provided"));
      }
      const files = await fileModel.findById(id);

      if (!files) {
        return res.status(400).send(failure("No data found"));
      }

      console.log("files", files.file);

      return res
        .status(200)
        .send(success("Files fetched successfully", files.file));
    } catch (error) {
      console.log(error);
      return res.status(500).send(failure("Something went wrong", error));
    }
  }
}

export default new EmployeeController();
