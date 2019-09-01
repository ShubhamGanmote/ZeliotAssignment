import React, { Component } from 'react';
import { Formik } from 'formik'
import { Input, message } from 'antd'
import * as Yup from 'yup'
import axios from 'axios'


const loginSchema = Yup.object().shape(
  {
    email: Yup.string().required('Required'),
    password: Yup.string().min(5, 'Too Short!').required('Required')
  }
)
class Login extends Component {

  handleLogin = (values) => {
    console.log(values)
    const loginBody = {
      username: values.email,
      password: values.password
    }
    axios.post('http://172.28.74.144:3000/login', loginBody)
      .then(res => {
        console.log("response -> ", res)
        window.localStorage.setItem('zeliot-token', res.data.token)
        window.localStorage.setItem('zeliot-auth', 'true')
        this.props.history.push({
          pathname: '/posts',
          state: {isAuth: true}
        })
        console.log('props => ', this.props.history)
      })
      .catch(err => {
        message.error('Invalid username or password')
        console.error(err)
      })
  }

  render() {
    return (
      <div>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            // console.log(values)
            this.handleLogin(values)
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
              <form onSubmit={handleSubmit}>
                <div className="input-container">
                  <Input
                    type="text"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="Enter your email"
                  />
                  {errors.email && touched.email && (
                    <span className="form-err">{errors.email}</span>
                  )}
                </div>
                <div className="input-container">
                  <Input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="Enter your password"
                  />
                  {errors.password && touched.password && (
                    <span className="form-err">{errors.password}</span>
                  )}
                </div>
                <button type="submit" className="btn btn-primary ml-auto">
                  Login
                  </button>
              </form>
            )}
        </Formik>
      </div>
    );
  };
}

export default Login;