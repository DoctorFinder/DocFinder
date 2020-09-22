import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import errors from "../../Config/errorMessages";

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

    function LoginAsUserProvided(values) {
        const doctor = {
            EmailAddress: values.emailAddress ,
            Password: values.password
        }
    console.log(values);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" } ,
      body: JSON.stringify(doctor)
    };
    fetch("Doctor/PostDoctorLogin", requestOptions)
      .then(async response => {
        console.log("reasched success");
        debugger;
        const data = await response.json();
        console.log("reasched success after json");
        debugger;
        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
        //        let firstIndexOfPath = location.pathname.indexOf("/");
        //       let doctorProfilePath = location.pathname.substring(0, firstIndexOfPath + 1) + "DoctorProfile";
        //        setRequestProcessingStatus(false);
        //        history.push(doctorProfilePath);
      })
      .catch(error => {
        debugger;
        //        setRequestProcessingStatus(false);
        console.error("There was an error!", error);
      });
  }

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title> Login as a doctor </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Formik
          validationSchema={schema}
          initialValues={emptyLoginData}
          onSubmit={(values: FState, setSubmitting: any) => {
            LoginAsUserProvided(values);
          }}
        >
          {({ handleSubmit, handleChange, values, touched }) => (
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
                          handleChange(e);
                        }}
                      />
                    </Col>
                  </Row>
                  {errors.emailAddress &&
                    touched.emailAddress && <div>{errors.emailAddress}</div>}
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
                          handleChange(e);
                        }}
                      />
                    </Col>
                  </Row>
                  {errors.password &&
                    touched.password && <div>{errors.password}</div>}
                </Form.Group>
                <Row md={12} className="justify-content-md-center">
                  <Col>
                    <Button type="submit">Submit</Button> {""}
                  </Col>
                </Row>
              </Container>
            </Form>
          )}
        </Formik>
      </Modal.Body>

      <Modal.Footer />
    </Modal>
    //        <div>This is doctor login</div>
  );
}
