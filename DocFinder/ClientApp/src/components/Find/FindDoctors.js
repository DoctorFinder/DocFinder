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

    function getDoctors(values) {
        setAddressforCode(values.zipcode);      
    }

    function getNearByDoctors(geoCodes) {
        console.log(geoCodes);
        fetch("Doctor/GetAllDoctors")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setDoctorsList(data);
            });
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
                        return <DoctorCard doctor={doc} key={doc.doctor.id} />
                    })}
                </Container>
                <Container fluid={true}>
                    {doctorsList.length > 0 &&
                        <MapWithAMarker
                        doctors={doctorsList }
                            test="src"
                            containerElement={<div style={{ height: `100%`, width: `100%` }} />}
                            mapElement={<div style={{ height: `100%`, width: `100%` }} />}
                        />}
                </Container>
                </div>
            </Fragment>        
    )
}