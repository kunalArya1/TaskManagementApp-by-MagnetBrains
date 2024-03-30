import express from "express";
import {
  homePage,
  signup,
  signin,
  signout,
} from "../controllers/user.controllers";

const router = express.Router();

router.route("/").get(homePage);

// signUp Route
router.route("/signup").post(signup);

// signIn Route
router.route("/signin").post(signin);

// signOut Route
router.route("/signout").get(signout);

export default router;
