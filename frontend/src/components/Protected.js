import { useSelector, useDispatch } from "react-redux";

const Protected = ({ children, redirect }) => {
  const { user, isLoading, isError, isSucces, message } = useSelector(
    (state) => state.auth
  );
  console.log();
  return user ? children : redirect;
};
export default Protected;
