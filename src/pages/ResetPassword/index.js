import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import { Formik, ErrorMessage } from 'formik';
import { Form, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { Grid } from '@material-ui/core';

const validationSchema = Yup.object().shape({
    oldpassword: Yup.string()
      .min(8, "*Password must have at least 8 characters")
      .required("*Required"),
    newpassword: Yup.string()
        .min(8, "*Password must have at least 8 characters")
        .required("*Required"),
    resetpassword: Yup.string()
        .min(8, "*Password must have at least 8 characters")
        .required("*Required"),
  });

const ResetPassword = () => {
    const history = useHistory();
    return (
        <>
            <BackButton onClickEventHandler={() => {history.goBack(); }} />
            <Grid style={{padding: '10px' }}>
                <Formik
                initialValues={{ oldpassword: "", newpassword: "", confirmpassword: "" }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, setFieldError, setFieldValue, setFieldTouched }) => {
                setSubmitting(true);
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
                            name="password"
                            placeholder="Old Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.oldpassword}
                            // onChange={e => setEmail(e.target.value)}
                            className={touched.oldpassword && errors.oldpassword ? "error" : null}
                            isInvalid={touched.oldpassword && errors.oldpassword}
                            isValid={touched.oldpassword && !errors.oldpassword}
                        />
                        <Form.Control.Feedback type="invalid">{errors.oldpassword}</Form.Control.Feedback>
                    </Form.Group>
                    <div className="input-space"></div>
                    <Form.Group controlId="formPassword" style={{ display: 'block' }}>
                        {/*<Form.Label className="float-left">Password</Form.Label>*/}
                        <Form.Control
                        type="password"
                        name="newpassword"
                        placeholder="New Password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // onChange={e => setPassword(e.target.value)}
                        value={values.newpassword}
                        className={touched.newpassword && errors.newpassword ? "error" : null}
                        isInvalid={touched.newpassword && errors.newpassword}
                        isValid={touched.newpassword && !errors.newpassword}
                        />                   
                        <Form.Control.Feedback type="invalid">{errors.newpassword}</Form.Control.Feedback>
                        {/*<Form.Check className="float-left rmb_me_cb" type='checkbox' id='remember_me' label='Remember Me'/>*/}
                    </Form.Group>
                    
                    <Form.Group controlId="formPassword" style={{ display: 'block' }}>
                        {/*<Form.Label className="float-left">Password</Form.Label>*/}
                        <Form.Control
                        type="password"
                        name="resetpassword"
                        placeholder="Reset Password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // onChange={e => setPassword(e.target.value)}
                        value={values.newpassword}
                        className={touched.newpassword && errors.newpassword ? "error" : null}
                        isInvalid={touched.newpassword && errors.newpassword}
                        isValid={touched.newpassword && !errors.newpassword}
                        />                   
                        <Form.Control.Feedback type="invalid">{errors.newpassword}</Form.Control.Feedback>
                        {/*<Form.Check className="float-left rmb_me_cb" type='checkbox' id='remember_me' label='Remember Me'/>*/}
                    </Form.Group>
                
                    <div className='button'>
                        <Button className='login_button' type="submit" size="lg" block/* onClick={e => authenticate(e)} *disabled={isSubmitting || loginSuccessful} */
                        onClick={() => {
                            console.log("clicked")
                            // doLogin(values.email, values.password)
                        }}
                        >
                        <div>Confirm</div>
                        </Button>                
                    </div>
                    
                    </Form>
                )}
        </Formik>
            </Grid>
        </>
    )
}

export default ResetPassword;

