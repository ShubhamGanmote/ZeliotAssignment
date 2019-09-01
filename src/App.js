import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Posts from './Components/Posts/Posts';
import Login from './Components/Login/Login';
import PrivateRoute from './PrivateRoute'

class App extends React.Component {
  state = {
    isAuthenticated: false
  }

  // componentDidMount() {
  //   const token = window.localStorage.getItem('zeliot-token')
  //   const isAuth = window.localStorage.getItem('zeliot-auth')
  //   if (token === null || token === undefined || token === '') {
  //     this.setState({ isAuthenticated: false })
  //   } else {
  //     console.log(isAuth)
  //     if (isAuth === 'true') {
  //       console.log(token)
  //       this.setState({ isAuthenticated: true })

  //     }
  //   }
  // }

  render() {
    const token = window.localStorage.getItem('zeliot-token')
    let isAuth = window.localStorage.getItem('zeliot-auth')
    if (token === null || token === undefined || token === '') {
      isAuth = false
    } else {
      console.log(isAuth)
      if (isAuth === 'true') {
        console.log(token)
        isAuth = true

      }
    }
    console.log('aaaa', isAuth)
    return (
      <BrowserRouter>

        {
          isAuth ? (

            <Switch>
              <PrivateRoute path="/posts" exact component={Posts} />
              <Redirect to={{ pathname: "/posts", state: { isAuth: isAuth } }} />
            </Switch>
          ) : (
              <Switch>
                <Route path="/login" exact component={Login} />
                <Redirect to='/login' />
              </Switch>
            )
        }
      </BrowserRouter>
    );
  }
}

export default App;
