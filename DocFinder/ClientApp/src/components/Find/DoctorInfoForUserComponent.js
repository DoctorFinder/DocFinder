import React, { Fragment, useEffect }  from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Col, Row, Image } from 'react-bootstrap';
import { useRef } from 'react';
import "../../Styles/DoctorCard.css";


export function DoctorInfoForUserComponent(props){

    const location = useLocation();

    let doctor = location.state.Doctor.doctor;

    let address = location.state.Doctor.addresses[0];

    let specialities = location.state.Doctor.specialities;

    let languages = location.state.Doctor.languages;

    const imageRef = useRef();
    
    useEffect(() => {
        if (doctor.userImage != "")
        imageRef.current.src = "data:image/png;base64," + doctor.userImage;
    },[]);

    console.log(location.state.Doctor.doctor);

    return (
        <Fragment>
        <Container fluid={true}>
            <div className="card">
                <div className="card-horizontal">
                    <div className="img-square-wrapper col col-md-2">
                            <Image id="ItemPreview" className="img-fluid" alt="nopes" roundedCircle ref={imageRef} src="../../Images/defaultimage.jpg" />
                    </div>
                    <div className="card-body col col-md-10">
                        <h4 className="card-title">{"Dr." + doctor.firstName + " " + doctor.lastName + "," + doctor.degree}</h4>
                        <p className="card-text">{specialities[0].label}</p>
                        <p className="card-text">{address.address1 + "," + address.address2 + address.city + "," + address.state + "," + address.zipcode}</p>
                    </div>
                </div>
                <div className="card-footer">
                    <small className="text-muted">Last updated 3 mins ago</small>
                </div>
            </div>
        </Container>

            <Container fluid={ true}>
            <Row>
                    <Col>
                        <h2>Education and Background</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3>Specialities </h3>
                        </Col>
                </Row>
                {specialities.map((spec,index) => {
                    return <Row key={index}><Col>{spec.label}</Col> </Row>
                })
                }
                <Row>
                    <Col><h4>Education and Training </h4></Col>
                    </Row>
              
                    <Row>
                        <Col>{doctor.education + "," + doctor.educationCity + "," + doctor.educationCountry + "," + doctor.educationState } </Col>
                    </Row>
                    <Row>
                        <Col>{doctor.fellowshipFrom + "," + doctor.fellowshipCity + "," + doctor.fellowshipCountry + "," + doctor.fellowshipState} </Col>
                    </Row>
                    <Row>
                        <Col>{doctor.residencyFrom + "," + doctor.residencyCity + "," + doctor.residencyCountry + "," + doctor.residencyState} </Col>
                </Row>
                <Row>
                    <Col> <h3>Languages Spoken </h3></Col>                     
                </Row>
                {languages.map((spec, index) => {
                    return <Row key={index}><Col>{spec.label}</Col> </Row>
                })
                }
                <Row>
                    <Col> <h3>Provider's gender</h3></Col>
                </Row>
                <Row>
                    <Col>  { doctor.gender} </Col>
                </Row>
                <Row>
                    <Col> <h3>NPI Number</h3></Col>
                </Row>
                <Row>
                    <Col> { doctor.npiNumber}</Col>
                </Row>
        </Container>
        </Fragment>
        )
}