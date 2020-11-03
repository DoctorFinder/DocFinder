import React, { useState} from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { DoctorInfoPersonalComponent } from "./DoctorInfoPersonalComponent";
import { DoctorInfoProfessionalComponent } from "./DoctorInfoProfessionalComponent";
import { DoctorInfoAddressComponent } from "./DoctorInfoAddressComponent";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';


export function DoctorInfoComponent() {

    let location = useLocation();
    const [key, setKey] = useState("personal");

    console.log(location.state);
    let doctor = location.state.doctor[0];
    return (
        <Tabs activeKey={key}
            onSelect={(k) => setKey(k)} id="doctorProfile">
            <Tab eventKey="personal" title="Personal Info">
                <DoctorInfoPersonalComponent Doctor={ doctor}/>
            </Tab>
            <Tab eventKey="professional" title="Professional Info">
                <DoctorInfoProfessionalComponent Doctor={doctor}/>
            </Tab>
            <Tab eventKey="office" title="Office Info">
                <DoctorInfoAddressComponent Doctor={doctor}/>
            </Tab>
        </Tabs>

        )


}