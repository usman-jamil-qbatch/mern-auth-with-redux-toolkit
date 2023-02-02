import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Ristricted = ({ component: Component, redirectTo = "/" }) => {
  const { user } = useSelector((state) => state.auth);
  return user ? <Navigate to={redirectTo} /> : Component;
};
export default Ristricted;
