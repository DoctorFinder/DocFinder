import React, { useState} from 'react';
import { Route, useLocation, useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import errors from "../../Config/errorMessages";


const passwordRegex = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/);
const schema = Yup.object({

    password: Yup.string()
        .required()
        .matches(
            passwordRegex,
            "Must Contain between 6 to 20 Characters, Atleast One Uppercase, One Lowercase, One Number Required"
        ),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required()
        .trim()
});

export function ResetPasswordComponent(props) {

    const location = useLocation();
    const [showMsg, setShowMsg] = useState(false);
    const [errorMsg, seterrorMsg] = useState("");
    const [isRequestProcessing, setRequestProcessingStatus] = useState(false);
    let tokenIndex = location.search.indexOf("=");
    let tokenLength = location.search.length;
    let token = location.search.substring(tokenIndex + 1, tokenLength);

    const emptyPassword = {
        password: "",
        confirmPassword: ""
    };

    function ResetPassword(values) {

        const password = {
            ResetToken: token,
            Password: values.password
        };
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(password)
        };
        setRequestProcessingStatus(true);
        fetch("PasswordReset/UpdatePassword", requestOptions)
            .then(async response => {
                const data = await response.json();
                console.log(data);
                setShowMsg(true);

                if (!response.ok) {
                    let error = (data && data.message) || response.status;
                    if (data.responseMessage) {
                        error = data.responseMessage;
                    }
                    return Promise.reject(error);
                }
                seterrorMsg(data);
                setRequestProcessingStatus(false);
            })
            .catch(error => {
                setShowMsg(true);
                setRequestProcessingStatus(false);
                seterrorMsg("Error in Updating Password");
            });
    }

    return (
    <div>
        {!showMsg && <Formik
            validationSchema={schema}
            initialValues={emptyPassword}
            onSubmit={(values: FState, setSubmitting: any) => {
                ResetPassword(values);
            }}
            validator={() => ({})}>
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
                                <Row md={8}>
                                    <Col>
                                        <Form.Label>Password</Form.Label>
                                    </Col>
                                </Row>
                                <Row md={8}>
                                    <Col>
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
                                    </Col>
                                    {errors.password &&
                                        touched.password && (
                                            <div className="errorTxt">{errors.password}</div>
                                        )}
                                </Row>
                            </Form.Group>
                            <Form.Group>
                                <Row md={8}>
                                    <Col>
                                        <Form.Label>Confirm Password</Form.Label>
                                    </Col>
                                </Row>
                                <Row md={8}>
                                    <Col>
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
                            </Form.Group>
                            <Row md={12} className="justify-content-md-center">
                                <Col>
                                    <Button
                                        type="submit"
                                        disabled={
                                            !isValid ||
                                            (!touched.password && !touched.confirmPassword)
                                        }>Update</Button>
                                </Col>
                            </Row>

                            <Row>
                                <Form.Label>{errorMsg}</Form.Label>
                            </Row>
                        </Container>
                    </Form>
                )
            }
    </Formik>
        }
            {showMsg && 
    <Form.Label>{errorMsg}</Form.Label>
            }
            {isRequestProcessing && <div className="spinner" />}
            </div>
        )
}