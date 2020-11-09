import React, { useState, useContext, useEffect } from 'react';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  userRegister,
  resetErrorMessage
} from '../../redux/Register';
import {
  ArrowBackIos
} from '@material-ui/icons'
import BackButton from '../../components/BackButton';
import { toast } from 'react-toastify';
import {
  Avatar,
  Typography,
  FormLabel,
  TextField,
  Grid,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  CircularProgress
} from '@material-ui/core'
import './index.css';
import {
  initRegisterData,
  FieldList,
  RegisterSchema
} from './config';
import { Redirect } from 'react-router-dom';

const Title = () => (
  <Typography 
    variant="h5"
    style={{
      marginTop: '20px',
      marginLeft: '10px'
    }}
  >
    Register
  </Typography>
);

const options = {
  onOpen: props => console.log(props.foo),
  onClose: props => console.log(props.foo),
  type: toast.TYPE.INFO,
  hideProgressBar: false,
  position: toast.POSITION.TOP_LEFT,
};

function Register(componentprops) {
  const [loading, setLoading] = useState(false);

  if(componentprops.registerData.successLogin) {
    toast.success("successfully registered", options);
    componentprops.history.push('/');
  }

  useEffect(() => {
    componentprops.registerData.errormessage &&
    toast.error(
      componentprops.registerData.errormessage,
      {
        ...options,
        type: toast.TYPE.ERROR,
        onClose:() => {
          componentprops.resetErrorMessage();
        }
      }
    )
  },[componentprops.registerData.errormessage]);

  return (
    <div className="register">
      <BackButton onClickEventHandler={() => { componentprops.history.goBack(); }}/>
      <Title />
      <Formik
        className="register-form"
        initialValues={initRegisterData}
        // enableReinitialize={true}
        validationSchema={RegisterSchema}
        onSubmit={(values) => {
          // console.log("VALUES", values);
          values.rider_phone = values.rider_phone;
          componentprops.doRegister(values);
          setLoading(true); 
        }}
      >
        {
          (props) => (
            <Grid container style={{marginLeft: '30px', width: '96%'}}>
              <Form style={{width: '80%'}}>
                <Grid item>
                  <Field name={'rider_name'}>
                    {
                      ({
                        field,
                        form,
                      }) => {
                        // console.log("FIELD", props, field, form);
                        return (
                          <TextField
                            id={"rider_name"}
                            label={"Name"}
                            onChange={(e) => {
                              // console.log("EVE", e.target.value);
                              form.setFieldValue('rider_name',e.target.value);
                            }}
                            error={ props.touched['rider_name'] && props.errors['rider_name']}
                            helperText={props.touched['rider_name'] && props.errors['rider_name']}
                          />
                        )
                      }
                    }
                  </Field>
                </Grid>

                <Grid item>
                  <Field name={'rider_email'}>
                    {
                      ({
                        field,
                        form
                      }) => {
                        // console.log("FIELD", props, field, form);
                        return (
                          <TextField
                            id={"rider_email"}
                            label={"Email Addres"}
                            onChange={(e) => {
                              form.setFieldValue('rider_email',e.target.value);
                            }}
                            error={ props.touched['rider_email'] && props.errors['rider_email']}
                            helperText={props.touched['rider_email'] && props.errors['rider_email']}
                          />
                        )
                      }
                    }
                  </Field>
                </Grid>

                <Grid item>
                  <Field name={'rider_phone'}>
                    {
                      ({
                        field,
                        form
                      }) => {
                        // console.log("FIELD", props, field, form);
                        return (
                          <TextField
                            id={"rider_phone"}
                            label={"Mobile Number"}
                            onChange={(e) => {
                              if(e.target.value.length > 10){
                                e.preventDefault();
                                return;
                              }
                              form.setFieldValue('rider_phone',e.target.value);
                            }}
                            error={ props.touched['rider_phone'] && props.errors['rider_phone']}
                            helperText={props.touched['rider_phone'] && props.errors['rider_phone']}
                          />
                        )
                      }
                    }
                  </Field>
                </Grid>
                    
                <Grid item>
                  <Field name={'password'}>
                    {
                      ({
                        field,
                        form
                      }) => {
                        // console.log("FIELD", props, field, form);
                        return (
                          <TextField
                            id={"password"}
                            label={"Password"}
                            type="password"
                            onChange={(e) => {
                              form.setFieldValue('password',e.target.value);
                            }}
                            error={ props.touched['password'] && props.errors['password']}
                            helperText={props.touched['password'] && props.errors['password']}
                          />
                        )
                      }
                    }
                  </Field>
                </Grid>

                <Grid item>
                  <Field name={'referral_code'}>
                    {
                      ({
                        field,
                        form
                      }) => {
                        // console.log("FIELD", props, field, form);
                        return (
                          <TextField
                            id={"referral_code"}
                            label={"Invitation Code"}
                            onChange={(e) => {
                              form.setFieldValue('referral_code',e.target.value);
                            }}
                            error={ props.touched['referral_code'] && props.errors['referral_code']}
                            helperText={props.touched['referral_code'] && props.errors['referral_code']}
                          />
                        )
                      }
                    }
                  </Field>
                </Grid>

                <Grid item style={{marginTop: '20px'}}>
                  <Field name="nationality">
                    {
                      ({
                        field
                      }) => (
                        <>
                          <FormLabel style={{ color: 'rgba(0,0,0,0.88)' }}> Nationality </FormLabel>
                          <RadioGroup aria-label="Nationality" value={field.value} onChange={props.handleChange}>
                            <Grid container>
                                <Grid item>
                                  <FormControlLabel value={'1'} control={<Radio />} label="Malaysia" />
                                </Grid>
                                <Grid item>
                                  <FormControlLabel value={'0'} control={<Radio />} label="Other" />
                                </Grid>
                            </Grid>
                          </RadioGroup>  
                        </>
                      )
                    }
                  </Field>
                 </Grid>

                <Grid item>
                  <Button 
                    variant="contained"
                    style={{
                      width: '100%',
                      marginTop: '30px',
                      backgroundColor: '#08b94b',
                      color: 'white'
                    }}
                    disabled={componentprops.registerData.isApiActive}
                    type="submit"
                  >
                    {
                      componentprops.registerData && componentprops.registerData.isApiActive ?
                        <CircularProgress />  
                      :
                        "Register"
                    }
                  </Button>
                </Grid>
              </Form>
            </Grid>
          )
        }
      </Formik>
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
    doRegister: (registerData) => {
      dispatch(userRegister(registerData, ownprops.id))
    },
    resetErrorMessage: () => {
      dispatch(
        resetErrorMessage()
      )
    }
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));