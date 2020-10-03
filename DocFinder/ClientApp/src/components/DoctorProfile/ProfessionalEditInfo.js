import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import MultiSelect from "react-multi-select-component";
import * as Yup from "yup";
import errors from "../../Config/errorMessages";

const schema = Yup.object({
  education: Yup.string()
    .trim()
    .required(errors.required.replace("{0}", "Education"))
    .max(30, errors.tooLong.replace("{0}", "Education").replace("{1}", "30")),
  degree: Yup.string()
    .trim()
    .required(errors.required.replace("{0}", "Degree"))
    .max(30, errors.tooLong.replace("{0}", "Degree").replace("{1}", "30")),
    yearsInPractice: Yup.number()
    .required(errors.required.replace("{0}", "Experience"))
    .max(100)
    .min(0),
  license: Yup.string()
    .trim()
    .max(30, errors.tooLong.replace("{0}", "License").replace("{1}", "30")),
  npiDisclosure: Yup.boolean(),
  npiNumber: Yup.string()
    .when("npiDisclosure", {
      is: false,
      then: Yup.string().required()
    })
    .trim()
    .max(30, errors.tooLong.replace("{0}", "NPI Number").replace("{1}", "30")),
  specialities: Yup.array().required(
    errors.required.replace("{0}", "Specialities")
  ),
  subspecialities: Yup.array().required(
    errors.required.replace("{0}", "Sub Specialities")
  ),
  languages: Yup.array().required(errors.required.replace("{0}", "Languages"))
});

