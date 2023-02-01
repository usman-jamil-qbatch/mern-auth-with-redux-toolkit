import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Protected from "./components/Protected";
import Home from "./components/Home";
import Ristricted from "./components/Ristricted";
import { setAuthToken } from "./config/axios-config";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.auth);
  if (user) {
    setAuthToken(user);
  }
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route
            exact
            path="/dashboard"
            element={
              <Protected redirectTo="/login" component={<Dashboard />} />
            }
          />
          <Route
            exact
            path="/login"
            element={
              <Ristricted redirectTo="/dashboard" component={<Login />} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
