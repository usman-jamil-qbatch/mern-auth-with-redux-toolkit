import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = ({ component: Component, redirectTo = "/" }) => {
  const { user } = useSelector((state) => state.auth);
  return user ? Component : <Navigate to={redirectTo} />;
};
export default Protected;
