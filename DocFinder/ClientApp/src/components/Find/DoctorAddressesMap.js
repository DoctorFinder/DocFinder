import React from 'react';
import {withGoogleMap,GoogleMap,Marker,} from "react-google-maps";

const MapWithAMarker = withGoogleMap(props => {
    console.log(props);
    //props.doctors
  let markers = props.doctors.map(doc => {
        let add = doc.addresses.map(add => {
            return { lat: add.latitude, lng: add.longitude };
        })
        return add;
  })
    console.log(markers);
    let merged = [].concat.apply([], markers);

    console.log(merged);
    let marks = [{ lat: -34.597, lng: 150.644 }, { lat: -34.498, lng: 150.644 }, { lat: -34.797, lng: 150.644 }, { lat: -34.998, lng: 150.644 }]
    return (
        <GoogleMap
            defaultZoom={14}
            defaultCenter={merged[0]}>
            {merged.map((mark, index) => {

                return <Marker
                    key={index}
                    position={mark}
                />
            })}

        </GoogleMap>
    )
}

);




//const FindTrialsComponent = (props) =>

  

export default MapWithAMarker;