import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import { UserContext } from "../../UserContext";
/*if (login) return <Route {...props} />;
  else if (!login) return <Navigate to="/login" />;
  else return null;,
  return login ? <Route {...props} /> : <Navigate to="/login" />;
  */

const ProtectedRoute = ({ children }) => {
  const { login } = React.useContext(UserContext);
  return login ? children : <Navigate to="/login" />;
  
};
export default ProtectedRoute;
