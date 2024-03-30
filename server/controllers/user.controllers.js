import catchAsyncError from "../utils/catchAsyncError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/User.model.js";

// Home Page Controller ( Just for Testing )
export const homePage = catchAsyncError(async (req, res, next) => {
  res.status(200).json(new ApiResponse(200, "Welcome to Home Page"));
});

// Signup Controller
export const signup = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  // check if any field is empty or not provided
  if ([name, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All Fields are Required");
  }

  // check if user already exists

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new ApiError(400, "User Already Registred With This Email ID");
  }

  // Creating New user
  const newUser = await User.create({
    name,
    email,
    password,
  });
  // Getting registred user without password
  const registredStudent = await Student.findById(createdStudent._id).select(
    "-password"
  );

  // check if user is created or not
  if (!registredStudent) {
    throw new ApiError(500, "Error While Creating Student");
  }

  // Sending Response
  res
    .status(200)
    .json(
      new ApiResponse(200, registredStudent, "Student Signed Up Successfully")
    );
});

// SignIn Controller
export const signin = catchAsyncError(async (req, res, next) => {
  // Getting email and password from request body
  const { email, password } = req.body;

  // check if email and password is provided or not
  if (!email || !password) {
    throw new ApiError(400, "Email and Password are required!");
  }

  // check if student with this email is registred or not
  const student = await Student.findOne({ email });

  // if student is not registred then send error response
  if (!student) {
    throw new ApiError(401, "Student with this email is not registred");
  }

  // check if password is correct or not
  const isPasswordMatching = await student.isPassportCorrect(password);

  // if password is not correct then send error response
  if (!isPasswordMatching) {
    throw new ApiError(401, "Invalid Password! try again");
  }

  // if password is correct then generate access token
  const accesstoken = await student.generateAccessToken();

  // For secure cookie
  const options = {
    secure: true,
    httpOnly: true,
  };

  // send response with access token
  res
    .status(200)
    .cookie("accessToken", accesstoken, options)
    .json(new ApiResponse(200, accesstoken, "Sign in SuccessFull"));
});

// SignOut Controller
export const signout = catchAsyncError(async (req, res, next) => {
  res.clearCookie("accessToken");
  const user = req.user;
  res.json(new ApiResponse(200, user, "SignOut Success"));
});
