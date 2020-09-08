import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import MultiSelect from "react-multi-select-component";
import * as Yup from "yup";
import errors from "../Config/errorMessages";
import "../Styles/bootstrap.multiselect.css";

const schema = Yup.object({
  education: Yup.string().trim()
        .required(errors.required.replace("{0}", "Education"))
        .max(30, errors.tooLong.replace("{0}", "Education").replace("{1}","30")),
    degree: Yup.string().trim()
        .required(errors.required.replace("{0}", "Degree"))
    .max(30, errors.tooLong.replace("{0}", "Degree").replace("{1}", "30")),
    experience: Yup.number()
        .required(errors.required.replace("{0}", "Experience"))
    .max(100)
    .min(0),
    hospitals: Yup.string().trim()
        .required(errors.required.replace("{0}", "Hospitals"))
        .max(30, errors.tooLong.replace("{0}", "Hospitals").replace("{1}", "30")),
    license: Yup.string().trim()
        .required(errors.required.replace("{0}", "License"))
        .max(30, errors.tooLong.replace("{0}", "License").replace("{1}", "30")),
    specialities: Yup.array().required(errors.required.replace("{0}", "Specialities")),
    languages: Yup.array().required(errors.required.replace("{0}", "Languages"))
});

export function DoctorProfessionalForm(props) {
  const specialitiesOverrideOptions = {
    selectSomeItems: "Select Specialities",
    allItemsAreSelected: "All items are selected.",
    selectAll: "Select All",
    search: "Search"
  };

  const languagesKnownOverrideOptions = {
    selectSomeItems: "Select Languages",
    allItemsAreSelected: "All items are selected.",
    selectAll: "Select All",
    search: "Search"
  };

  const [specialitiesstate, setspecialitiesstate] = useState([]);
  const [languagesstate, setlanguagesstate] = useState([]);

  const [selectedSpeciality, setselectedSpecialities] = useState([]);
  const [selectedLanguages, setselectedLanguages] = useState([]);

  useEffect(() => {
    getSpecialitiesList();
    getLanguagesList();
  }, []);

  function goToPersonalForm(values) {
    props.getPersonalForm(values);
  }

  function getSpecialitiesList() {
    fetch("Speciality")
      .then(response => response.json())
      .then(data => {
          let modifiedData = data.map(function (val, idx) {
              return { label: val.label, value: val.value };
        });
        setspecialitiesstate(modifiedData);
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
  if (!props.isPersonalFormCompleted) {
    return <div>Dude fill personal details first</div>;
  }
  return (
    <Formik
      validationSchema={schema}
      initialValues={props.defaultProfessionalFormData}
      onSubmit={(values: FState, setSubmitting: any) => {
        console.log(values);
        props.saveProfessionalFormData(values);
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
        <Form noValidate onSubmit={handleSubmit}>
          <Container>
            <Form.Group>
                              <Row md={4}>
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
                touched.education && <div>{errors.education}</div>}
            </Form.Group>

            <Form.Group>
                              <Row md={4}>
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
              {errors.degree && touched.degree && <div>{errors.degree}</div>}
            </Form.Group>

            <Form.Group>
                              <Row md={4}>
                <Col>
                  <Form.Label>Years In Practise</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    name="experience"
                    value={values.experience}
                    placeholder="Enter Education"
                    onChange={e => {
                      setFieldTouched("experience");
                      handleChange(e);
                    }}
                  />
                </Col>
              </Row>
              {errors.experience &&
                touched.experience && <div>{errors.experience}</div>}
            </Form.Group>

            <Form.Group>
                              <Row md={4}>
                <Col>
                  <Form.Label>Hospitals</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    name="hospitals"
                    value={values.hospitals}
                    placeholder="Enter Education"
                    onChange={e => {
                      setFieldTouched("hospitals");
                      handleChange(e);
                    }}
                  />
                </Col>
              </Row>
              {errors.hospitals &&
                touched.hospitals && <div>{errors.hospitals}</div>}
            </Form.Group>

            <Form.Group>
                              <Row md={4}>
                <Col>
                  <Form.Label>Specialities</Form.Label>
                </Col>
                <Col>
                  <MultiSelect
                    name="specialities"
                    options={specialitiesstate}
                    value={values.specialities}
                    overrideStrings={specialitiesOverrideOptions}
                    onChange={async e => {
                      setselectedSpecialities(e);
                      await setFieldValue("specialities", e);
                      setFieldTouched("specialities");
                    }}
                    labelledBy={"Select"}
                  />
                </Col>
              </Row>
              {errors.specialities &&
                touched.specialities && <div>{errors.specialities}</div>}
            </Form.Group>

            <Form.Group>
                              <Row md={4}>
                <Col>
                  <Form.Label>Languages</Form.Label>
                </Col>
                <Col>
                  <MultiSelect
                    name="languages"
                    options={languagesstate}
                    value={values.languages}
                    overrideStrings={languagesKnownOverrideOptions}
                    onChange={async e => {
                      setselectedLanguages(e);
                      await setFieldValue("languages", e);
                      setFieldTouched("languages");
                    }}
                    labelledBy={"Select"}
                  />
                </Col>
              </Row>
              {errors.languages &&
                touched.languages && <div>{errors.languages}</div>}
            </Form.Group>

            <Form.Group>
                              <Row md={4}>
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
              {errors.license && touched.license && <div>{errors.license}</div>}
            </Form.Group>
                          <Row className="justify-content-md-center">
                              <Col>
            <Button    onClick={e => {
                goToPersonalForm(values);
              }}
            > Prev</Button> {""}
                       <Button type="submit">Next </Button> {""}
                                  </Col>
                              </Row>
          </Container>
        </Form>
      )}
    </Formik>
  );
}
