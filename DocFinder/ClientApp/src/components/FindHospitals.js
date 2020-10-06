import React, { useState } from "react";
import useAddressPredictions from "./useAddressPredictions";

export function SearchLocationInput() {
    const [input, setInput] = useState("");

    //const predictions = useAddressPredictions(input);

//    <ul>
  //      {predictions.map((prediction, index) => (
    //        <li key={index}>{prediction}</li>
      //  ))}
    //</ul>
    return (
        <div>
            <input
                value={input}
                onChange={event => setInput(event.target.value)}
            />
 
        </div>
    );
}
//SearchLocationInput


//    const mapContainerStyle = {
//        height: "400px",
//        width: "800px"
//    }

//    const center = {
//        lat: 38.685,
//        lng: -115.234
//    }

//    function onLoad(autocomplete) {
//        console.log('autocomplete: ', autocomplete)

//         autocompletes = autocomplete
//    }

//    function onPlaceChanged() {
//        if (autocompletes !== null) {
//            console.log(autocompletes.getPlace())
//        } else {
//            console.log('Autocomplete is not loaded yet!')
//        }
//    }

   
//        return (
//            <ScriptLoaded>
//                <GoogleMap
//                    id="searchbox-example"
//                    mapContainerStyle={mapContainerStyle}
//                    zoom={2.5}
//                    center={center}
//                >
//                    <Autocomplete
//                        onLoad={onLoad}
//                        onPlaceChanged={onPlaceChanged}
//                    >
//                        <input
//                            type="text"
//                            placeholder="Customized your placeholder"
//                            style={{
//                                boxSizing: `border-box`,
//                                border: `1px solid transparent`,
//                                width: `240px`,
//                                height: `32px`,
//                                padding: `0 12px`,
//                                borderRadius: `3px`,
//                                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
//                                fontSize: `14px`,
//                                outline: `none`,
//                                textOverflow: `ellipses`,
//                                position: "absolute",
//                                left: "50%",
//                                marginLeft: "-120px"
//                            }}
//                        />
//                    </Autocomplete>
//                </GoogleMap>
//            </ScriptLoaded>
//        )
//}


//SearchLocationInput
//import React from 'react'
//import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';
//const ScriptLoaded = require("../../docs/ScriptLoaded").default;
//export function SearchLocationInput() {

//    let autocomplete = null;
//    const mapContainerStyle  = {
//        width: '400px',
//        height: '400px'
//    };

//    const center = {
//        lat: -3.745,
//        lng: -38.523
//    };

//    function onLoad(autocompletes) {
//        console.log('autocomplete: ', autocompletes)

//        autocomplete = autocompletes
//    }

//    function onPlaceChanged() {
//        if (autocomplete !== null) {
//            console.log(autocomplete.getPlace())
//        } else {
//            console.log('Autocomplete is not loaded yet!')
//        }
//    }


//    return (
//        <LoadScript
//            googleMapsApiKey="AIzaSyBWqXEkeMq4FhYycOSaPc_V9uYnkkTjhtk"
//        >
//            <GoogleMap
//                id="searchbox-example"
//                mapContainerStyle={mapContainerStyle}
//                zoom={2.5}
//                center={center}
//            >
//                <Autocomplete
//                    onLoad={onLoad}
//                    onPlaceChanged={onPlaceChanged}
//                >
//                    <input
//                        type="text"
//                        placeholder="Customized your placeholder"
//                        style={{
//                            boxSizing: `border-box`,
//                            border: `1px solid transparent`,
//                            width: `240px`,
//                            height: `32px`,
//                            padding: `0 12px`,
//                            borderRadius: `3px`,
//                            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
//                            fontSize: `14px`,
//                            outline: `none`,
//                            textOverflow: `ellipses`,
//                            position: "absolute",
//                            left: "50%",
//                            marginLeft: "-120px"
//                        }}
//                    />
//                </Autocomplete>
//            </GoogleMap>
//        </LoadScript>
//    )
//}

//import React from 'react'

//class SearchLocationInput extends React.Component {
//    constructor(props) {
//        super(props)
//        this.state = this.initialState()
//        this.handlePlaceSelect = this.handlePlaceSelect.bind(this)
//        this.handleChange = this.handleChange.bind(this)
//        this.handleSubmit = this.handleSubmit.bind(this)
//        this.autocomplete = null
//    }

//    componentDidMount() {
//        this.autocomplete = new window.google.maps.places.Autocomplete(document.getElementById('autocomplete'), {})

//        this.autocomplete.addListener("place_changed", this.handlePlaceSelect)
//    }

//    initialState() {
//        return {
//            name: '',
//            street_address: '',
//            city: '',
//            state: '',
//            zip_code: '',
//            googleMapLink: ''
//        }
//    }

//    handleChange(event) {
//        this.setState({ [event.target.name]: event.target.value })
//    }

//    handleSubmit(event) {
//        event.preventDefault()
//       // this.props.dispatch(addParlor(this.state))
//        this.clearForm()
//    }

//    handlePlaceSelect() {
//        debugger;
//        let addressObject = this.autocomplete.getPlace()
//        let address = addressObject.address_components
//        this.setState({
//            name: addressObject.name,
//            street_address: `${address[0].long_name} ${address[1].long_name}`,
//            city: address[4].long_name,
//            state: address[6].short_name,
//            zip_code: address[8].short_name,
//            googleMapLink: addressObject.url
//        })
//    }

//    render() {
//        return (
//            <div>
//                <h1>Add New Parlor</h1>
//                <form onSubmit={this.handleSubmit}>
//                    <input id="autocomplete"
//                        className="input-field"
//                        ref="input"
//                        type="text" />
//                    <input
//                        name={"name"}
//                        value={this.state.name}
//                        placeholder={"Name"}
//                        onChange={this.handleChange}
//                    />
//                    <input
//                        name={"street_address"}
//                        value={this.state.street_address}
//                        placeholder={"Street Address"}
//                        onChange={this.handleChange}
//                    />
//                    <input
//                        name={"city"}
//                        value={this.state.city}
//                        placeholder={"City"}
//                        onChange={this.handleChange}
//                    />
//                    <input
//                        name={"state"}
//                        value={this.state.state}
//                        placeholder={"State"}
//                        onChange={this.handleChange}
//                    />
//                <input
//                        name={"zip_code"}
//                        value={this.state.zip_code}
//                        placeholder={"Zipcode"}
//                        onChange={this.handleChange}
//                    />
//                    <button onSubmit={this.handleSubmit}>Submit</button>
//                </form>
//            </div>
//        )
//    }

//}

//export default SearchLocationInput


//import React from 'react';
//import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

//const SearchLocationInput = () => (
//    <div>
//        <GooglePlacesAutocomplete
//            apiKey="AIzaSyBWqXEkeMq4FhYycOSaPc_V9uYnkkTjhtk"
//        />
//    </div>
//);

//export default SearchLocationInput;