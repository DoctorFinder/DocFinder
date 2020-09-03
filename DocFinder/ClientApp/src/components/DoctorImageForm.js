import React from "react";
import { Form, Button } from "react-bootstrap";
import {  useLocation, useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import errors from "./errorMessages";


const phoneRegex = RegExp(
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
);


const schema = Yup.object({
  address: Yup.string()
        .required(errors.required.replace("{0}", "Address"))
        .max(30),
    phoneNumber: Yup.string().matches(phoneRegex, "Invalid phone").required(errors.required.replace("{0}","Phone Number"))
});


export function DoctorImageForm(props) {
  let location = useLocation();
  let history = useHistory();

    function goToProfessionalForm(values) {
        props.getProfessionalForm(values);

    }

    if (!props.isProfessionalFormCompleted) {
        return <div>Bhai please complete professional form first </div>
    }

  return (
    <Formik
      validationSchema={schema}
          initialValues={props.defaultImageFormData}
      onSubmit={(values: FState, setSubmitting: any) => {
          console.log(values);
          props.getProfessionalData(values);          
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
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Primary Address </Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={values.address}
              placeholder="Enter Address here"
              onChange={e => {
                setFieldTouched("address");
                handleChange(e);
              }}
            />
            {errors.address && touched.address && <div>{errors.address}</div>}
          </Form.Group>
          <Form.Group>
            <Form.Label> Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              value={values.phoneNumber}
              placeholder="Enter Your Phone Number"
              onChange={e => {
                setFieldTouched("phoneNumber");
                handleChange(e);
              }}
            />
            {errors.phoneNumber &&
              touched.phoneNumber && <div>{errors.phoneNumber}</div>}
                      </Form.Group>
                      <Button onClick={e => {
                          goToProfessionalForm(values);
                      }}>Prev </Button>{""}
          <Button type="submit">Submit </Button>{" "}
        </Form>
      )}
    </Formik>
  );
}
