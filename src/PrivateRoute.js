import React from 'react';
import { Route, Redirect } from 'react-router-dom'

function PrivateRoute({ component: Component, ...rest }) {
  // console.log({...rest})
  return (
    <Route
      {...rest}
      render={props =>
        // {console.log('props', props)}
        props.location.state.isAuth ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
      }
    />
  );
}

export default PrivateRoute;