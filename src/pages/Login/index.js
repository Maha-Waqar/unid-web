import React, { useState, useContext, useEffect } from 'react';
import { Formik, ErrorMessage } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { Link, useHistory,useLocation  } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import * as qs from 'query-string';
import { connect } from 'react-redux';

import './login.css';
import {
  userLogin,
  userSuccessLogin
} from '../../redux/index';
import {
  toast
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("*Required"),
  password: Yup.string()
    .min(8, "*Password must have at least 8 characters")
    .required("*Required"),
});

function Login(props) {
  const { doLogin, userSuccess } = props
  const history = useHistory();
  const location = useLocation();
  const parsed = qs.parse(location.search);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (parsed.access_token) {
      axios.get(`https://unidtest.com.my/apis/verify_token?token=${parsed.access_token}`).then((res) => {
        if (res.data.status !== "error") {
          userSuccess(res.data.user_data);
          localStorage.setItem('userSessionData',JSON.stringify(res.data.user_data));
          localStorage.setItem('userlogintoken',parsed.access_token);
          history.push('/');
        }
      }).catch((error) => {
        console.log("token not matched", error)
      }) 
    }
  },[]);

  useEffect(() => {
    if(props.appState.errorMessage) {
      toast.error(props.appState.errorMessage,{
        position: "bottom-center",
        autoClose: true
      })
    }
  },[props.appState.errorMessage]);

  return (
    <div className="login">
      <img src="../../../login_banner.jpg" />
      <div className="login-page">
      <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, setFieldError, setFieldValue, setFieldTouched }) => {
              setSubmitting(true);
              setLoading(true);
              const { email, password } = values;
            }}
          >
            {({ values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formEmail" style={{ display: 'block' }}>
                    {/*<Form.Label className="float-left">Email address</Form.Label>*/}
                    <Form.Control
                      type="text"
                      name="email"
                      placeholder="Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      // onChange={e => setEmail(e.target.value)}
                      className={touched.email && errors.email ? "error" : null}
                      isInvalid={touched.email && errors.email}
                      isValid={touched.email && !errors.email}
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                  </Form.Group>
                  <div className="input-space"></div>
                  <Form.Group controlId="formPassword" style={{ display: 'block' }}>
                    {/*<Form.Label className="float-left">Password</Form.Label>*/}
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // onChange={e => setPassword(e.target.value)}
                      value={values.password}
                      className={touched.password && errors.password ? "error" : null}
                      isInvalid={touched.password && errors.password}
                      isValid={touched.password && !errors.password}
                    />                   
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    {/*<Form.Check className="float-left rmb_me_cb" type='checkbox' id='remember_me' label='Remember Me'/>*/}
                    <div className="forgt_pw">
                      <Link href="/forgot_password"><a className="float-right" style={{ color: 'black' }}>Forgot Password</a></Link>
                    </div>
                    <div className="clearfix"></div>
                  </Form.Group>
                  
                  <div className='button'>
                    <Button className='login_button' type="submit" size="lg" block/* onClick={e => authenticate(e)} *disabled={isSubmitting || loginSuccessful} */
                      onClick={() => {
                        console.log("clicked")
                        doLogin(values.email, values.password)
                      }}
                    >
                      <div>Login</div>
                    </Button>                
                    <Button className='reg_button'  size="lg" block
                      onClick={() => { history.push('/register'); } }
                    >
                      <div>Register</div>
                    </Button>
                  </div>
                  
                </Form>
              )}
      </Formik>
      </div>
    </div>
        
  );
}

const mapStateToProps = (state, ownprops) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch, ownprops) => (
  {
    doLogin: (username,password) => {
      dispatch(userLogin({username, password}, ownprops.id))
    },
    userSuccess: (userData) => {
      dispatch(userSuccessLogin(userData,ownprops.id))
    }
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
