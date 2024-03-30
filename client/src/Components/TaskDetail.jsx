import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { Link, useParams } from "react-router-dom";

const TaskDetail = () => {
  const [Task, setTask] = useState(null);
  const { id } = useParams();
  //   console.log(id);

  const getTaskById = async () => {
    const response = await axios.get(`/task/${id}`);
    setTask(response.data.data);
  };
  useEffect(() => {
    getTaskById();
  }, []);

  if (!Task) return <div>Loading...</div>;
  return (
    <div className=" text-center mt-[5rem]">
      <div className=" text-start"></div>
      <h1 className=" p-3">
        <span className=" font-bold text-2xl  ">Title : </span>{" "}
        <span className=" text-2xl">{Task.title}</span>
      </h1>
      <h1 className=" p-3">
        <span className=" font-bold text-2xl  ">Description : </span>{" "}
        <span className=" text-2xl ">{Task.description}</span>
      </h1>

      <h1 className=" p-3">
        <span className=" font-bold text-2xl  ">Status: </span>
        <span className=" text-2xl ">{Task.status}</span>
      </h1>
      <h1 className=" p-3">
        <span className=" font-bold text-2xl  ">Due Date: </span>
        <span className=" text-2xl ">{Task.dueDate.split("T")[0]}</span>
      </h1>

      <Link to="/alltask">
        <button className=" p-5 bg-blue-300 text-black mt-9 rounded-md">
          Go to All Task Page
        </button>
      </Link>
    </div>
  );
};

export default TaskDetail;
