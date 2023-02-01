import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const Login = () => {
    navigate("/login");
  };
  const Signup = () => {
    navigate("/register");
  };
  return (
    <div>
      <button onClick={Login}>Sign In</button>
      <button onClick={Signup}>Sign Up</button>
    </div>
  );
};

export default Home;
