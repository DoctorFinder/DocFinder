import React, { useState, Fragment, useEffect, useRef } from 'react';
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Row, Col, Button, Container, Card } from 'react-bootstrap';
import { DoctorCard } from './DoctorCard';
import MapWithAMarker from './DoctorAddressesMap';
import useGeoCoder from "../useGeoCoder";
import { Typeahead } from 'react-bootstrap-typeahead';
import errors from "../../Config/errorMessages";
import 'react-bootstrap-typeahead/css/Typeahead.css';


export function FindDoctorsComponent() {
    const [hoveredDoctorId, setHoveredDoctorId] = useState(0);
    const [singleSelections, setSingleSelections] = useState([]);
    const [options, setOptions] = useState([]);
    const [doctorsList, setDoctorsList] = useState([]);
    const [addressforCode, setAddressforCode] = useState("");
    const geoCodes = useGeoCoder(addressforCode);

    const emptySearchData = {
        doctorSpeciality: "",
        zipcode:""
    }

    function getSpecialitiesList() {
        fetch("Speciality")
            .then(response => response.json())
            .then(data => {
                let modifiedData = data.map(function (val, idx) {
                    return { label: val.label, value: val.value };
                });
                setOptions(modifiedData);
            });
    }

    function setSelectedDoctorId(doctorId) {
        setHoveredDoctorId(doctorId);
    }

    function getDoctors(values) {
        if (values.zipcode == "") {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    let currentLocation = [];
                    currentLocation.push(position.coords.latitude);
                    currentLocation.push(position.coords.longitude);
                    getNearByDoctors(currentLocation);
                },
                function (error) {
                    console.error("Error Code = " + error.code + " - " + error.message);
                }
            );
        }
        setAddressforCode(values.zipcode);      
    }

    function getNearByDoctors(geoCodes) {
        
        if (addressforCode != "" || geoCodes.length != 0) {
            var speciality = "";
            if (singleSelections && singleSelections.length > 0) {
                speciality = singleSelections[0].label;
            }

            fetch(`Doctor/GetDoctorsByLocation?Latitude=${geoCodes[0]}&Longitude=${geoCodes[1]}&speciality=${speciality}`)
                .then(response => response.json())
                .then(data => {
                    setDoctorsList(data);
                });
        }
    }

    useEffect(() => {
        getSpecialitiesList();
    }, [])

    useEffect(() => {
        getNearByDoctors(geoCodes);
    }, [geoCodes])
    
    return (
        <Fragment>
            <Formik  
                initialValues={emptySearchData}
                onSubmit={(values: FState, setSubmitting: any) => {
                    getDoctors(values);
                    console.log(values);
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
            <Container>                
                <Form.Group>
                    <Row md={3}>
                        <Col>
                <Typeahead
                    id="basic-typeahead-single"
                    labelKey="label"
                    onChange={setSingleSelections}
                    options={options}
                    placeholder="Choose doctor speciality..."
                    selected={singleSelections}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                 name="zipcode"
                                      value={values.zipcode}
                                    onChange={e => {
                                  handleChange(e);
                                                }}
                                placeholder="Enter Zipcode"/>
                        </Col>
                        <Col>
                                            <Button type="submit" className="submitBtn">
                                Search
                                </Button>
                            </Col>
                        </Row>
                </Form.Group>
                </Container>
                        </Form>
                    )}
            </Formik>
            <div className="parent-container d-flex">
    <Container fluid={true}>
        {doctorsList.length > 0 && doctorsList.map(doc => {
            return <DoctorCard doctor={doc} key={doc.doctor.id} SetSelectedDoctorId={setSelectedDoctorId}/>
        })}
                </Container>
                    <Container fluid={true}>
        {doctorsList.length > 0 &&
            <MapWithAMarker
                doctors={doctorsList}
                test="src"
                hoveredDoctorId={hoveredDoctorId}
                containerElement={<div style={{ height: `100%`, width: `100%` }} />}
                mapElement={<div style={{ height: `100%`, width: `100%` }} />}
            />}
    </Container>
</div>
            </Fragment>        
    )
}

