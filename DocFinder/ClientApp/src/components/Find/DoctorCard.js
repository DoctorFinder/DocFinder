import React, { useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import "../../Styles/DoctorCard.css";


export function DoctorCard(props) {
    console.log(props);

    let doctor = props.doctor.doctor;
    let specialities = props.doctor.specialities[0];
    let address = props.doctor.addresses[0];

    useEffect(() => {
        document.getElementById("ItemPreview").src = "data:image/png;base64," + props.doctor.userImage;
    },[])
    return (
        <Container>
            <div className="card">
                <div className="card-horizontal">
                    <div className="img-square-wrapper col col-md-2">
                        <Image id="ItemPreview" className="img-fluid" alt="nopes" roundedCircle/>
                         </div>
                    <div className="card-body col col-md-10">
                        <h4 className="card-title">{"Dr." + doctor.firstName + doctor.lastName + "," + doctor.degree}</h4>
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


            
