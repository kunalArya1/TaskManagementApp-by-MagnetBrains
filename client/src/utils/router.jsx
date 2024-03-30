import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Body from "../Components/Body";
import Signin from "../Components/Signin";
import SignUp from "../Components/SignUp";
import Home from "../Components/Home";
import { useContext } from "react";
import AuthContext from "../partials/AuthContext";
import ProcetedRoutes from "./ProcetedRoutes";
import CreateTask from "../Components/CreateTask";
import AllTask from "../Components/AllTask";
import TaskDetail from "../Components/TaskDetail";
import UpdateTask from "../Components/UpdateTask";

let isAuth;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/create",
        element: <CreateTask />,
      },
      {
        path: "/alltask",
        element: <AllTask />,
      },
      {
        path: "/task-details/:id",
        element: <TaskDetail />,
      },
      {
        path: "/update/:id",
        element: <UpdateTask />,
      },
    ],
  },
]);
