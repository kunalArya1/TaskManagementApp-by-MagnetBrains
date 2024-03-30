import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/Connect.db";

// Express App
const app = express();

// port
const PORT = process.env.PORT || 3000;

// DotEnv Config
dotenv.config();

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Parser
app.use(cookieParser());

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
