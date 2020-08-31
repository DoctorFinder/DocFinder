import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";


Yup.addMethod(Yup.string, "checkForNumbers", function (errorMessage = "Cannot Enter Numbers") {
    return this.test("checkForNumbers", errorMessage, value => {
        var hasNumber = /\d/;  
        return !hasNumber.test(value);
    });
});


const schema = Yup.object({
    firstName: Yup.string().max(8).required().checkForNumbers(),
    middleName: Yup.string().max(30).required().checkForNumbers(),
    lastName: Yup.string().max(30).required().checkForNumbers()
});


export function DoctorPersonalForm(props) {
  const [startDate, setStartDate] = useState(new Date());

    return (

        <Formik
            validationSchema={schema}
            initialValues={{
                firstName: '',
                middleName: '',
                lastName:''
            }}> 

            {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors  }) =>
            (
                    <Form noValidate >
      <Form.Group>
                            <Form.Label>First Name 1</Form.Label>
                            <Form.Control type="text" name="firstName" placeholder="First Name" value={values.firstName} onChange={handleChange} isInvalid={!!errors.firstName} />
                            <Form.Control.Feedback type="invalid" >
                                {errors.firstName}
                            </Form.Control.Feedback>
                            </Form.Group>
                           
                        <Form.Group>
        <Form.Label>Middle Name</Form.Label>
                            <Form.Control type="text" name="middleName" placeholder="Middle Name" value={values.middleName} onChange={handleChange} isInvalid={!!errors.middleName} />
                            <Form.Control.Feedback type="invalid" >
                                {errors.middleName}
                            </Form.Control.Feedback>
                        </Form.Group>

                         
                            <Form.Group>
        <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" name="lastName" placeholder="Last Name" value={values.lastName} onChange={handleChange} isInvalid={ !!errors.lastName}/>
                            <Form.Control.Feedback type="invalid" >
                                {errors.lastName}
                            </Form.Control.Feedback>
                        </Form.Group>


                        <Form.Group>

        <Form.Label>Date Of Birth</Form.Label>
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
        />

        <Form.Label>Gender</Form.Label>
        <Form.Check
          type="radio"
          label="Male"
          name="Genderradios"
          id="GenderradiosM"
        />
        <Form.Check
          type="radio"
          label="Female"
          name="Genderradios"
          id="GenderradiosF"
        />

        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter Email" />

        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter Password" />

        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" />
      </Form.Group>

      <Link to={`${props.match.url}/Professional`}>Next </Link>
            </Form>
            )}
            </Formik>
  );
}
