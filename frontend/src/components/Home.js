import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";

const Home = () => {
  const navigate = useNavigate();

  const Login = () => {
    navigate("/login");
  };
  const Signup = () => {
    navigate("/register");
  };
  return (
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Button size="large" onClick={Login} variant="outlined">
        Signin
      </Button>
      <Button size="large" sx={{ ml: 2 }} onClick={Signup} variant="outlined">
        Sign up
      </Button>
    </Grid>
  );
};

export default Home;
