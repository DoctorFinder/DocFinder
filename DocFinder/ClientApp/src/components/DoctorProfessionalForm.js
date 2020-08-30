import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Link} from 'react-router-dom'

export function DoctorProfessionalForm(props) {

    const [linkToImage, setlinkToImagePath] = useState(props.match.url);
    const [linkToPersonal, setlinkToPersonalPath] = useState(props.match.url);

    useEffect(() => {
        getSpecialitiesList();
        let lastIdx = props.match.url.lastIndexOf("/");
        let linkRoute = props.match.url.substring(0, lastIdx);
        setlinkToImagePath(linkRoute + "/Image");
        setlinkToPersonalPath(linkRoute);
    }, []);

    function getSpecialitiesList() {
        fetch("Speciality").then((response) => response.json())
            .then((data) => {setSpecialitiesDropdown(data);});
    }


    function setSpecialitiesDropdown(data) {
        console.log(data);
    }


    return (
        <Form>
            <Form.Group>
                <Form.Label>Education</Form.Label>
                <Form.Control type="text" placeholder="Enter Education"></Form.Control>

                <Form.Label>Degree</Form.Label>
                <Form.Control type="text" placeholder="Enter Education"></Form.Control>

                <Form.Label>Years In Practise</Form.Label>
                <Form.Control type="text" placeholder="Enter Education"></Form.Control>

                <Form.Label>Hospitals</Form.Label>
                <Form.Control type="text" placeholder="Enter Education"></Form.Control>

                <Form.Label>Specialities</Form.Label>
                <Form.Control type="text" placeholder="Enter Education"></Form.Control>

                <Form.Label>License</Form.Label>
                <Form.Control type="text" placeholder="Enter License"></Form.Control>

                <Form.Label>Languages</Form.Label>
                <Form.Control type="text" placeholder="Enter Languages Known"></Form.Control>
            </Form.Group>

            <Link to={linkToPersonal}>Prev </Link> 
            <Link to={linkToImage}>Next </Link>
        </Form>
    )
}