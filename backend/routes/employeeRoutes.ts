import express, { Router } from "express";
import employeeController from "../controller/employeeController";
import { isAuthorized } from "../middleware/auth";

const routes: Router = express.Router();

routes.post("/set-total-employees", employeeController.setTotalEmployees);
routes.patch(
  "/update-total-employees",
  isAuthorized,
  employeeController.updateTotalEmployees
);
routes.get("/get-total-employee", employeeController.getTotalEmployees);
routes.get(
  "/get-all-employees/:id",
  isAuthorized,
  employeeController.getAllEmployees
);
routes.get(
  "/get-employee-details/:id/:date",
  isAuthorized,
  employeeController.getEmployeeDetails
);

export = routes;
