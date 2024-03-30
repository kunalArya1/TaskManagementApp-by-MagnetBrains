import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useParams } from "react-router-dom";

const UpdateTask = () => {
  const [Task, setTask] = useState(null);
  const { id } = useParams();
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [status, setstatus] = useState("");
  const getTaskDetail = async () => {
    const response = await axios.get(`/task/${id}`);
    setTask(response.data.data);
  };

  useEffect(() => {
    getTaskDetail();
  }, []);

  if (!Task) return <div>Loading...</div>;

  return (
    <div className=" text-center ">
      <h1 className=" text-2xl m-[3rem]"> Update Task</h1>
      <input
        type="text"
        className="p-4 w-[19rem]"
        name="title"
        value={Task.title}
      />{" "}
      <br /> <br />
      <input
        className=" p-4 w-[19rem]"
        type="text"
        name="desc"
        value={Task.description}
        id="title"
        onChange={(e) => settitle(e.target.value)}
      />{" "}
      <br /> <br />
      <input
        className=" p-4 w-[19rem]"
        type="text"
        name="status"
        value={Task.status}
        id=""
      />{" "}
      <br /> <br />
      <input
        className=" p-4 w-[19rem]"
        type="date"
        name="duedate"
        id="due"
      />{" "}
      <br /> <br />
      <button className=" p-5 bg-slate-200 text-black font-bold rounded-lg w-[10rem]">
        Update
      </button>
    </div>
  );
};

export default UpdateTask;
