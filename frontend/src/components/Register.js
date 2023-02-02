import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../redux/slices/authSlice";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function Register() {
  const initialState = {
    fName: "",
    lName: "",
    designation: "",
    email: "",
    password: "",
  };
  const [details, setDetails] = useState(initialState);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSucces, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isSucces || user) {
      navigate("/dashboard");
    }

    dispatch(reset());
  }, [user, isError, isSucces, message, dispatch, navigate]);

  const handleChange = (e) => {
    setDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const formSubmit = (e) => {
    e.preventDefault();

    dispatch(register(details));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            // onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              name="fName"
              label="FName"
              type="fName"
              id="fName"
            />
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              name="lName"
              label="LastName"
              type="lName"
              id="lName"
              autoComplete="current-password"
            />
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              name="designation"
              label="Designation"
              type="designation"
              id="designation"
            />
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              onClick={formSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>

            <Link href="/login">Alredy have account, Sign In</Link>
            <Grid container></Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
