import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../redux/slice/authSlice";

const Register = () => {
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

    dispatch(register(details));
  };

  return (
    <form onSubmit={formSubmit}>
      <label>
        First Name:
        <input
          type="text"
          name="fName"
          value={details.fName}
          onChange={handleChange}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="lName"
          value={details.lName}
          onChange={handleChange}
        />
      </label>
      <label>
        Designation:
        <input
          type="text"
          name="designation"
          value={details.designation}
          onChange={handleChange}
        />
      </label>
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

export default Register;
