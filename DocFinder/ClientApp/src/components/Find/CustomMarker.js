import React, { useState} from 'react';
import { Marker, InfoWindow } from "react-google-maps";

export function CustomMarker(props) {
     
    const [showInfoWindow, setShowInfoWindow] = useState(false);
    const mouseOver = () => {
        setShowInfoWindow(true)
    }

    const mouseOut = () => {
        setShowInfoWindow(false)
    }
    let doctor = props.doctor.doctor;
    let mark = { lat: props.doctor.addresses.latitude, lng: props.doctor.addresses.longitude }

    return (
        <Marker            
            position={mark}
            onMouseOver={mouseOver}
            onMouseOut={mouseOut}>  
            {(showInfoWindow || doctor.id == props.hoveredDoctorId) && (
                <InfoWindow>
                    <div>
                    <h4>{"Dr." + doctor.firstName + " " + doctor.lastName + "," + doctor.degree}</h4>                
                    <p>{props.doctor.addresses.address1 + props.doctor.addresses.address2 + "," + props.doctor.addresses.city + "," + props.doctor.addresses.state + "," + props.doctor.addresses.zipcode}</p>
                        </div>
                        </InfoWindow>)
            }
            </Marker>
        )
}

