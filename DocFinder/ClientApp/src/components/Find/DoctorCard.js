import React, { useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../../Styles/DoctorCard.css";
import { useRef } from 'react';


export function DoctorCard(props) {
    console.log(props);

    let doctor = props.doctor.doctor;
    let specialities = props.doctor.specialities[0];
    let address = props.doctor.addresses[0];

       const imageRef = useRef()

    useEffect(() => {
        if (doctor.userImage != "")
        imageRef.current.src = "data:image/png;base64," + doctor.userImage;
    },[])
    return (
        <Container fluid={true}>
            <div className="card">
                <div className="card-horizontal">
                    <div className="img-square-wrapper col col-md-2">
                        <Image id="ItemPreview" className="img-fluid" alt="nopes" src="../../Images/defaultimage.jpg" roundedCircle ref={imageRef}/>
                         </div>
                    <div className="card-body col col-md-10">
                        <Link to={{
                            pathname: '/DoctorDetails',
                            state: {
                                Doctor: props.doctor
                            }
                        }}><h4 className="card-title">{"Dr." + doctor.firstName + " " + doctor.lastName + "," + doctor.degree}</h4></Link>
                        <p className="card-text">{ specialities.label}</p>
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


            
