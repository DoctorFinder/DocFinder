import React, { useState} from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { CustomMarker } from './CustomMarker';

const MapWithAMarker = withGoogleMap(props => {
    
    let defaultMark = { lat: props.doctors[0].addresses.latitude, lng: props.doctors[0].addresses.longitude}
   
    return (
        <GoogleMap
            defaultZoom={14}
            defaultCenter={defaultMark}>
            {props.doctors.map((doc, index) => {

                return <CustomMarker
                    key={index}
                    doctor={doc}
                    hoveredDoctorId={props.hoveredDoctorId}>                   
                </CustomMarker>
            })}

        </GoogleMap>
    )
}

);

  
export default MapWithAMarker;