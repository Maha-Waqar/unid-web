import React, { useState, useContext } from 'react';
import Cards from 'react-credit-cards';
import { Form, Button } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import BackButton from '../../components/BackButton'
import './CreditCard.css';
import 'react-credit-cards/es/styles-compiled.css';


class CreditCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cvv: '',
      expiry: '',
      focus: '',
      name: '',
      number: '',
    };
  }

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }
  
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  
  render() {
    const validationSchema = Yup.object().shape({
      cc_number: Yup.string()
        .max(16, "*Credit Card Number must not more than 16 digits")
        .required("*Required"),
      cc_name: Yup.string()
        .min(8, "*Name must have at least 8 characters")
        .required("*Required"),
      expiry: Yup.string()
        .required("*Required"),
      cvv: Yup.string()
        .min(3, "*CVV must have at least 3 digits")
        .max(4, "*CVV must not more than 4 digits")
        .required("*Required"),
    });

    return (
      <div id="CreditCard">
        <BackButton/>
        <div className="cc-header" styles={{}}>
          <h2>Add Credit Card</h2>
        </div>
        <Cards
          cvv={this.state.cvv}
          expiry={this.state.expiry}
          focus={this.state.focus}
          name={this.state.name}
          number={this.state.number}
        />

        <Formik
          initialValues={{ cc_number: "", cc_name: "", expiry:"", cvv: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, setFieldError }) => {
            setSubmitting(true);
            const { cc_number, cc_name } = values;
          }}
        >
          {({ values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting }) => (
              <Form className="cc-form" onSubmit={handleSubmit}>
                <Form.Group controlId="formNumber" style={{ display: 'block' }}>
                  <Form.Control
                    type="text"
                    name="cc_number"
                    placeholder="Credit Card Number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.cc_number}
                    className={touched.cc_number && errors.cc_number ? "error" : null}
                    isInvalid={touched.cc_number && errors.cc_number}
                    isValid={touched.cc_number && !errors.cc_number}
                  />
                  <Form.Control.Feedback type="invalid">{errors.cc_number}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formName" style={{ display: 'block' }}>
                  <Form.Control
                    type="text"
                    name="cc_name"
                    placeholder="Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.cc_name}
                    className={touched.cc_name && errors.cc_name ? "error" : null}
                    isInvalid={touched.cc_name && errors.cc_name}
                    isValid={touched.cc_name && !errors.cc_name}
                  />
                  <Form.Control.Feedback type="invalid">{errors.cc_name}</Form.Control.Feedback>
                </Form.Group>
                <div>
                  <div className="col-xs-3 cc-expiry">
                    <Form.Group controlId="formExpiry" style={{ display: 'block' }}>
                      <Form.Control
                        type="text"
                        name="expiry"
                        placeholder="Expired Date"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.expiry}
                        className={touched.expiry && errors.expiry ? "error" : null}
                        isInvalid={touched.expiry && errors.expiry}
                        isValid={touched.expiry && !errors.expiry}
                      />
                      <Form.Control.Feedback type="invalid">{errors.expiry}</Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col-xs-2 cc-cvv">
                    <Form.Group controlId="formCvv" style={{ display: 'block' }}>
                      <Form.Control
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.cvv}
                        className={touched.cvv && errors.cvv ? "error" : null}
                        isInvalid={touched.cvv && errors.cvv}
                        isValid={touched.cvv && !errors.cvv}
                      />
                      <Form.Control.Feedback type="invalid">{errors.cvv}</Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
      </div>
    );
  }
}

export default CreditCard;