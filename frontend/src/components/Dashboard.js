import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import {
  getIntrests,
  createIntrest,
  deleteIntrest,
} from "../redux/slices/intrestSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [details, setDetails] = useState();

  const { intrests } = useSelector((state) => state.intrests);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getIntrests(user));
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setDetails(value);
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    if (!details) {
      alert("Add intrest first");
      return;
    }
    const data = { details, token: user };
    dispatch(createIntrest(data));
  };

  const handleDelete = (intrest) => {
    let data = { intrest, token: user };
    dispatch(deleteIntrest(data));
  };

  return (
    <div>
      <div>Dashboard</div>
      {intrests &&
        intrests.length > 0 &&
        intrests.map((data, i) => (
          <button key={i} onClick={() => handleDelete(data)}>
            {data}
          </button>
        ))}
      <form onSubmit={formSubmit}>
        <label>
          Intrest:
          <input
            type="text"
            name="intrests"
            // value={details.fName}
            onChange={handleChange}
          />
        </label>

        <input type="submit" value="Add" />
      </form>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
