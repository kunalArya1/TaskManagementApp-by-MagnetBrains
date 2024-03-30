import React, { useContext, useState } from "react";
import axios from "../utils/axios";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../partials/AuthContext";
const SignUp = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const { isAuth, setisAuth, setName } = useContext(AuthContext);

  const signUphandler = async () => {
    const data = {
      name: name,
      email: email,
      password: password,
    };

    const respone = await axios.post("/signup", data);
    if (respone.status === 200) {
      navigate("/signin");
    } else {
      navigate("/signup");
    }
    setname("");
    setemail("");
    setpassword("");
  };
  return (
    <div className=" text-center mt-[10rem]">
      <input
        className=" p-5 w-[25rem] rounded-md outline-none"
        placeholder=" Enter your Name"
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={(e) => setname(e.target.value)}
      />{" "}
      <br />
      <br />
      <input
        className=" p-5 w-[25rem] rounded-md outline-none"
        placeholder=" Enter your Email"
        type="email"
        name="email"
        id=""
        value={email}
        onChange={(e) => setemail(e.target.value)}
      />{" "}
      <br />
      <br />
      <input
        className=" p-5 w-[25rem] rounded-md outline-none"
        type="password"
        name="password"
        placeholder="Enter Your Password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      />
      <br /> <br />
      <button
        onClick={signUphandler}
        className=" py-4 px-9 bg-slate-100 w-[14rem] rounded-lg text-black font-bold"
      >
        SignUp
      </button>
    </div>
  );
};

export default SignUp;
