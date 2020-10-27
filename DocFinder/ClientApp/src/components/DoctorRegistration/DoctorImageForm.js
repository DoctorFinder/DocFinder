import React from "react";
import { Button,Container, Row, Col } from "react-bootstrap";
import {DoctorAddressForm } from "./DoctorAddressForm"
import { useState } from "react";

export function DoctorImageForm(props) {

    const [addressComponent, setAddressComponent] = useState(props.defaultImageFormData);
    const [addressLength, setAddressLength] = useState(1);
    const [enableProceedBtn, setEnableProceedBtn] = useState(atleastOneAddress());

    function goToProfessionalForm() {
        props.getProfessionalForm();
    }
    function submitDoctorRegistration() {
        props.saveDoctorRegistration();
    }

    function atleastOneAddress() {

       const ValidAddresses =  props.defaultImageFormData.filter(address => {
            if (address.isAdded) {
                return address;
            }
       })
        return ValidAddresses.length > 0;
    }

    function saveAddress(values) {
        props.saveImageFormData(values);
        setEnableProceedBtn(true);
    }

    function addAddressComponent() {       
        setAddressComponent(addressComponent => {
            const newState = addressComponent.map(item => item);
            newState.push({
                id: addressLength + 1,
                address1: "",
                address2: "",
                city: "",
                state: "",
                zipcode: "",
                phoneNumber: "",
                webAddress: "",
                latitude: "",
                longitude: "",
                timings: {
                    UpdateHours: false,
                    SunDayOpen: false,
                    SundayStart: new Date(),
                    SundayEnd: new Date(),
                    MonDayOpen: false,
                    MondayStart: new Date(),
                    MondayEnd: new Date(),
                    TuesDayOpen: false,
                    TuesdayStart: new Date(),
                    TuesdayEnd: new Date(),
                    WednesDayOpen: false,
                    WednesdayStart: new Date(),
                    WednesdayEnd: new Date(),
                    ThursDayOpen: false,
                    ThursdayStart: new Date(),
                    ThursdayEnd: new Date(),
                    FriDayOpen: false,
                    FridayStart: new Date(),
                    FridayEnd: new Date(),
                    SatDayOpen: false,
                    SaturdayStart: new Date(),
                    SaturdayEnd: new Date()
                }});
            return newState;
        })
        setAddressLength(addressLength + 1);
        props.addNewAddressData(addressLength + 1);
    }

    return (        
        <div>
            {addressComponent.map((item) =>
                <DoctorAddressForm key={item.id}
                    isRequestProcessing={props.isRequestProcessing}
                    saveImageFormData={saveAddress}
                    defaultImageFormData={props.defaultImageFormData}
                    isProfessionalFormCompleted={props.isProfessionalFormCompleted}
                    item={item}
                />
            )
            }
            <Container>
                <Row>
                    <Col>
                        <Button onClick={addAddressComponent}>Add New Address </Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={goToProfessionalForm}>Prev</Button>
                    </Col>
               </Row>
                <Row>
                    <Col>
                        <Button onClick={submitDoctorRegistration} disabled={!enableProceedBtn}>Proceed to Payment</Button>
                    </Col>
                </Row>
           </Container>
            {props.submissionErrorState && <div>{props.errorMsg}</div>}
            </div>
        )
}

