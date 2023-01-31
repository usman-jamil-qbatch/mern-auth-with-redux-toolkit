import logo from "./logo.svg";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./redux/slice/authSlice";
import User from "./components/User";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Protected from "./components/Protected";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route
            exact
            path="/dashboard"
            element={
              <Protected redirect={<Login />}>
                <Dashboard />
              </Protected>
            }
          />
          <Route
            exact
            path="/"
            element={
              <Protected redirect={<Login />}>
                <Dashboard />
              </Protected>
            }
          />
          <Route
            exact
            path="/login"
            element={
              <Protected redirect={<Login />}>
                <Dashboard />
              </Protected>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
