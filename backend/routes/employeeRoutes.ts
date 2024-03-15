import express, { Router } from "express";
import employeeController from "../controller/employeeController";

const routes: Router = express.Router();

routes.post("/set-total-employees", employeeController.setTotalEmployees);
routes.patch(
  "/update-total-employees",
  employeeController.updateTotalEmployees
);
routes.get("/get-total-employee", employeeController.getTotalEmployees);
routes.get("/get-all-employees/:id", employeeController.getAllEmployees);
routes.get("/get-employee-details/:id/:date", employeeController.getEmployeeDetails);

export = routes;
