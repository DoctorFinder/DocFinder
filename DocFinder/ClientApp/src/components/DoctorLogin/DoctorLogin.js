import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { Route, useLocation, useHistory } from "react-router-dom";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { MenuTypeContext } from "../../context/MenuContextProvider";
import errors from "../../Config/errorMessages";
import "../../Styles/Spinner.css";

const schema = Yup.object({
  emailAddress: Yup.string()
    .required(errors.required.replace("{0}", "Email Address"))
    .email(),
  password: Yup.string()
    .required(errors.required.replace("{0}", "Password"))
    .trim()
});

export function DoctorLoginComponent() {
  const emptyLoginData = {
    emailAddress: "",
    password: ""
  };

  const [show, setShow] = useState(true);
  const [errorMsg, seterrorMsg] = useState("");

  const [isRequestProcessing, setRequestProcessingStatus] = useState(false);
  const context = useContext(MenuTypeContext);

  let location = useLocation();
  let history = useHistory();

  function handleClose() {
    let firstIndexOfPath = location.pathname.indexOf("/");
    let homePath = location.pathname.substring(0, firstIndexOfPath);
    setShow(false);
    history.push(homePath);
  }

  function LoginAsUserProvided(values) {
    const doctor = {
      EmailAddress: values.emailAddress,
      Password: values.password
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doctor)
    };
    setRequestProcessingStatus(true);
    fetch("Doctor/PostDoctorLogin", requestOptions)
      .then(async response => {
        const data = await response.json();
        debugger;
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
        setRequestProcessingStatus(false);
        context.dispatch({ type: "doctor" });
        history.push(doctorProfilePath, { doctordetails: data });
      })
      .catch(error => {
        debugger;
        setRequestProcessingStatus(false);
        seterrorMsg(error);
        console.error("There was an error!", error);
      });
  }

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Login as a doctor </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <fieldset disabled={isRequestProcessing}>
            <Formik
              validationSchema={schema}
              initialValues={emptyLoginData}
              onSubmit={(values: FState, setSubmitting: any) => {
                console.log(values);
                LoginAsUserProvided(values);
              }}
            >
              {({
                handleSubmit,
                handleChange,
                values,
                errors,
                touched,
                isValid,
                setFieldTouched
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Container>
                    <Form.Group>
                      <Row md={12}>
                        <Col>
                          <Form.Label>Email address</Form.Label>
                        </Col>
                      </Row>
                      <Row md={12}>
                        <Col>
                          <Form.Control
                            type="email"
                            name="emailAddress"
                            placeholder="Enter Email"
                            value={values.emailAddress}
                            onChange={e => {
                              setFieldTouched("emailAddress");
                              handleChange(e);
                            }}
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group>
                      <Row md={12}>
                        <Col>
                          <Form.Label>Password</Form.Label>
                        </Col>
                      </Row>
                      <Row md={12}>
                        <Col>
                          <Form.Control
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={values.password}
                            onChange={e => {
                              setFieldTouched("password");
                              handleChange(e);
                            }}
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                    <Row md={12} className="justify-content-md-center">
                      <Col>
                        <Button
                          type="submit"
                          disabled={
                            !isValid ||
                            (!touched.password && !touched.emailAddress)
                          }
                        >
                          Submit
                        </Button>{" "}
                        {""}
                        {console.log(touched)}
                      </Col>
                    </Row>
                  </Container>
                </Form>
              )}
            </Formik>
          </fieldset>
        </Modal.Body>

        <Modal.Footer>
          <label> {errorMsg}</label>
        </Modal.Footer>
        {isRequestProcessing && <div className="spinner" />}
      </Modal>
    </div>
    //        <div>This is doctor login</div>
  );
}
