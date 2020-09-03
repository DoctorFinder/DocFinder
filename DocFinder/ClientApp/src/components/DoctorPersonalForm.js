import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useLocation, useHistory } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

Yup.addMethod(Yup.string, "checkForNumbers", function(
  errorMessage = "Cannot Enter Numbers"
) {
  return this.test("checkForNumbers", errorMessage, value => {
    var hasNumber = /\d/;
    return !hasNumber.test(value);
  });
});

const schema = Yup.object({
  firstName: Yup.string()
    .max(30)
    .required()
    .checkForNumbers(),
  middleName: Yup.string()
    .max(30)
    .required()
    .checkForNumbers(),
  lastName: Yup.string()
    .max(30)
    .required()
    .checkForNumbers(),
  emailAddress: Yup.string()
    .required()
    .email(),
  password: Yup.string().required(),
  //  password: Yup.string().required().matches(
  //    "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$",
  //  "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  //),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required(),
  dateOfBirth: Yup.date()
    .max(new Date("2020-9-3"))
    .required()
});

export function DoctorPersonalForm(props) {
  //const [startDate, setStartDate] = useState(new Date());

  let location = useLocation();
  let history = useHistory();

  return (
    <Formik
      validationSchema={schema}
          initialValues={props.defaultPersonalFormData}
      onSubmit={(values: FState, setSubmitting: any) => {
        props.savePersonalFormData(values);
//        history.push(location.pathname + "/Professional");
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
          <Form.Group>
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
              touched.firstName && <div>{errors.firstName}</div>}
          </Form.Group>
          <Form.Group>
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
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label> 
            <Form.Control type="text" 
              name="lastName" placeholder="Last Name"
              value={values.lastName}
              onChange={e => {
                setFieldTouched("lastName");
                handleChange(e);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date Of Birth</Form.Label>
            <DatePicker
              name="dateOfBirth"
              selected={values.dateOfBirth}
              onChange={async e => {
                console.log(touched.dateOfBirth);
                console.log(e);
                await setFieldValue("dateOfBirth", e);
                setFieldTouched("dateOfBirth");
                console.log(values.dateOfBirth);
                //  handleChange(e);
              }}
            />
            {errors.dateOfBirth &&
              touched.dateOfBirth && <div>{errors.dateOfBirth}</div>}
          </Form.Group>
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
          <Form.Group>
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
          </Form.Group>
          <Form.Group>
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
          </Form.Group>
          <Form.Group>
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
          </Form.Group>
          <Button type="submit">Next</Button> {""}
        </Form>
      )}
    </Formik>
  );
}
