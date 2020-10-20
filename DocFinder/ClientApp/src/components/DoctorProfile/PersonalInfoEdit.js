import React from "react";
import { Formik } from "formik";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import errors from "../../Config/errorMessages";

Yup.addMethod(Yup.string, "checkForNumbers", function (
    errorMessage = "Cannot Enter Numbers"
) {
    return this.test("checkForNumbers", errorMessage, value => {
        var hasNumber = /\d/;
        return !hasNumber.test(value);
    });
});

const passwordRegex = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/);
const schema = Yup.object({
  firstName: Yup.string()
    .max(30, errors.tooLong.replace("{0}", "First Name").replace("{1}", "30"))
    .trim()
    .required(errors.required.replace("{0}", "First Name"))
    .checkForNumbers(),
  middleName: Yup.string()
    .max(30, errors.tooLong.replace("{0}", "Middle Name").replace("{1}", "30"))
    .trim()
    .checkForNumbers(),
  lastName: Yup.string()
    .max(30, errors.tooLong.replace("{0}", "Last Name").replace("{1}", "30"))
    .trim()
    .required(errors.required.replace("{0}", "Last Name"))
    .checkForNumbers(),
   password: Yup.string()
    .required()
    .matches(
      passwordRegex,
      "Must Contain between 6 to 20 Characters, Atleast One Uppercase, One Lowercase, One Number Required"
    ),
  dateOfBirth: Yup.date()
    .max(new Date("2000-01-01"))
    .required(errors.required.replace("{0}", "Date Of Birth"))
});

export function PersonalInfoEdit(props) {
  return (
      <Formik
          validationSchema={schema}
          initialValues={props.DoctorDetails}
          onSubmit={(values: FState, setSubmitting: any) => {
              props.SaveDoctorPersonalData(values);
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
        setFieldTouched
      }) => (
                  <Form noValidate onSubmit={e => {
                      handleSubmit(e);
                  }}>
          <Container>
            <Form.Group>
              <Row md={6}>
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
                  {errors.firstName &&
                    touched.firstName && (
                      <div className="errorTxt">{errors.firstName}</div>
                    )}
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Row md={6}>
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
            </Form.Group>
            <Form.Group>
              <Row md={6}>
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
                  {errors.lastName &&
                    touched.lastName && (
                      <div className="errorTxt">{errors.lastName}</div>
                    )}
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Row md={6}>
                <Col>
                  {" "}
                  <Form.Label>Date Of Birth</Form.Label>{" "}
                </Col>
                <Col>
                  <DatePicker
                    name="dateOfBirth"
                    selected={new Date(values.dateOfBirth)}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    maxDate={new Date()}
                    onChange={async e => {
                      await setFieldValue("dateOfBirth", e);
                      setFieldTouched("dateOfBirth");
                    }}
                  />
                  {errors.dateOfBirth &&
                    touched.dateOfBirth && (
                      <div className="errorTxt">{errors.dateOfBirth}</div>
                    )}
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Row md={6}>
                <Col>
                  <Form.Label>Gender</Form.Label>
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
                  <div className="radio-item">
                    <input
                      id="nondisclosure"
                      value="nondisclosure"
                      name="gender"
                      defaultChecked={values.gender === "nondisclosure"}
                      type="radio"
                      onChange={handleChange}
                    />
                    <label htmlFor="nondisclosure">
                      Prefer not to disclose
                    </label>
                  </div>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Row md={6}>
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
                  {errors.password &&
                    touched.password && (
                      <div className="errorTxt">{errors.password}</div>
                    )}
                </Col>
              </Row>
                          </Form.Group>
                          <Row md={6} className="justify-content-md-center">
                              <Col>
                                  <Button type="submit" className="submitBtn">
                                      Save
                               </Button>{" "}
                                  <Button className="submitBtn" onClick={props.SetReadOnlyMode}>
                                      Cancel
                               </Button>{" "}
                              </Col>
                          </Row>                                 
          </Container>
        </Form>
      )}
    </Formik>
  );
}
