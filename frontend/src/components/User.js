import React, { useState } from "react";
import axios from "axios";

function User() {
  const initialState = {
    fName: "",
    lName: "",
    designation: "",
    email: "",
    password: "",
  };
  const [details, setDetails] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const { fName, lName, designation, email, password } = details;
    if (!fName || !lName || !designation || !email || !password) {
      alert("Fill the complete form before submit");
      return;
    }
    await axios.post("/user", details);
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
}

export default User;
