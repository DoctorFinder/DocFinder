import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import MultiSelect from "react-multi-select-component";
import * as Yup from "yup";
import errors from "../../Config/errorMessages";
import fetch from 'cross-fetch' 

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
    languages: Yup.array().required(errors.required.replace("{0}", "Languages")),
    educationCity: Yup.string()
        .trim()
        .max(30, errors.tooLong.replace("{0}", "City Graduated From").replace("{1}", "30")),
    educationCountry: Yup.string()
        .trim()
        .max(30, errors.tooLong.replace("{0}", "Country Graduated From").replace("{1}", "30")),
    educationState: Yup.string()
        .trim()
        .max(30, errors.tooLong.replace("{0}", "State Graduated From").replace("{1}", "30")),
    residencyFrom: Yup.string()
        .trim()
        .max(30, errors.tooLong.replace("{0}", "Place Attended Residency").replace("{1}", "30")),
    residencyCity: Yup.string()
        .trim()
        .max(30, errors.tooLong.replace("{0}", "City Attended Residency").replace("{1}", "30")),
    residencyCountry: Yup.string()
        .trim()
        .max(30, errors.tooLong.replace("{0}", "Country Attended Residency").replace("{1}", "30")),
    residencyState: Yup.string()
        .trim()
        .max(30, errors.tooLong.replace("{0}", "State Attended Residency").replace("{1}", "30")),
    fellowshipFrom: Yup.string()
        .trim()
        .max(30, errors.tooLong.replace("{0}", "Place Attended Fellowship").replace("{1}", "30")),
    fellowshipCity: Yup.string()
        .trim()
        .max(30, errors.tooLong.replace("{0}", "City Attended Fellowship").replace("{1}", "30")),
    fellowshipCountry: Yup.string()
        .trim()
        .max(30, errors.tooLong.replace("{0}", "Country Attended Fellowship").replace("{1}", "30")),
    fellowshipState: Yup.string()
        .trim()
        .max(30, errors.tooLong.replace("{0}", "State Attended Fellowship").replace("{1}", "30")),
    clinicalInterests: Yup.string()
        .trim()
        .required(errors.required.replace("{0}", "Clinical Interests"))
        .max(100, errors.tooLong.replace("{0}", "Clinical Interests").replace("{1}", "100")),
    researchInterests: Yup.string()
        .trim()
        .max(100, errors.tooLong.replace("{0}", "Research Interest").replace("{1}", "100")),
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
  return (
      <Formik
          validationSchema={schema}
          initialValues={props.DoctorDetails}
          onSubmit={(values: FState, setSubmitting: any) => {
              props.SaveDoctorProfessionalData(values);
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
              <Row md={12}>
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
              <Row md={12}>
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
              <Row md={12}>
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
                              <Row md={12}>
                                  <Col>
                                      <Form.Label>Graduated City</Form.Label>
                                  </Col>
                                  <Col>
                                      <Form.Control
                                          type="text"
                                          name="educationCity"
                                          value={values.educationCity}
                                          placeholder="Enter City Graduated From"
                                          onChange={e => {
                                              setFieldTouched("educationCity");
                                              handleChange(e);
                                          }}
                                      />
                                  </Col>
                              </Row>
                              {errors.educationCity &&
                                  touched.educationCity && (
                                  <div className="errorTxt">{errors.educationCity}</div>
                                  )}
                          </Form.Group>
                          <Form.Group>
                              <Row md={12}>
                                  <Col>
                                      <Form.Label>Graduated Country</Form.Label>
                                  </Col>
                                  <Col>
                                      <Form.Control
                                          type="text"
                                          name="educationCountry"
                                          value={values.educationCountry}
                                          placeholder="Enter Country Graduated From"
                                          onChange={e => {
                                              setFieldTouched("educationCountry");
                                              handleChange(e);
                                          }}
                                      />
                                  </Col>
                              </Row>
                              {errors.educationCountry &&
                                  touched.educationCountry && (
                                  <div className="errorTxt">{errors.educationCountry}</div>
                                  )}
                          </Form.Group>
                          <Form.Group>
                              <Row md={12}>
                                  <Col>
                                      <Form.Label>Graduated State</Form.Label>
                                  </Col>
                                  <Col>
                                      <Form.Control
                                          type="text"
                                          name="educationState"
                                          value={values.educationState}
                                          placeholder="Enter State Graduated From"
                                          onChange={e => {
                                              setFieldTouched("educationState");
                                              handleChange(e);
                                          }}
                                      />
                                  </Col>
                              </Row>
                              {errors.educationState &&
                                  touched.educationState && (
                                  <div className="errorTxt">{errors.educationState}</div>
                                  )}
                          </Form.Group>
                          <Form.Group>
                              <Row md={12}>
                                  <Col>
                                      <Form.Label>Residency At</Form.Label>
                                  </Col>
                                  <Col>
                                      <Form.Control
                                          type="text"
                                          name="residencyFrom"
                                          value={values.residencyFrom}
                                          placeholder="Enter Residency Attended At"
                                          onChange={e => {
                                              setFieldTouched("residencyFrom");
                                              handleChange(e);
                                          }}
                                      />
                                  </Col>
                              </Row>
                              {errors.residencyFrom &&
                                  touched.residencyFrom && (
                                  <div className="errorTxt">{errors.residencyFrom}</div>
                                  )}
                          </Form.Group>
                          <Form.Group>
                              <Row md={12}>
                                  <Col>
                                      <Form.Label>Residency City</Form.Label>
                                  </Col>
                                  <Col>
                                      <Form.Control
                                          type="text"
                                          name="residencyCity"
                                          value={values.residencyCity}
                                          placeholder="Enter City Attended Residency "
                                          onChange={e => {
                                              setFieldTouched("residencyCity");
                                              handleChange(e);
                                          }}
                                      />
                                  </Col>
                              </Row>
                              {errors.residencyCity &&
                                  touched.residencyCity && (
                                  <div className="errorTxt">{errors.residencyCity}</div>
                                  )}
                          </Form.Group>
                          <Form.Group>
                              <Row md={12}>
                                  <Col>
                                      <Form.Label>Residency Country</Form.Label>
                                  </Col>
                                  <Col>
                                      <Form.Control
                                          type="text"
                                          name="residencyCountry"
                                          value={values.residencyCountry}
                                          placeholder="Enter Country Attended Residency"
                                          onChange={e => {
                                              setFieldTouched("residencyCountry");
                                              handleChange(e);
                                          }}
                                      />
                                  </Col>
                              </Row>
                              {errors.residencyCountry &&
                                  touched.residencyCountry && (
                                  <div className="errorTxt">{errors.residencyCountry}</div>
                                  )}
                          </Form.Group>
                          <Form.Group>
                              <Row md={12}>
                                  <Col>
                                      <Form.Label>Residency State</Form.Label>
                                  </Col>
                                  <Col>
                                      <Form.Control
                                          type="text"
                                          name="residencyState"
                                          value={values.residencyState}
                                          placeholder="Enter State Attended Residency"
                                          onChange={e => {
                                              setFieldTouched("residencyState");
                                              handleChange(e);
                                          }}
                                      />
                                  </Col>
                              </Row>
                              {errors.residencyState &&
                                  touched.residencyState && (
                                  <div className="errorTxt">{errors.residencyState}</div>
                                  )}
                          </Form.Group>
                          <Form.Group>
                              <Row md={12}>
                                  <Col>
                                      <Form.Label>Fellowship At</Form.Label>
                                  </Col>
                                  <Col>
                                      <Form.Control
                                          type="text"
                                          name="fellowshipFrom"
                                          value={values.fellowshipFrom}
                                          placeholder="Enter Fellowship Place"
                                          onChange={e => {
                                              setFieldTouched("fellowshipFrom");
                                              handleChange(e);
                                          }}
                                      />
                                  </Col>
                              </Row>
                              {errors.fellowshipFrom &&
                                  touched.fellowshipFrom && (
                                  <div className="errorTxt">{errors.fellowshipFrom}</div>
                                  )}
                          </Form.Group>
                          <Form.Group>
                              <Row md={12}>
                                  <Col>
                                      <Form.Label>Fellowship City</Form.Label>
                                  </Col>
                                  <Col>
                                      <Form.Control
                                          type="text"
                                          name="fellowshipCity"
                                          value={values.fellowshipCity}
                                          placeholder="Enter City Attended Fellowship"
                                          onChange={e => {
                                              setFieldTouched("fellowshipCity");
                                              handleChange(e);
                                          }}
                                      />
                                  </Col>
                              </Row>
                              {errors.fellowshipCity &&
                                  touched.fellowshipCity && (
                                  <div className="errorTxt">{errors.fellowshipCity}</div>
                                  )}
                          </Form.Group>
                          <Form.Group>
                              <Row md={12}>
                                  <Col>
                                      <Form.Label>Fellowship Country</Form.Label>
                                  </Col>
                                  <Col>
                                      <Form.Control
                                          type="text"
                                          name="fellowshipCountry"
                                          value={values.fellowshipCountry}
                                          placeholder="Enter Country Attended Fellowship"
                                          onChange={e => {
                                              setFieldTouched("fellowshipCountry");
                                              handleChange(e);
                                          }}
                                      />
                                  </Col>
                              </Row>
                              {errors.fellowshipCountry &&
                                  touched.fellowshipCountry && (
                                  <div className="errorTxt">{errors.fellowshipCountry}</div>
                                  )}
                          </Form.Group>
                          <Form.Group>
                              <Row md={12}>
                                  <Col>
                                      <Form.Label>Fellowship State</Form.Label>
                                  </Col>
                                  <Col>
                                      <Form.Control
                                          type="text"
                                          name="fellowshipState"
                                          value={values.fellowshipState}
                                          placeholder="Enter State Attended Fellowship"
                                          onChange={e => {
                                              setFieldTouched("fellowshipState");
                                              handleChange(e);
                                          }}
                                      />
                                  </Col>
                              </Row>
                              {errors.fellowshipState &&
                                  touched.fellowshipState && (
                                  <div className="errorTxt">{errors.fellowshipState}</div>
                                  )}
                          </Form.Group>
                          <Form.Group>
                              <Row md={12}>
                                  <Col>
                                      <Form.Label>Clinical Interests</Form.Label>
                                  </Col>
                                  <Col>
                                      <Form.Control
                                          type="text"
                                          name="clinicalInterests"
                                          value={values.clinicalInterests}
                                          placeholder="Personality development;OCD;Mental illness etc"
                                          onChange={e => {
                                              setFieldTouched("clinicalInterests");
                                              handleChange(e);
                                          }}
                                      />
                                  </Col>
                              </Row>
                              {errors.clinicalInterests &&
                                  touched.clinicalInterests && (
                                  <div className="errorTxt">{errors.clinicalInterests}</div>
                                  )}
                          </Form.Group>
                          <Form.Group>
                              <Row md={12}>
                                  <Col>
                                      <Form.Label>Research Interests</Form.Label>
                                  </Col>
                                  <Col>
                                      <Form.Control
                                          type="text"
                                          name="researchInterests"
                                          value={values.researchInterests}
                                          placeholder="Personality development;OCD;Mental illness etc"
                                          onChange={e => {
                                              setFieldTouched("researchInterests");
                                              handleChange(e);
                                          }}
                                      />
                                  </Col>
                              </Row>
                              {errors.researchInterests &&
                                  touched.researchInterests && (
                                  <div className="errorTxt">{errors.researchInterests}</div>
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
