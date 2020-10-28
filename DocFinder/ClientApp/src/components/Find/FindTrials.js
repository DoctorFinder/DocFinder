import React from 'react'



////export function FindTrialsComponent() {

////    return (

////        <div>
////            <h3>Congrats you are succesfully redirected to Find Trials Component Page</h3>
////        </div>
////    )
////}

//import React, { Component } from 'react';
//import GoogleMapReact from 'google-map-react';

//const AnyReactComponent = ({ text }) => <div>{text}</div>;

//class FindTrialsComponent extends Component {
//    static defaultProps = {
//        center: {
//            lat: 59.95,
//            lng: 30.33
//        },
//        zoom: 11
//    };

//    render() {
//        return (
//            // Important! Always set the container height explicitly
//            <div style={{ height: '100vh', width: '100%' }}>
//                <GoogleMapReact
//                    bootstrapURLKeys={{ key: 'AIzaSyBWqXEkeMq4FhYycOSaPc_V9uYnkkTjhtk' }}
//                    defaultCenter={this.props.center}
//                    defaultZoom={this.props.zoom}
//                >
//                    <AnyReactComponent
//                        lat={59.955413}
//                        lng={30.337864}
//                        text="My Marker"
//                    />
//                    <AnyReactComponent
//                        lat={59.955419}
//                        lng={30.337864}
//                        text="My Marker 2"
//                    />
//                </GoogleMapReact>
//            </div>
//        );
//    }
//}

//export default FindTrialsComponent;

import {
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";

const MapWithAMarker = withGoogleMap(props => {
    console.log(props);
    let marks = [{ lat: -34.597, lng: 150.644 }, { lat: -34.498, lng: 150.644 }, { lat: -34.797, lng: 150.644 }, { lat: -34.998, lng: 150.644 }]
    return (
    <GoogleMap
            defaultZoom={14}
            defaultCenter={{ lat: -34.397, lng: 150.644 }}>
            {marks.map((mark, index) => {

                return <Marker
                    key={ index}
                    position={mark}
                />
            })}

        </GoogleMap>
    )
}
 
);




const FindTrialsComponent = (props) =>

    <MapWithAMarker
        test="src"
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
    />

export default FindTrialsComponent;