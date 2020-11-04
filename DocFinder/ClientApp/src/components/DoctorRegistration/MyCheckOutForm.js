import React, { useState, useEffect, useContext } from "react";
import {  useLocation, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { MenuTypeContext } from "../../context/MenuContextProvider";
import errors from "../../Config/errorMessages";
import { Formik } from "formik";
import * as Yup from "yup";

const phoneRegex = RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);


const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "#87bbfd",
      },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

export function MyCheckOutForm(props) {
  const schema = Yup.object({
    fullName: Yup.string()
      .max(90, errors.tooLong.replace("{0}", "Full Name").replace("{1}", "90"))
      .trim()
      .required(errors.required.replace("{0}", "Full Name")),
    emailaddress: Yup.string()
      .max(
        90,
        errors.tooLong.replace("{0}", "Email Address").replace("{1}", "90")
      )
      .trim()
      .required(errors.required.replace("{0}", "Email Address"))
      .email(),
    phoneNumber: Yup.string()
      .matches(phoneRegex, "Phone Number entered is not valid")
      .required(errors.required.replace("{0}", "Phone Number")),
  });

    const [isCardComplete, setIsCardComplete] = useState(false);
    const [paymentintentstate, setPaymentIntentstate] = useState(null);
    const stripe = useStripe();
    const elements = useElements();
    let location = useLocation();
    let history = useHistory();
    const [paymentMethod, setPaymentMethod] = useState(null);
    const context = useContext(MenuTypeContext);

    useEffect(() => {
        GetPaymentIntent();
    }, []);
    console.log(props);

    function updateUserPaymentstatus() {
         
        const doctor = {
            EmailAddress: props.Doctor.email,
            Password: props.Doctor.password
        };
        const requestOptions = {
            method: 'put',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(doctor)
        };
        fetch("StripeApi/Put", requestOptions)
            .then(async response => {
                const data = await response.json();
                if (!response.ok) {
                    let error = (data && data.message) || response.status;
                    if (data.responseMessage) {
                        error = data.responseMessage;
                    }
                    return Promise.reject(error);
                }
                let firstIndexOfPath = location.pathname.indexOf("/");
                let doctorProfilePath =
                    location.pathname.substring(0, firstIndexOfPath + 1) +
                    "DoctorProfile";
                 context.dispatch({ type: "doctor" });
                history.push(doctorProfilePath, { doctordetails: data });
            })
            .catch(error => {
                console.log(error);
//                setSubmissionErrorState(true);
  //              setRequestProcessingStatus(false);
   //             seterrorMsg(error);
            });
    }


    function GetPaymentIntent() {
        fetch("StripeApi")
            .then( async response => {
                debugger;
                console.log(response);
                const data = await response.json();
                if (!response.ok) {
                    let error = (data && data.message) || response.status;
                    if (data.responseMessage) {
                        error = data.responseMessage;
                    }
                    return Promise.reject(error);
                }
                setPaymentMethod(data);
            })
            .catch(error => {
                console.log(error);
            });

    }

    async function SubmitPayment(values) {
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        //const payload = await stripe.createPaymentMethod({
        //    type: 'card',
        //    card: elements.getElement(CardElement),
        //    billing_details: {
        //        email: values.emailaddress,
        //        phone: values.phoneNumber,
        //        name: values.fullName,
        //    },
        //});

        const result = await stripe.confirmCardPayment(paymentMethod, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    email: values.emailaddress,
                    phone: values.phoneNumber,
                    name: values.fullName,
                },
            }
        });

        if (result.error) {
            console.log(result.error.message);
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                console.log(result);
                updateUserPaymentstatus();
            }
        }
    }

  return (
    <Formik
      validationSchema={schema}
      initialValues={props.DefaultEmptyPaymentFormData}
      onSubmit={(values: FState, setSubmitting: any) => {
          console.log(values);
          SubmitPayment(values);
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
        setFieldValue,
        setFieldTouched,
      }) => (
                  <Form noValidate onSubmit={handleSubmit}>
          <Container>
            <Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Label>Name </Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={values.fullName}
                    placeholder="jane doe"
                    onChange={(e) => {
                      setFieldTouched("fullName");
                      handleChange(e);
                    }}
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Label>Email </Form.Label>
                  <Form.Control
                    type="text"
                    name="emailaddress"
                    placeholder="janedoe@gmail.com"
                    value={values.emailaddress}
                    onChange={(e) => {
                      setFieldTouched("emailaddress");
                      handleChange(e);
                    }}
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Label>Phone Number </Form.Label>
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    placeholder="1234567894"
                    value={values.phoneNumber}
                    onChange={(e) => {
                      setFieldTouched("phoneNumber");
                      handleChange(e);
                    }}
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <CardElement
                      onChange={(e) => {
                        setIsCardComplete(e.complete);
                        console.log(e);
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group>
                   <Button type="submit"
                      disabled={
                        !isCardComplete ||
                        !isValid ||
                        (!touched.fullName &&
                          !touched.emailaddress &&
                          !touched.phoneNumber)
                      }
                    >
                      Pay Amount
                    </Button>
                  </Form.Group>
                </Col>
              </Row>
            </Form.Group>
          </Container>
        </Form>
      )}
    </Formik>
  );
}
