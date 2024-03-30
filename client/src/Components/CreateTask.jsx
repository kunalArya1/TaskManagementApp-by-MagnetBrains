import axios from "../utils/axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const [title, settitle] = useState("");
  const [Desc, setDesc] = useState("");
  const [status, setstatus] = useState("pending");
  const [dueDate, setdueDate] = useState("");

  const navigate = useNavigate();
  const createTaskHandler = async () => {
    const data = {
      title: title,
      description: Desc,
      status: status,
      dueDate: dueDate,
    };

    const response = await axios.post("/create-task", data);

    if (response.status === 201) {
      navigate("/alltask");
      settitle("");
      setDesc("");
      setstatus("");
      setdueDate("");
    } else {
      navigate("/create");
    }
    console.log(response);
  };
  return (
    <div className=" text-center ">
      <h1 className=" text-2xl m-[3rem]"> Create Task</h1>
      <input
        className=" p-4 w-[19rem]"
        type="text"
        name="title"
        value={title}
        onChange={(e) => settitle(e.target.value)}
        placeholder="Enter Title"
      />{" "}
      <br /> <br />
      <input
        className=" p-4 w-[19rem]"
        type="text"
        name="Description"
        id="desc"
        value={Desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Enter Description"
      />{" "}
      <br /> <br />
      <input
        className=" p-4 w-[19rem]"
        type="text"
        name="status"
        id="status"
        value={status}
        onChange={(e) => setstatus(e.target.value)}
        placeholder="Enter Status"
      />
      <br /> <br />
      <input
        className=" p-4 w-[19rem]"
        type="date"
        name="date"
        id="date"
        value={dueDate}
        onChange={(e) => setdueDate(e.target.value)}
        placeholder="Due date"
      />
      <br /> <br />
      <button
        onClick={createTaskHandler}
        className=" p-5 bg-slate-200 text-black font-bold rounded-lg w-[10rem]"
      >
        Create
      </button>
    </div>
  );
};

export default CreateTask;
