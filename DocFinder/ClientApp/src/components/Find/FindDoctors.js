import React, { useState, Fragment, useEffect } from 'react';
import { Form, Row, Col, Button, Container, Card } from 'react-bootstrap';
import { DoctorCard } from './DoctorCard';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';




export function FindDoctorsComponent() {
    const [singleSelections, setSingleSelections] = useState([]);
    const [options, setOptions] = useState([]);
    const [doctorsList, setDoctorsList] = useState([]);

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

    function getDoctors() {
        fetch("Doctor/GetAllDoctors")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setDoctorsList(data);
            });
    }

    useEffect(() => {
        getSpecialitiesList();
    },[])
    
    return (
        <Fragment>
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
                                name="education"
                                placeholder="Enter Zipcode"/>
                        </Col>
                        <Col>
                            <Button onClick={getDoctors}>
                                Search
                                </Button>
                            </Col>
                        </Row>
                </Form.Group>
            </Container>
            <Container>
                {doctorsList.length > 0 && doctorsList.map(doc => {
                    return <DoctorCard doctor={doc} key={doc.doctor.id} />
                }) }
                </Container>
            </Fragment>        
    )
}