export function ProfessionalEditInfo(props) {
  const [specialitiesstate, setspecialitiesstate] = useState([]);
  const [subspecialitiesstate, setSubspecialitiesstate] = useState([]);
  const [languagesstate, setlanguagesstate] = useState([]);
  const [npiDisclosureState, setnpiDisclosureState] = useState(
    props.DoctorDetails.npiDisclosure
  );

  useEffect(() => {
    getSpecialitiesList();
    getLanguagesList();
  }, []);

  const specialitiesOverrideOptions = {
    selectSomeItems: "Select Specialities",
    allItemsAreSelected: "All items are selected.",
    search: "Search Specialities"
  };

  const languagesKnownOverrideOptions = {
    selectSomeItems: "Select Specialities",
    allItemsAreSelected: "All items are selected.",
    search: "Search Languages"
  };

  const subspecialitiesOverrideOptions = {
    selectSomeItems: "Select Languages",
    allItemsAreSelected: "All items are selected.",
    search: "Search Sub Specialities"
  };

  function getSpecialitiesList() {
    fetch("Speciality")
      .then(response => response.json())
      .then(data => {
        let modifiedData = data.map(function(val, idx) {
          return { label: val.label, value: val.value };
        });
        setspecialitiesstate(modifiedData);
        setSubspecialitiesstate(modifiedData);
      });
  }

  function getLanguagesList() {
    fetch("Language")
      .then(response => response.json())
      .then(data => {
        let modifiedData = data.map(function(val, idx) {
          return { label: val.label, value: val.value };
        });
        setlanguagesstate(modifiedData);
      });
  }
    console.log(props);
  return (
      <Formik
          validationSchema={schema}
          initialValues={props.DoctorDetails}
          onSubmit={(values: FState, setSubmitting: any) => {
              props.SaveDoctorProfessionalData(values);
              console.log("testing this");
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
                      console.log("test here prof");
                      console.log(errors);
                      console.log(isValid);
                      handleSubmit(e);
                  }}>
          <Container>
            <Form.Group>
              <Row md={6}>
                <Col>
                  <Form.Label>Education</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    name="education"
                    value={values.education}
                    placeholder="Enter University"
                    onChange={e => {
                      setFieldTouched("education");
                      handleChange(e);
                    }}
                  />
                </Col>
              </Row>
              {errors.education &&
                touched.education && (
                  <div className="errorTxt">{errors.education}</div>
                )}
            </Form.Group>
            <Form.Group>
              <Row md={6}>
                <Col>
                  <Form.Label>Degree</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    name="degree"
                    value={values.degree}
                    placeholder="Enter Degree"
                    onChange={e => {
                      setFieldTouched("degree");
                      handleChange(e);
                    }}
                  />
                </Col>
              </Row>
              {errors.degree &&
                touched.degree && (
                  <div className="errorTxt">{errors.degree}</div>
                )}
            </Form.Group>
            <Form.Group>
              <Row md={6}>
                <Col>
                  <Form.Label>Years In Practise</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    name="yearsInPractice"
                    value={values.yearsInPractice}
                    placeholder="Enter Education"
                    onChange={e => {
                      setFieldTouched("yearsInPractice");
                      handleChange(e);
                    }}
                  />
                </Col>
              </Row>
              {errors.experience &&
                touched.experience && (
                  <div className="errorTxt">{errors.experience}</div>
                )}
            </Form.Group>
            <Form.Group>
              <Row>
                <Col>
                  <Form.Label>Specialities</Form.Label>
                </Col>
                <Col>
                  <MultiSelect
                    name="specialities"
                    options={specialitiesstate}
                    value={values.specialities}
                    overrideStrings={specialitiesOverrideOptions}
                    hasSelectAll={false}
                    onChange={async e => {
                      await setFieldValue("specialities", e);
                      setFieldTouched("specialities");
                    }}
                    labelledBy={"Select"}
                  />
                </Col>
              </Row>
              {errors.specialities &&
                touched.specialities && (
                  <div className="errorTxt">{errors.specialities}</div>
                )}
            </Form.Group>
            <Form.Group>
              <Row>
                <Col>
                  <Form.Label>Sub Specialities</Form.Label>
                </Col>
                <Col>
                  <MultiSelect
                    name="subspecialities"
                    options={subspecialitiesstate}
                    value={values.subspecialities}
                    overrideStrings={subspecialitiesOverrideOptions}
                    hasSelectAll={false}
                    onChange={async e => {
                      await setFieldValue("subspecialities", e);
                      setFieldTouched("subspecialities");
                    }}
                    labelledBy={"Select"}
                  />
                </Col>
              </Row>
              {errors.subspecialities &&
                touched.subspecialities && (
                  <div className="errorTxt">{errors.subspecialities}</div>
                )}
            </Form.Group>
            <Form.Group>
              <Row>
                <Col>
                  <Form.Label>Languages</Form.Label>
                </Col>
                <Col>
                  <MultiSelect
                    name="languages"
                    options={languagesstate}
                    value={values.languages}
                    overrideStrings={languagesKnownOverrideOptions}
                    hasSelectAll={false}
                    onChange={async e => {
                      await setFieldValue("languages", e);
                      setFieldTouched("languages");
                    }}
                    labelledBy={"Select"}
                  />
                  {errors.languages &&
                    touched.languages && (
                      <div className="errorTxt">{errors.languages}</div>
                    )}
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Row>
                <Col>
                  <Form.Label>License</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    name="license"
                    value={values.license}
                    placeholder="Enter License"
                    onChange={e => {
                      setFieldTouched("license");
                      handleChange(e);
                    }}
                  />
                </Col>
              </Row>
              {errors.license &&
                touched.license && (
                  <div className="errorTxt">{errors.license}</div>
                )}
            </Form.Group>
            <Form.Group>
              <Row>
                <Col>
                  <Form.Label>NPI Number</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    name="npiNumber"
                    value={values.npiNumber}
                    placeholder="Enter NPI Number"
                    disabled={npiDisclosureState}
                    onChange={e => {
                      setFieldTouched("npiNumber");
                      handleChange(e);
                    }}
                  />
                  <Form.Check
                    label="wish not to specify"
                    type="checkbox"
                    checked={values.npiDisclosure}
                    name="npiDisclosure"
                    onChange={e => {
                      setFieldTouched("npiDisclosure");
                      handleChange(e);
                      console.log(e);
                      console.log(values.npiDisclosure);
                      setnpiDisclosureState(!npiDisclosureState);
                    }}
                  />
                </Col>
              </Row>
              {errors.npiNumber &&
                touched.npiNumber && (
                  <div className="errorTxt">{errors.npiNumber}</div>
                )}
                          </Form.Group>
                          <Row md={6} className="justify-content-md-center">
                              <Col>
                                  <Button type="submit" className="submitBtn">
                                      Save
                               </Button>{" "}
                                  <Button className="submitBtn" onClick={props.CancelProfessionalData}>
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
