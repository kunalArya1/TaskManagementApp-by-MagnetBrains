import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/Connect.db.js";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// Express App
const app = express();

// port
const PORT = process.env.PORT || 3000;

// DotEnv Config
dotenv.config();

// Cors
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Parser
app.use(cookieParser());

// Routes

// user Routes
app.use("/api/v1/user", userRoutes);

// Task Routes
app.use("/api/v1/user", taskRoutes);

// App Listen
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Error while Connecting to database ", error);
  }
};

start();
