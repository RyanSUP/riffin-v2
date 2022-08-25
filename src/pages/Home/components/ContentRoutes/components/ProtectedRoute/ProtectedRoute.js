// If there is no user and they hit a protected route then direct them to the login page, otherwise show the component they navigated to.

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";

const ProtectedRoute = (props) => {
  const { user } = useContext(UserContext);

  return (
    <>{user === null ? <Navigate to="/login" replace /> : props.children}</>
  );
};

export default ProtectedRoute;
