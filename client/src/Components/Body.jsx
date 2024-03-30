import React from "react";
import { Link } from "react-router-dom";

const Body = () => {
  return (
    <div className=" text-center">
      <h1 className=" text-3xl  p-10 pt-[10rem]">
        Welcome to Task Management App
      </h1>

      <p className=" text-xl  ">Pease SignIn to Get Access </p>
      <Link to="/signin">
        <button className=" px-9 py-3 font-bold rounded-lg bg-zinc-300 mt-10 text-black">SignIn</button>
      </Link>
    </div>
  );
};

export default Body;
