import React, { useState,useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useLocation, useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import errors from "../../Config/errorMessages";
import { Fragment } from "react";
//import useAddressPredictions from "../useAddressPredictions";

const phoneRegex = RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
const zipcodeRegex = RegExp(/(^\d{5}$)|(^\d{5}-\d{4}$)/);

const schema = Yup.object({
    address1: Yup.string()
        .required(errors.required.replace("{0}", "Address1"))
        .max(30),
    address2: Yup.string().max(
        30,
        errors.tooLong.replace("{0}", "Address2").replace("{1}", 30)
    ),
    city: Yup.string()
        .required(errors.required.replace("{0}", "City"))
        .max(30, errors.tooLong.replace("{0}", "City").replace("{1}", 30)),
    state: Yup.string()
        .required(errors.required.replace("{0}", "State"))
        .max(30, errors.tooLong.replace("{0}", "State").replace("{1}", 30)),
    zipcode: Yup.string()
        .matches(zipcodeRegex, "Zipcode entered is not valid")
        .required(errors.required.replace("{0}", "zip code")),
    phoneNumber: Yup.string()
        .matches(phoneRegex, "Phone Number entered is not valid")
        .required(errors.required.replace("{0}", "Phone Number"))
});

export function DoctorImageForm(props) {
    let location = useLocation();
    let history = useHistory();

    const [input, setInput] = useState("");
    const [displayAddressDiv, setdisplayAddressDiv] = useState(false);


    //const predictions = useAddressPredictions(input);
    

    //const onAddressSelected = async (placeid, setFieldValue) => {
    //    const firstIdx = placeid.indexOf('"') + 1;
    //    const lastIdx = placeid.lastIndexOf('"');
    //    var substr = placeid.substring(firstIdx, lastIdx);
    //    var addressDetails = predictions.filter(function (e) {
    //        if (e.place_id == substr) {
    //            return e;
    //        }
    //    })
    //    var address = addressDetails[0].terms;
    //    console.log(address);
    //    const address1 = address[0].value + " " + address[1].value;
    //    const city = address[2].value;
    //    const state = address[3].value;
    //    await setFieldValue("address1", address1);
    //    await setFieldValue("city", city);
    //    await setFieldValue("state", state);
    //};

                   //<ul>
                                                //{ displayAddressDiv && predictions.map((prediction, index) => (
                                            //        <li key={prediction.place_id} value={prediction.place_id} onMouseDown={async e => {

                                            //            const palceid = e.target.outerHTML;
                                            //            await onAddressSelected(palceid, setFieldValue);
                                            //            setdisplayAddressDiv(false);
                                            //           // await setFieldValue("address1", e.target.key,false);                                                      
                                            //        }}>{prediction.description}</li>
                                            //    ))}
                                            //</ul>

    function goToProfessionalForm(values) {
        props.getProfessionalForm(values);
    }

    //  if (!props.isProfessionalFormCompleted) {
    //  return <div>Bhai please complete professional form first </div>;
    //return <Spinner animation="grow"/>
    //            {props.isRequestProcessing && <Spinner animation="grow" style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"  }} />}
    //}

    return (
        <Fragment>
            <Formik
                validationSchema={schema}
                initialValues={props.defaultImageFormData}
                onSubmit={(values: FState, setSubmitting: any) => {
                    console.log(values);
                    props.saveImageFormData(values);
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
                            <Container>
                                <Form.Group>
                                    <Row md={4}>
                                        <Col>
                                            <Form.Label>Address 1 </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                autoComplete="off"
                                                type="text"
                                                name="address1"
                                                value={values.address1}
                                                placeholder="Enter Address here"
                                                onChange={async e => {
                                                    setdisplayAddressDiv(true);
                                                    setFieldTouched("address1");
                                                    // handlechange()
                                                    const va = e.target.value;
                                                    console.log(e);
                                                    console.log(e.target);
                                                    console.log(e.target.value);
                                                    await setFieldValue("address1", e.target.value);
//                                                    console.log(predictions);
  //                                                  setInput(va);
                                                }}
                                                onBlur={e => {
                                                //    debugger;
                                                    console.log("on blur called");
   //                                                 e.pre
                                                    setdisplayAddressDiv(false);
                                                }}
                                               // onMouseOut={e => {
                                                 //   console.log(e);
                                               // }}
                                            />
                             

                                        </Col>
                                    </Row>
                                    {errors.address1 &&
                                        touched.address1 && <div>{errors.address1}</div>}
                                </Form.Group>
                                <Form.Group>
                                    <Row md={4}>
                                        <Col>
                                            <Form.Label>Address 2 </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="address2"
                                                value={values.address2}
                                                placeholder="Enter Address here"
                                                onChange={e => {
                                                    setFieldTouched("address2");
                                                    handleChange(e);
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    {errors.address2 &&
                                        touched.address2 && <div>{errors.address2}</div>}
                                </Form.Group>
                                <Form.Group>
                                    <Row md={4}>
                                        <Col>
                                            <Form.Label>City </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="city"
                                                value={values.city}
                                                placeholder="Enter City here"
                                                onChange={e => {
                                                    setFieldTouched("city");
                                                    handleChange(e);
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    {errors.city && touched.city && <div>{errors.city}</div>}
                                </Form.Group>
                                <Form.Group>
                                    <Row md={4}>
                                        <Col>
                                            <Form.Label>State </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="state"
                                                value={values.state}
                                                placeholder="Enter Address here"
                                                onChange={e => {
                                                    setFieldTouched("state");
                                                    handleChange(e);
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    {errors.state && touched.state && <div>{errors.state}</div>}
                                </Form.Group>
                                <Form.Group>
                                    <Row md={4}>
                                        <Col>
                                            <Form.Label>ZipCode </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="zipcode"
                                                value={values.zipcode}
                                                placeholder="Enter Address here"
                                                onChange={e => {
                                                    setFieldTouched("zipcode");
                                                    handleChange(e);
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    {errors.zipcode &&
                                        touched.zipcode && <div>{errors.zipcode}</div>}
                                </Form.Group>
                                <Form.Group>
                                    <Row md={4}>
                                        <Col>
                                            <Form.Label> Phone Number</Form.Label>
                                        </Col>
                                        <Col>
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
                                        </Col>
                                    </Row>
                                    {errors.phoneNumber &&
                                        touched.phoneNumber && <div>{errors.phoneNumber}</div>}
                                </Form.Group>
                                <Row className="justify-content-md-center">
                                    <Col>
                                        <Button
                                            onClick={e => {
                                                goToProfessionalForm(values);
                                            }}
                                        >
                                            Prev{" "}
                                        </Button>{" "}
                                        {""}
                                        <Button type="submit">Submit </Button>{" "}
                                    </Col>
                                </Row>
                            </Container>
                        </Form>
                    )}
            </Formik>
            {props.submissionErrorState && <div>{props.errorMsg}</div>}
        </Fragment>
    );
}
