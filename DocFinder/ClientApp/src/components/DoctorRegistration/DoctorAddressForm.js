import React, { useState, useEffect,useRef } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import errors from "../../Config/errorMessages";
import { Fragment } from "react";
import useAddressPredictions from "../useAddressPredictions";
import usePlaceDetails from "../usePlaceDetails";
import { TimingsDialog } from "./TimingsDialog";

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

export function DoctorAddressForm(props) {

    const formikRef = useRef();
    const [input, setInput] = useState("");
    const [placeId, setPlaceId] = useState("");
    const [address1state, setAddress1state] = useState("");
    const [address2state, setAddress2state] = useState("");
    const [citystate, setCitystate] = useState("");
    const [statestate, setStatestate] = useState("");
    const [postalcodestate, setPostalcodestate] = useState("");
    const [displayAddressDiv, setdisplayAddressDiv] = useState(false);
    const [displayTimingsModal, setDisplayTimingsModal] = useState(false);
    const [hospitaltimings, setHospitaltimings] = useState(props.item.timings)
    const [addressComponentstate, setAddressComponent] = useState([]);


    const predictions = useAddressPredictions(input);
    const placeInfo = usePlaceDetails(placeId);

    useEffect(() => {
        displayPlaceAddress(placeInfo)
    }, [placeInfo]);

    const onAddressSelected = async (placeid, setFieldValue) => {
        const firstIdx = placeid.indexOf('"') + 1;
        const lastIdx = placeid.lastIndexOf('"');
        var substr = placeid.substring(firstIdx, lastIdx);
        setPlaceId(substr);

     //   var addressDetails = predictions.filter(function (e) {
       //     if (e.place_id == substr) {
         //       return e;
           // }
       // })
        //var address = addressDetails[0].terms;
       // const address1 = address[0].value + " " + address[1].value;
        //const city = address[2].value;
        //const state = address[3].value;
        //await setFieldValue("address1", address1);
        //await setFieldValue("city", city);
        //await setFieldValue("state", state);
    };

    function getTypeFromaddress(type, addressComponent) {
        let typeValue = addressComponent.filter((component) => {            
            if (component.types.includes(type)) {
                return true;
            }
        });
        console.log(typeValue);
        return typeValue.length > 0 ? typeValue[0]['long_name'] : '';
    }

    function displayPlaceAddress(placeInfo) {     
        if (!Array.isArray(placeInfo)) {
            let addressComponent = placeInfo["address_components"]; 
            let address1 = getTypeFromaddress("street_number", addressComponent) + getTypeFromaddress("route", addressComponent); //        addressComponent[0]["long_name"] + " " + addressComponent[1]["long_name"];
            let address2 = getTypeFromaddress("neighborhood", addressComponent);
            let city = getTypeFromaddress("locality", addressComponent);
            let state = getTypeFromaddress("administrative_area_level_1", addressComponent);
            let postalcode = getTypeFromaddress("postal_code", addressComponent);
            if (formikRef.current) {
                formikRef.current.setFieldValue("address1", address1);
                formikRef.current.setFieldValue("address2", address2);
                formikRef.current.setFieldValue("city", city);
                formikRef.current.setFieldValue("state", state);
                formikRef.current.setFieldValue("zipcode", postalcode);
            }
        }

    }

    function updateHospitalTimings(updatedTimings) {
        setHospitaltimings(updatedTimings)
    }

    function goToProfessionalForm(values) {
        props.getProfessionalForm(values);
    }

    function ToggleTimingsModal() {
        setDisplayTimingsModal(!displayTimingsModal);
    }

    function saveImageFormData(values) {
        values.timings = hospitaltimings;
        props.saveImageFormData(values);
    }

      if (!props.isProfessionalFormCompleted) {
      return <div>Bhai please complete professional form first </div>;
    }

    return (
        <Fragment>
            <Formik
                innerRef={formikRef}
                validationSchema={schema}
                initialValues={props.item}
                onSubmit={(values: FState, setSubmitting: any) => {
                    saveImageFormData(values) 
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
                                                    await setFieldValue("address1", e.target.value);
                                                    setInput(va);
                                                }}
                                                onBlur={e => {
                                                    setdisplayAddressDiv(false);
                                                }}
                                            // onMouseOut={e => {
                                            //   console.log(e);
                                            // }}
                                            />
                                            <ul>
                                                {displayAddressDiv && predictions.map((prediction, index) => (
                                                    <li key={prediction.place_id} value={prediction.place_id} onMouseDown={async e => {

                                                        const palceid = e.target.outerHTML;
                                                        await onAddressSelected(palceid, setFieldValue);
                                                        setdisplayAddressDiv(false);                                                     
                                                    }}>{prediction.description}</li>
                                                ))}
                                            </ul>


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
                                <Form.Group>
                                    <Row md={4}>
                                        <Col>
                                            <Form.Label>Web Address</Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                name="webAddress"
                                                value={values.webAddress}
                                                placeholder="Enter Your Web Url"
                                                onChange={e => {
                                                    setFieldTouched("webAddress");
                                                    handleChange(e);
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    {errors.webAddress &&
                                        touched.webAddress && <div>{errors.webAddress}</div>}
                                </Form.Group>
                                <Form.Group>
                                    <Row md={2}>
                                        <Col>
                                            <Button onClick={ToggleTimingsModal}>Add Timings</Button>
                                        </Col>
                                        <Col>
                                            <TimingsDialog
                                                DisplayModal={displayTimingsModal}
                                                ToggleModal={ToggleTimingsModal}
                                                Hospitaltimings={hospitaltimings}
                                                UpdateHospitalTimings={updateHospitalTimings}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Row className="justify-content-md-center">
                                    <Col>
                                        <Button type="submit">Save </Button>{" "}
                                    </Col>
                                </Row>
                            </Container>
                        </Form>
                    )}
            </Formik>
            <div id="service-helper"></div>
        </Fragment>
    );
}
