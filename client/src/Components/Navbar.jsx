import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../partials/AuthContext";
import axios from "../utils/axios";
import { Navigate, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const { isAuth, name, setisAuth } = useContext(AuthContext);

  const signoutHandler = async () => {
    const response = await axios.get("/signout");
    // console.log(response.status);

    if (response.status === 200) {
      setisAuth(false);
      navigate("/");
    }
  };

  const Homeurl = isAuth ? "/alltask" : "/";
  return (
    <div className=" h-[10%] w-full bg-zinc-500 flex justify-between p-6 shadow-lg ">
      <div>
        <Link to={Homeurl}>
          <p className=" font-bold text-2xl">Task</p>
        </Link>
      </div>
      <div>
        <ul className=" flex gap-9 font-bold text-xl">
         

          {!isAuth && (
            <Link to="/signup">
              <li>SignUp</li>
            </Link>
          )}

          {isAuth && (
            <Link to="/create">
              <li>Create Task</li>
            </Link>
          )}

          {isAuth && (
            <Link to="/alltask">
              <li>All Task</li>
            </Link>
          )}

          {isAuth && (
            <Link>
              <li>{name}</li>
            </Link>
          )}
          {isAuth ? (
            <Link onClick={signoutHandler}>
              <li>SignOut</li>
            </Link>
          ) : (
            <Link to="/signin">
              <li>SignIn</li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
