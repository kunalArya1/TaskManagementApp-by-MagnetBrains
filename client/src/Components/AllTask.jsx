import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AllTask = () => {
  const [task, settask] = useState(null);

  const navigate = useNavigate();
  const getTask = async () => {
    const respone = await axios.get("/all-tasks");
    settask(respone.data.data);
  };

  const delteHandler = async (id) => {
    const response = await axios.delete(`/delete-task/${id}`);
    if (response.status === 200) {
      navigate("/alltask");
      getTask();
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  if (!task) return <div>Loading...</div>;

  return (
    <div>
      {task.map((task) => {
        return (
          <Link key={task._id} to={`/task-details/${task._id}`}>
            <div className="border-2 p-5 m-5 flex justify-between ">
              <div>
                <h1>
                  <span className=" font-bold ">Title: </span> {task.title}
                </h1>
                <p>
                  <span className=" font-bold">DesCription: </span>{" "}
                  {task.description}
                </p>
                <p>
                  <span className=" font-bold">Stauts:</span> {task.status}
                </p>
                <p>
                  <span className=" font-bold">Due Date:</span>{" "}
                  {task.dueDate.split("T")[0]}
                </p>
              </div>
              <div className="flex flex-col items-center gap-y-2">
                <Link to={`/update/${task._id}`}>
                  <button className=" py-3  px-8 bg-blue-400 rounded-md ">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => delteHandler(task._id)}
                  className=" py-3  px-6 bg-red-400 rounded-md "
                >
                  Delete
                </button>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default AllTask;
