import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../redux/slices/authSlice";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const [details, setDetails] = useState(initialState);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSucces, message } = useSelector(
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

    dispatch(login(details));
  };

  return (
    <form onSubmit={formSubmit}>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={details.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={details.password}
          onChange={handleChange}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Login;
