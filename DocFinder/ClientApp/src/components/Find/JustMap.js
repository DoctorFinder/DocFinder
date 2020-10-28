import React from 'react';
import MapWithAMarker from './DoctorAddressesMap';


export function JustMap() {

    return (
        <MapWithAMarker
            test="src"
            containerElement={<div style={{ height: `100%`, width: `100%` }} />}             
            mapElement={<div style={{ height: `100%`, width: `100%` }} />}
        />
        )
}