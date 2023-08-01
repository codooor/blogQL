import { Route, useNavigate } from "react-router-dom";

export default function PrivateRoute({ children, path, isLoggedIn }) {
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate("/");
  }

  return <Route path={path}>{children}</Route>;
}
