import React from "react";
import { Route, Redirect } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";

function PrivateRoute({ component: Component, isLoggedin, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        // ! redirect to home or loggin... we choose
        isLoggedin ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default withAuth(PrivateRoute);
