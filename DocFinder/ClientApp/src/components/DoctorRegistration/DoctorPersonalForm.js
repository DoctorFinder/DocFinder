import React, { useState,useEffect,useRef} from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Image from 'react-bootstrap/Image'
import DatePicker from "react-datepicker";
import errors from "../../Config/errorMessages";
import "react-datepicker/dist/react-datepicker.css";

Yup.addMethod(Yup.string, "checkForNumbers", function(
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
  emailAddress: Yup.string()
    .required(errors.required.replace("{0}", "Email Address"))
    .email(),
  password: Yup.string()
    .required()
    .matches(
      passwordRegex,
      "Must Contain between 6 to 20 Characters, Atleast One Uppercase, One Lowercase, One Number Required"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required()
    .trim(),
  dateOfBirth: Yup.date()
    .max(new Date("2000-01-01"))
        .required(errors.required.replace("{0}", "Date Of Birth"))    
});

export function DoctorPersonalForm(props) {

    const isMountedRef = useRef(null);
    let isInitialSelect = false;
    let initialImage;
    const [selectedFile, setSelectedFile] = useState(initialImage);
    const [isFileSelected, setIsFileSelected] = useState(isInitialSelect);


    function setUserImage() {
        if (props.defaultPersonalFormData.file.name != "T" ) {
            let reader = new FileReader();
            let file = props.defaultPersonalFormData.file;
            reader.onloadend = () => {
                setSelectedFile(reader.result);
            };
            reader.readAsDataURL(file);
            setIsFileSelected(true);
        }
        else {
            let reader = new FileReader();
            let file = props.defaultPersonalFormData.file;
            reader.onloadend = () => {
                setSelectedFile(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }
    
    function handleFileUpload(event) {
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {             
            setSelectedFile(reader.result);           
        };
        reader.readAsDataURL(file);
    }

    function checkIfFileSelected() {
        if (Object.keys(props.defaultPersonalFormData.file).length > 0) {
            return true;
        }
        return false;
    }

    useEffect(() => {
        isMountedRef.current = true;
        if (isMountedRef.current) {
            setUserImage();
        }

        return () => isMountedRef.current = false;
    },[]);

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
          <div className="docPersonalInfoFormContainer">
           <Container>
              <Form.Group>
                <Row md={2}>
                  <Col sm={12} className="margin-bottom">
                    <Form.Label>First Name</Form.Label>
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
                  <Col>
                    <Form.Label>Middle Name</Form.Label>
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
                    {errors.middleName &&
                      touched.middleName && (
                        <div className="errorTxt">{errors.middleName}</div>
                      )}
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group>
                <Row md={2}>
                  <Col sm={12} className="margin-bottom">
                    <Form.Label>Last Name</Form.Label>
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
                  <Col>
                    <Form.Label className="block">Date Of Birth</Form.Label>
                    <DatePicker
                     name="dateOfBirth"
                     dateFormat="yyyy/MM/dd"
                      selected={values.dateOfBirth}
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      className="form-control"
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
                <Row md={2}>
                  <Col sm={12} className="margin-bottom">
                    <Form.Label> Gender</Form.Label>
                    <div className="radio-item">
                      <input
                        id="male"
                        value="male"
                        defaultChecked={values.gender === "male"}
                        name="gender"
                        type="radio"
                        onChange={handleChange}
                      />
                      <label htmlFor="male">&nbsp; Male</label>
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
                      <label htmlFor="female">&nbsp; Female</label>
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
                         &nbsp; Prefer not to disclose
                      </label>
                    </div>
                  </Col>
                  <Col>
                    <Form.Label>Email address</Form.Label>
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
                    {errors.emailAddress &&
                      touched.emailAddress && (
                        <div className="errorTxt">{errors.emailAddress}</div>
                      )}
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group>
                <Row md={2}>
                  <Col sm={12} className="margin-bottom">
                    <Form.Label>Password</Form.Label>
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
                  <Col>
                    <Form.Label>Confirm Password</Form.Label>
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
                    {errors.confirmPassword &&
                      touched.confirmPassword && (
                        <div className="errorTxt">{errors.confirmPassword}</div>
                      )}
                  </Col>
                                  </Row>
                                  <Row md={2}>
                                      <Col>
                                          <Form.File
                                              id="custom-file"
                                              label="Custom file input"
                                              custom
                                              accept="image/*"
                                              name="file"
                                              onChange={(event) => {
                                                  setFieldValue("file", event.currentTarget.files[0]);
                                                  handleFileUpload(event);
                                                  setIsFileSelected(true);
                                              }} 
                                          />
                                      </Col>
                                      <Col>
                                          {isFileSelected &&
                                              <div>
                                              <img className="img-fluid" src={selectedFile} alt="not found"/>
                                              </div>} 
                                          </Col>
                                      </Row>
              </Form.Group>

              <Row md={6} className="justify-content-md-center">
                <Col>
                  <Button type="submit" className="submitBtn">
                    Next
                  </Button>{" "}
                  {""}
                </Col>
              </Row>
            </Container>
          </div>
        </Form>
      )}
    </Formik>
  );
}
