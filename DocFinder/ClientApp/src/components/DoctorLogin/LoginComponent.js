import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import errors from "../../Config/errorMessages";

const schema = Yup.object({
    emailAddress: Yup.string()
        .required(errors.required.replace("{0}", "Email Address"))
        .email(),
    password: Yup.string()
        .required(errors.required.replace("{0}", "Password"))
        .trim()
});

export function LoginComponent(props) {

    const emptyLoginData = {
        emailAddress: "",
        password: ""
    };

    return (
        <Formik
            validationSchema={schema}
            initialValues={emptyLoginData}
            onSubmit={(values: FState, setSubmitting: any) => {
                props.LoginAsUserProvided(values);
            }}
        >
            {({
                handleSubmit,
                handleChange,
                values,
                errors,
                touched,
                isValid,
                setFieldTouched
            }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Container>
                            <Form.Group>
                                <Row md={12}>
                                    <Col>
                                        <Form.Label>Email address</Form.Label>
                                    </Col>
                                </Row>
                                <Row md={12}>
                                    <Col>
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
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group>
                                <Row md={12}>
                                    <Col>
                                        <Form.Label>Password</Form.Label>
                                    </Col>
                                </Row>
                                <Row md={12}>
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
                                </Row>
                            </Form.Group>
                            <Row md={12} className="justify-content-md-center">
                                <Col>
                                    <Button
                                        type="submit"
                                        disabled={
                                            !isValid ||
                                            (!touched.password && !touched.emailAddress)
                                        }
                                    >
                                        Submit
                        </Button>{" "}
                                    {""}
                                </Col>
                            </Row>
                            <Row md={12}>
                                <Col>
                                    <Button>Forgot Password</Button>
                                    </Col>
                                </Row>
                        </Container>
                    </Form>
                )}
        </Formik>
        )
}