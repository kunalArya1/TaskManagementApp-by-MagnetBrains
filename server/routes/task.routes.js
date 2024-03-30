import express from "express";
import Task from "../models/task.model.js";
import {
  crateTaks,
  getAllTask,
  updateTask,
  deleteTask,
  getTaskById,
  updateTaskStatus,
} from "../controllers/task.controllers.js";
import { isLoggoedIn } from "../middlewares/auth.middleware.js";
const router = express.Router();

// create Task
router.route("/create-task").post(isLoggoedIn, crateTaks);

// Get all Tasks
router.route("/all-tasks").get(isLoggoedIn, getAllTask);

// Get Task by ID
router.route("/task/:id").get(isLoggoedIn, getTaskById);

// Update the status of the task
router.route("/task-status/:id").put(isLoggoedIn, updateTaskStatus);

// Update the task
router.route("/update-task/:id").put(isLoggoedIn, updateTask);

// Delete the task
router.route("/delete-task/:id").delete(isLoggoedIn, deleteTask);
export default router;
