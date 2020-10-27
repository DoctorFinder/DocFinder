import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import MultiSelect from "react-multi-select-component";
import * as Yup from "yup";
import errors from "../../Config/errorMessages";
import "../../Styles/bootstrap.multiselect.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

Yup.addMethod(Yup.date, "checkGradYear", function (
    errorMessage = "Graduation year cannot be greater than current year"
) {
    return this.test("checkGradYear", errorMessage, value => {
        let currentdate = new Date();
        let currentYear = currentdate.getFullYear();
        let gradYear = value.getFullYear();
        return gradYear <= currentYear;

    });
});

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
    licenseDisclosure: Yup.boolean(),
    license: Yup.string().when(['licenseDisclosure', 'degree'], (licenseDisclosure, degree,schema) => {
        if (degree === 'MD') {
            return schema.required("license is required when degree is MD")
        }
        else if (!licenseDisclosure) {
            return schema.required("Provide License or select do not have it");
        }
                    })
    .trim()
        .max(30, errors.tooLong.replace("{0}", "License").replace("{1}", "30")),
    npiDisclosure: Yup.boolean(),
    npiNumber: Yup.string()
        .when('npiDisclosure', {
            is: false, // alternatively: (val) => val == true
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
    clinicalInterest: Yup.string()
        .trim()
        .required(errors.required.replace("{0}", "Clinical Interests"))
        .max(100, errors.tooLong.replace("{0}", "Clinical Interests").replace("{1}", "100")),
    researchInterest: Yup.string()
        .trim()
        .max(100, errors.tooLong.replace("{0}", "Research Interest").replace("{1}", "100")),
    yearOfGraduation: Yup.date()
        .required(errors.required.replace("{0}", "Year Of Graduation"))
        .checkGradYear(),
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
        .max(30, errors.tooLong.replace("{0}", "State Attended Fellowship").replace("{1}", "30"))
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
    const [npiDisclosureState, setnpiDisclosureState] = useState(props.defaultProfessionalFormData.npiDisclosure);
    const [licenseDisclosureState, setLicenseDisclosureState] = useState(props.defaultProfessionalFormData.licenseDisclosure);

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
                  <Col sm={12} className="margin-bottom">
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
                                          <Form.Label className="block">Year Graduated</Form.Label>
                                          <DatePicker
                                              name="yearOfGraduation"
                                              dateFormat="yyyy"
                                              selected={values.yearOfGraduation}
                                              showYearPicker
                                              yearItemNumber={9}
                                              className="form-control"
                                              onChange={async e => {
                                                  await setFieldValue("yearOfGraduation", e);
                                                  setFieldTouched("yearOfGraduation");
                                              }}
                                          />
                                          {errors.yearOfGraduation &&
                                              touched.yearOfGraduation && (
                                              <div className="errorTxt">{errors.yearOfGraduation}</div>
                                              )}
                                      </Col>
                                  </Row>
                              </Form.Group>

              <Form.Group>
                <Row md={2}>
                  <Col sm={12} className="margin-bottom">
                    <Form.Label>Years In Practise</Form.Label>

                    <Form.Control
                      type="text"
                      name="experience"
                      value={values.experience}
                      placeholder="Enter Experience"
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
                                      <Col sm={12} className="margin-bottom">
                                          <Form.Label>Graduated City </Form.Label>

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
                                          {errors.educationCity &&
                                              touched.educationCity && (
                                              <div className="errorTxt">{errors.educationCity}</div>
                                              )}
                                      </Col>
                </Row>
                              </Form.Group>
                              <Form.Group>
                                  <Row md={2}>
                                      <Col sm={12} className="margin-bottom">
                                          <Form.Label>Graduated Country</Form.Label>

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
                                          {errors.educationCountry &&
                                              touched.educationCountry && (
                                              <div className="errorTxt">{errors.educationCountry}</div>
                                              )}
                                      </Col>
                                      <Col sm={12} className="margin-bottom">
                                          <Form.Label>Graduated State </Form.Label>

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
                                          {errors.educationState &&
                                              touched.educationState && (
                                              <div className="errorTxt">{errors.educationState}</div>
                                              )}
                                      </Col>
                                  </Row>
                              </Form.Group>
                              <Form.Group>
                                  <Row md={2}>
                                      <Col sm={12} className="margin-bottom">
                                          <Form.Label>Residency At</Form.Label>

                                          <Form.Control
                                              type="text"
                                              name="residencyFrom"
                                              value={values.residencyFrom}
                                              placeholder="Enter Residency Attended at"
                                              onChange={e => {
                                                  setFieldTouched("residencyFrom");
                                                  handleChange(e);
                                              }}
                                          />
                                          {errors.residencyFrom &&
                                              touched.residencyFrom && (
                                              <div className="errorTxt">{errors.residencyFrom}</div>
                                              )}
                                      </Col>
                                      <Col sm={12} className="margin-bottom">
                                          <Form.Label>Residency City </Form.Label>

                                          <Form.Control
                                              type="text"
                                              name="residencyCity"
                                              value={values.residencyCity}
                                              placeholder="Enter City Attended Residency"
                                              onChange={e => {
                                                  setFieldTouched("residencyCity");
                                                  handleChange(e);
                                              }}
                                          />
                                          {errors.residencyCity &&
                                              touched.residencyCity && (
                                              <div className="errorTxt">{errors.residencyCity}</div>
                                              )}
                                      </Col>
                                  </Row>
                              </Form.Group>
                              <Form.Group>
                                  <Row md={2}>
                                      <Col sm={12} className="margin-bottom">
                                          <Form.Label>Residency Country</Form.Label>

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
                                          {errors.residencyCountry &&
                                              touched.residencyCountry && (
                                              <div className="errorTxt">{errors.residencyCountry}</div>
                                              )}
                                      </Col>
                                      <Col sm={12} className="margin-bottom">
                                          <Form.Label>Residency State </Form.Label>

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
                                          {errors.residencyState &&
                                              touched.residencyState && (
                                              <div className="errorTxt">{errors.residencyState}</div>
                                              )}
                                      </Col>
                                  </Row>
                              </Form.Group>
                              <Form.Group>
                                  <Row md={2}>
                                      <Col sm={12} className="margin-bottom">
                                          <Form.Label>Fellowship at</Form.Label>

                                          <Form.Control
                                              type="text"
                                              name="fellowshipFrom"
                                              value={values.fellowhipFrom}
                                              placeholder="Enter Fellowship Place"
                                              onChange={e => {
                                                  setFieldTouched("fellowshipFrom");
                                                  handleChange(e);
                                              }}
                                          />
                                          {errors.fellowhipFrom &&
                                              touched.fellowhipFrom && (
                                              <div className="errorTxt">{errors.fellowhipFrom}</div>
                                              )}
                                      </Col>
                                      <Col sm={12} className="margin-bottom">
                                          <Form.Label>Fellowship City </Form.Label>

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
                                          {errors.fellowshipCity &&
                                              touched.fellowshipCity && (
                                              <div className="errorTxt">{errors.fellowshipCity}</div>
                                              )}
                                      </Col>
                                  </Row>
                              </Form.Group>
                              <Form.Group>
                                  <Row md={2}>
                                      <Col sm={12} className="margin-bottom">
                                          <Form.Label>Fellowship Country</Form.Label>

                                          <Form.Control
                                              type="text"
                                              name="fellowshipCountry"
                                              value={values.fellowhipCountry}
                                              placeholder="Enter Country Attended Fellowship"
                                              onChange={e => {
                                                  setFieldTouched("fellowshipCountry");
                                                  handleChange(e);
                                              }}
                                          />
                                          {errors.fellowhipCountry &&
                                              touched.fellowhipCountry && (
                                              <div className="errorTxt">{errors.fellowhipCountry}</div>
                                              )}
                                      </Col>
                                      <Col sm={12} className="margin-bottom">
                                          <Form.Label>Fellowship State </Form.Label>

                                          <Form.Control
                                              type="text"
                                              name="fellowshipState"
                                              value={values.fellowhipState}
                                              placeholder="Enter State Attended Fellowship"
                                              onChange={e => {
                                                  setFieldTouched("fellowshipState");
                                                  handleChange(e);
                                              }}
                                          />
                                          {errors.fellowhipState &&
                                              touched.fellowhipState && (
                                              <div className="errorTxt">{errors.fellowhipState}</div>
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
                       // setselectedSpecialities(e);
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
                                      <Col sm={12} className="margin-bottom">
                                          <Form.Label>Clinical Interests</Form.Label>

                                          <Form.Control
                                              type="text"
                                              name="clinicalInterest"
                                              value={values.clinicalInterest}
                                              placeholder="Personality development;OCD;Mental illness etc"
                                              onChange={e => {
                                                  setFieldTouched("clinicalInterest");
                                                  handleChange(e);
                                              }}
                                          />
                                          {errors.education &&
                                              touched.clinicalInterest && (
                                              <div className="errorTxt">{errors.clinicalInterest}</div>
                                              )}
                                      </Col>
                                      <Col>
                                          <Form.Label>Research Interests</Form.Label>

                                          <Form.Control
                                              type="text"
                                              name="researchInterest"
                                              value={values.researchInterest}
                                              placeholder="Personality development;OCD;Mental illness etc"
                                              onChange={e => {
                                                  setFieldTouched("researchInterest");
                                                  handleChange(e);
                                              }}
                                          />
                                          {errors.degree &&
                                              touched.researchInterest && (
                                              <div className="errorTxt">{errors.researchInterest}</div>
                                              )}
                                      </Col>
                                  </Row>
                              </Form.Group>
              <Form.Group>
                <Row md={2}>
                  <Col sm={12} className="margin-bottom">
                    <Form.Label>License</Form.Label>

                    <Form.Control
                      type="text"
                      name="license"
                      value={values.license}
                      placeholder="Enter License"
                      disabled={licenseDisclosureState}
                      onChange={e => {
                        setFieldTouched("license");
                        handleChange(e);
                      }}
                                          />
                                          <Form.Check label="Do not have it"
                                              type="checkbox"
                                              checked={values.licenseDisclosure}
                                              name="licenseDisclosure"
                                              onChange={e => {
                                                  setFieldTouched("licenseDisclosure");
                                                  handleChange(e);
                                                  setLicenseDisclosureState(!licenseDisclosureState);
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
                                              disabled={npiDisclosureState}
                      onChange={e => {
                        setFieldTouched("npiNumber");
                        handleChange(e);
                      }}
                        />
                                          <Form.Check label="Do not have it"
                                              type="checkbox"
                                              checked={values.npiDisclosure}
                                              name="npiDisclosure"
                                              onChange={e => {
                                                  setFieldTouched("npiDisclosure");
                                                  handleChange(e);
                                                  setnpiDisclosureState(!npiDisclosureState);
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
