import Task from "../models/task.model.js";
import catchAsyncError from "../utils/catchAsyncError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

// create Task
export const crateTaks = catchAsyncError(async (req, res, next) => {
  // get the title, description and dueDate from the request body
  const { title, description, dueDate, status } = req.body;

  // get the user id from the request object that is set by the jwt middleware
  const createdBy = req.user.id;

  // check if all fields are provided
  if (!title || !description || !dueDate) {
    return new ApiError("All filed are required", 400);
  }
  // create Task
  const task = new Task({
    title,
    description,
    dueDate,
    createdBy,
    status,
  });

  // save the task to the database
  await task.save();

  // check if the task is created successfully or not
  if (!task) {
    return next(new ApiError(404, "Task not created"));
  }

  // send the response
  res.status(201).json(new ApiResponse(201, task, "Task Created Successfully"));
});

// Get all Tasks
export const getAllTask = catchAsyncError(async (req, res, next) => {
  // get the user id from the request object that is set by the jwt middleware
  const userId = req.user.id;

  // get all the tasks created by the user
  const tasks = await Task.find({ createdBy: userId });

  // check if the tasks are found or not
  if (!tasks || tasks.length === 0) {
    return next(new ApiError(404, "No Task Found"));
  }

  // send the response
  res.status(200).json(new ApiResponse(200, tasks, "All Tasks"));
});

// Get Task by ID

export const getTaskById = catchAsyncError(async (req, res, next) => {
  // get the task id from the url params
  const { id } = req.params;
  console.log(id);

  // find the task in the database by id
  const task = await Task.findOne({ _id: id });

  // check if the task is found or not
  if (!task) {
    return next(new ApiError(404, "Task not found"));
  }

  // check if the user has access to the task or not
  if (task.createdBy != req.user.id) {
    return next(
      new ApiError(403, "You are not authorized to access this task")
    );
  }

  // send the response
  res.status(200).json(new ApiResponse(200, task, "Task Found"));
});

// Update the status of the task
export const updateTaskStatus = catchAsyncError(async (req, res, next) => {
  // get the task id from the request params
  const { id } = req.params;

  // get the status from the request body
  const { status } = req.body;

  // check if the status is provided or not
  if (!status) {
    return next(new ApiError(400, "Status is required"));
  }

  // find the task by id and update the status
  const task = await Task.findByIdAndUpdate(
    id,
    {
      status,
    },
    { new: true }
  );

  // check if the task is updated successfully or not
  if (!task) {
    return next(new ApiError(404, "Task not updated"));
  }

  // send the response
  res
    .status(200)
    .json(new ApiResponse(200, task, "Task Status Updated Successfully"));
});

// Update Task
export const updateTask = catchAsyncError(async (req, res, next) => {
  // get the task id from the request params
  const { id } = req.params;

  // get the title, description, dueDate and status from the request body
  const { title, description, dueDate, status } = req.body;

  // check if all fields are provided
  if (!title || !description || !dueDate || !status) {
    return next(new ApiError(400, "All filed are required"));
  }

  // find the task by id and update it
  const task = await Task.findByIdAndUpdate(
    id,
    {
      title,
      description,
      dueDate,
      status,
    },
    { new: true }
  );

  // check if the task is updated successfully or not
  if (!task) {
    return next(new ApiError(404, "Task not updated"));
  }

  // send the response
  res.status(200).json(new ApiResponse(200, task, "Task Updated Successfully"));
});

// Delete Task

export const deleteTask = catchAsyncError(async (req, res, next) => {
  // get the task id from the request params
  const { id } = req.params;

  // find the task by id and delete it
  const task = await Task.findByIdAndDelete(id);

  // check if the task is deleted successfully or not
  if (!task) {
    return next(new ApiError(404, "Task not deleted"));
  }

  // send the response
  res.status(200).json(new ApiResponse(200, task, "Task Deleted Successfully"));
});
