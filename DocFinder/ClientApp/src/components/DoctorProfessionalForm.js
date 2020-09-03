import React, { useState, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import MultiSelect from "react-multi-select-component";
import * as Yup from "yup";

import errors from "./errorMessages";
import "../Styles/bootstrap.multiselect.css";

const schema = Yup.object({
  education: Yup.string()
    .required()
    .max(10, "university name is too long stupid"),
  degree: Yup.string()
    .required()
    .max(30, errors.tooLong.replace("{0}", "degree").replace("{1}", "30")),
  experience: Yup.number()
    .required()
    .max(100)
    .min(0),
  hospitals: Yup.string()
    .required()
    .max(30),
  license: Yup.string()
    .required()
    .max(30),
  specialities: Yup.array().required(),
  languages: Yup.array().required()
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
        let modifiedData = data.map(function(val, idx) {
          return { label: val.speciality, value: val.id };
        });
        setspecialitiesstate(modifiedData);
      });
  }

  function getLanguagesList() {
    fetch("Language")
      .then(response => response.json())
      .then(data => {
        let modifiedData = data.map(function(val, idx) {
          return { label: val.language, value: val.id };
        });
        setlanguagesstate(modifiedData);
      });
  }
    if (!props.isPersonalFormCompleted) {

        return <div>Dude fill personal details first</div>
    }
  return (
      <Formik      validationSchema={schema}
          initialValues={props.defaultProfessionalFormData}
      onSubmit={(values: FState, setSubmitting: any) => {          
          
          console.log(values);
          props.saveProfessionalFormData(values);
      }}>
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
        <Form
          noValidate
          onSubmit={handleSubmit}>
          <Form.Group>
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
              touched.education && <div>{errors.education}</div>}
          </Form.Group>

          <Form.Group>
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
            {errors.degree && touched.degree && <div>{errors.degree}</div>}
          </Form.Group>

          <Form.Group>
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
              touched.experience && <div>{errors.experience}</div>}
          </Form.Group>

          <Form.Group>
            <Form.Label>Hospitals</Form.Label>
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
            {errors.hospitals &&
              touched.hospitals && <div>{errors.hospitals}</div>}
          </Form.Group>

          <Form.Group>
            <Form.Label>Specialities</Form.Label>
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
            {errors.specialities &&
              touched.specialities && <div>{errors.specialities}</div>}
          </Form.Group>

          <Form.Group>
            <Form.Label>Languages</Form.Label>
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
            {errors.languages &&
              touched.languages && <div>{errors.languages}</div>}
          </Form.Group>

          <Form.Group>
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
            {errors.license && touched.license && <div>{errors.license}</div>}
          </Form.Group>

                      <Button onClick={e => {
                          goToPersonalForm(values);
                      }}>Prev </Button>
          {""}
          <Button type="submit">Next </Button>
          {""}
        </Form>
      )}
    </Formik>
  );
}
