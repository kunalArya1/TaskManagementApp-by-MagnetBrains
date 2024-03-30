import React, { useContext, useState } from "react";
import axios from "../utils/axios";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../partials/AuthContext";
const Signin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const { isAuth, setisAuth, setName } = useContext(AuthContext);

  const signInhandler = async () => {
    const data = {
      email: email,
      password: password,
    };

    const respone = await axios.post("/signin", data);
    // console.log(respone.data.data);
    if (respone.status === 200) {
      setisAuth(true);
      setName(respone.data.data);
      navigate("/alltask");
    } else {
      setisAuth(false);
      navigate("/signin");
    }
    setemail("");
    setpassword("");
  };
  return (
    <div className=" text-center mt-[10rem]">
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
        onClick={signInhandler}
        className=" py-4 px-9 bg-slate-100 w-[14rem] rounded-lg text-black font-bold"
      >
        SignIn
      </button>
    </div>
  );
};

export default Signin;
