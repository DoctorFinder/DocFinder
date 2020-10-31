import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Col, Row, Image } from 'react-bootstrap';
import { useRef } from 'react';
import "../../Styles/DoctorCard.css";


export function DoctorInfoForUserComponent(props){

    const location = useLocation();

    var doctor = {
        firstName: "",
        lastName: "",
        degree:""
    }

    var address = {
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipcode:""
    }

    var specialities = {
        label:""
    }

    const imageRef = useRef();

    console.log(location);

    return (
        <Container fluid={true}>
            <div className="card">
                <div className="card-horizontal">
                    <div className="img-square-wrapper col col-md-2">
                        <Image id="ItemPreview" className="img-fluid" alt="nopes" roundedCircle ref={imageRef} />
                    </div>
                    <div className="card-body col col-md-10">
                        <h4 className="card-title">{"Dr." + doctor.firstName + " " + doctor.lastName + "," + doctor.degree}</h4>
                        <p className="card-text">{specialities.label}</p>
                        <p className="card-text">{address.address1 + "," + address.address2 + "," + address.city + "," + address.state + "," + address.zipcode}</p>
                    </div>
                </div>
                <div className="card-footer">
                    <small className="text-muted">Last updated 3 mins ago</small>
                </div>
            </div>
        </Container>
        )
}