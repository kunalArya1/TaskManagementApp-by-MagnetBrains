import express from "express";
import {
  user,
  signup,
  signin,
  signout,
} from "../controllers/user.controllers.js";
import { isLoggoedIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/").get(isLoggoedIn, user);

// signUp Route
router.route("/signup").post(signup);

// signIn Route
router.route("/signin").post(signin);

// signOut Route
router.route("/signout").get(isLoggoedIn, signout);

export default router;
