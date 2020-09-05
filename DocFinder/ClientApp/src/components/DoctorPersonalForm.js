import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import errors from "../Config/errorMessages";
import "react-datepicker/dist/react-datepicker.css";

Yup.addMethod(Yup.string, "checkForNumbers", function(
  errorMessage = "Cannot Enter Numbers"
) {
  return this.test("checkForNumbers", errorMessage, value => {
    var hasNumber = /\d/;
    return !hasNumber.test(value);
  });
});

const schema = Yup.object({
  firstName: Yup.string()
        .max(30, errors.tooLong.replace("{0}", "First Name").replace("{1}", "30")).trim()
        .required(errors.required.replace("{0}","First Name"))
    .checkForNumbers(),
  middleName: Yup.string()
      .max(30, errors.tooLong.replace("{0}", "Middle Name").replace("{1}", "30")).trim()
      .required(errors.required.replace("{0}", "Middle Name"))
    .checkForNumbers(),
  lastName: Yup.string()
      .max(30, errors.tooLong.replace("{0}", "Last Name").replace("{1}", "30")).trim()
      .required(errors.required.replace("{0}", "Last Name"))
    .checkForNumbers(),
  emailAddress: Yup.string()
      .required(errors.required.replace("{0}", "Email Address"))
    .email(),
    password: Yup.string().required(errors.required.replace("{0}", "Password")).trim(),
  //  password: Yup.string().required().matches(
  //    "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$",
  //  "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  //),
  confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required().trim(),
  dateOfBirth: Yup.date()
    .max(new Date("2020-9-3"))
      .required(errors.required.replace("{0}", "Date Of Birth"))
});

export function DoctorPersonalForm(props) {
  return (
    <Formik
      validationSchema={schema}
      initialValues={props.defaultPersonalFormData}
      onSubmit={(values: FState, setSubmitting: any) => {
        props.savePersonalFormData(values);
      }}
      validator={() => ({})}
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
        setFieldTouched
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Container>
            <Form.Group>
              <Row md={4}>
                <Col>
                  <Form.Label>First Name</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={values.firstName}
                    onChange={e => {
                      setFieldTouched("firstName");
                      handleChange(e);
                    }}
                  />
                </Col>
                              </Row>
                              {errors.firstName && touched.firstName && <div>{errors.firstName}</div>} 
            </Form.Group>
            <Form.Group>
              <Row md={4}>
                <Col>
                  <Form.Label>Middle Name</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    name="middleName"
                    placeholder="Middle Name"
                    value={values.middleName}
                    onChange={e => {
                      setFieldTouched("middleName");
                      handleChange(e);
                    }}
                  />
                </Col>
              </Row>
              {errors.middleName &&
                touched.middleName && <div>{errors.middleName}</div>}
            </Form.Group>
            <Form.Group>
              <Row md={4}>
                <Col>
                  <Form.Label>Last Name</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={values.lastName}
                    onChange={e => {
                      setFieldTouched("lastName");
                      handleChange(e);
                    }}
                  />
                </Col>
              </Row>
              {errors.lastName &&
                touched.lastName && <div>{errors.lastName}</div>}
            </Form.Group>
            <Form.Group>
              <Row md={4}>
                <Col>
                  <Form.Label>Date Of Birth</Form.Label>
                </Col>
                <Col>
                  <DatePicker
                    name="dateOfBirth"
                    selected={values.dateOfBirth}
                    onChange={async e => {
                      console.log(touched.dateOfBirth);
                      console.log(e);
                      await setFieldValue("dateOfBirth", e);
                      setFieldTouched("dateOfBirth");
                      console.log(values.dateOfBirth);
                    }}
                  />
                </Col>
              </Row>
              {errors.dateOfBirth &&
                touched.dateOfBirth && <div>{errors.dateOfBirth}</div>}
            </Form.Group>
            <Form.Group>
              <Row md={4}>
                <Col>
                  <Form.Label> Gender</Form.Label>
                </Col>
                <Col>
                  <div className="radio-item">
                    <input
                      id="male"
                      value="male"
                      defaultChecked={values.gender === "male"}
                      name="gender"
                      type="radio"
                      onChange={handleChange}
                    />
                    <label htmlFor="male">Male</label>
                  </div>
                  <div className="radio-item">
                    <input
                      id="female"
                      value="female"
                      name="gender"
                      defaultChecked={values.gender === "female"}
                      type="radio"
                      onChange={handleChange}
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Row md={4}>
                <Col>
                  <Form.Label>Email address</Form.Label>
                </Col>
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
              {errors.emailAddress &&
                touched.emailAddress && <div>{errors.emailAddress}</div>}
            </Form.Group>
            <Form.Group>
              <Row md={4}>
                <Col>
                  <Form.Label>Password</Form.Label>
                </Col>
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
              {errors.password &&
                touched.password && <div>{errors.password}</div>}
            </Form.Group>
            <Form.Group>
              <Row md={4}>
                <Col>
                  <Form.Label>Confirm Password</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={values.confirmPassword}
                    onChange={e => {
                      setFieldTouched("confirmPassword");
                      handleChange(e);
                    }}
                  />
                </Col>
              </Row>
              {errors.confirmPassword &&
                touched.confirmPassword && <div>{errors.confirmPassword}</div>}
                          </Form.Group>
                          <Row md={2} className="justify-content-md-center">
                              <Col >
                                  <Button type="submit">Next</Button> {""}
                                  </Col>
                              </Row>
          </Container>
        </Form>
      )}
    </Formik>
  );
}
