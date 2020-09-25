import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import MultiSelect from "react-multi-select-component";
import * as Yup from "yup";
import errors from "../Config/errorMessages";
import "../Styles/bootstrap.multiselect.css";

const schema = Yup.object({
  education: Yup.string()
    .trim()
    .required(errors.required.replace("{0}", "Education"))
    .max(30, errors.tooLong.replace("{0}", "Education").replace("{1}", "30")),
  degree: Yup.string()
    .trim()
    .required(errors.required.replace("{0}", "Degree"))
    .max(30, errors.tooLong.replace("{0}", "Degree").replace("{1}", "30")),
  experience: Yup.number()
    .required(errors.required.replace("{0}", "Experience"))
    .max(100)
    .min(0),
  license: Yup.string()
    .trim()
    .max(30, errors.tooLong.replace("{0}", "License").replace("{1}", "30")),
  npiNumber: Yup.string()
    .trim()
    .required(errors.required.replace("{0}", "NPI Number"))
    .max(30, errors.tooLong.replace("{0}", "NPI Number").replace("{1}", "30")),
  specialities: Yup.array().required(
    errors.required.replace("{0}", "Specialities")
    ),
    subspecialities: Yup.array().required(
        errors.required.replace("{0}", "Sub Specialities")
    ),
  languages: Yup.array().required(errors.required.replace("{0}", "Languages"))
});

export function DoctorProfessionalForm(props) {
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

  const [specialitiesstate, setspecialitiesstate] = useState([]);
  const [languagesstate, setlanguagesstate] = useState([]);
  const [subspecialitiesstate, setSubspecialitiesstate] = useState([]);

    const [selectedSpeciality, setselectedSpecialities] = useState([]);
    const [selectedSubSpeciality, setselectedSubSpecialities] = useState([]);
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
          <div className="docPersonalInfoFormContainer">
            <Container>
              <Form.Group>
                <Row md={2}>
                  <Col>
                    <Form.Label>Education</Form.Label>

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
                    {errors.education &&
                      touched.education && (
                        <div className="errorTxt">{errors.education}</div>
                      )}
                  </Col>
                  <Col>
                    <Form.Label>Degree</Form.Label>

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
                    {errors.degree &&
                      touched.degree && (
                        <div className="errorTxt">{errors.degree}</div>
                      )}
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group>
                <Row md={2}>
                  <Col>
                    <Form.Label>Years In Practise</Form.Label>

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
                    {errors.experience &&
                      touched.experience && (
                        <div className="errorTxt">{errors.experience}</div>
                      )}
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group>
                <Row md={2}>
                  <Col>
                    <Form.Label>Specialities</Form.Label>

                    <MultiSelect
                      name="specialities"
                      options={specialitiesstate}
                      value={values.specialities}
                      overrideStrings={specialitiesOverrideOptions}
                      hasSelectAll={false}
                      onChange={async e => {
                        setselectedSpecialities(e);
                        await setFieldValue("specialities", e);
                        setFieldTouched("specialities");
                      }}
                      labelledBy={"Select"}
                    />
                    {errors.specialities &&
                      touched.specialities && (
                        <div className="errorTxt">{errors.specialities}</div>
                      )}
                  </Col>
                  <Col>
                    <Form.Label>Sub Specialities</Form.Label>

                    <MultiSelect
                      name="subspecialities"
                      options={subspecialitiesstate}
                      value={values.subspecialities}
                      overrideStrings={subspecialitiesOverrideOptions}
                      hasSelectAll={false}
                      onChange={async e => {
                          setselectedSubSpecialities(e);
                        await setFieldValue("subspecialities", e);
                        setFieldTouched("subspecialities");
                      }}
                      labelledBy={"Select"}
                    />
                    {errors.subspecialities &&
                      touched.subspecialities && (
                        <div className="errorTxt">{errors.subspecialities}</div>
                      )}
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group>
                <Row md={2}>
                  <Col>
                    <Form.Label>Languages</Form.Label>

                    <MultiSelect
                      name="languages"
                      options={languagesstate}
                      value={values.languages}
                      overrideStrings={languagesKnownOverrideOptions}
                      hasSelectAll={false}
                      onChange={async e => {
                        setselectedLanguages(e);
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
                <Row md={2}>
                  <Col>
                    <Form.Label>License</Form.Label>

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
                    {errors.license &&
                      touched.license && (
                        <div className="errorTxt">{errors.license}</div>
                      )}
                  </Col>
                  <Col>
                    <Form.Label>NPI Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="npiNumber"
                      value={values.npiNumber}
                      placeholder="Enter NPI Number"
                      onChange={e => {
                        setFieldTouched("npiNumber");
                        handleChange(e);
                      }}
                    />
                    {errors.npiNumber &&
                      touched.npiNumber && (
                        <div className="errorTxt">{errors.npiNumber}</div>
                      )}
                  </Col>
                </Row>
              </Form.Group>
              <Row md={1} className="justify-content-md-center">
                <Col>
                  <Button
                    className="submitBtn"
                    onClick={e => {
                      goToPersonalForm(values);
                    }}
                  >
                    {" "}
                    Prev
                  </Button>{" "}
                  {""}
                  <Button className="submitBtn" type="submit">
                    Next{" "}
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
