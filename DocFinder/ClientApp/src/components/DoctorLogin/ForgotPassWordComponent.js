import React, { useState} from 'react';
import Modal from "react-bootstrap/Modal";
import { Formik } from "formik";
import * as Yup from "yup";
import { useLocation, useHistory } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import errors from "../../Config/errorMessages";
import "../../Styles/Spinner.css";

const schema = Yup.object({
    emailAddress: Yup.string()
        .required(errors.required.replace("{0}", "Email Address"))
        .email()
});


export function ForgotPasswordComponent() {
    const emptyLoginData = {
        emailAddress: ""         
    };

    let location = useLocation();
    let history = useHistory();
    const [showMsg, setShowMsg] = useState(false);
    const [errorMsg, seterrorMsg] = useState("");
    const [isRequestProcessing, setRequestProcessingStatus] = useState(false);

    function handleClose() {
        let firstIndexOfPath = location.pathname.indexOf("/");
        let homePath = location.pathname.substring(0, firstIndexOfPath);
        history.push(homePath);
    }

    function sendPasswordResetLink(values) {
        const admin = {
            EmailAddress: values.emailAddress,
            Password: ""
        };
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(admin)
        };
        setRequestProcessingStatus(true);
        fetch("PasswordReset/ResetDoctorPassword", requestOptions)
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
                seterrorMsg("Error in Processing request");
            });
    }

    return (
        <div>
            <Modal show={true} onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>Please Enter your Email Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!showMsg && <Formik
                        validationSchema={schema}
                        initialValues={emptyLoginData}
                        onSubmit={(values: FState, setSubmitting: any) => {
                            sendPasswordResetLink(values);
                        }} >
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
                                        <Row md={12} className="justify-content-md-center">
                                            <Col>
                                                <Button
                                                    type="submit"
                                                    disabled={!isValid || !touched.emailAddress}>
                                                    Submit
                        </Button>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Form>
                            )}
                    </Formik>
                    }
                    {showMsg &&
                        <Form.Label>{errorMsg}</Form.Label>
                    }
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
                {isRequestProcessing && <div className="spinner" />}
            </Modal>

            </div>
    )
}