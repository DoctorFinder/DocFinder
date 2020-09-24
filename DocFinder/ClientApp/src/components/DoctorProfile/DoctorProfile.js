import React from "react";
import { Route, useLocation, useHistory } from "react-router-dom";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { OfficeInfo } from './OfficeInfo';
import { PersonalInfo} from './PersonalInfo'

export function DoctorProfileComponent() {

    let location = useLocation();
    let history = useHistory();

    console.log(location.state);

    return (
        <Tabs defaultActiveKey="personal" id="doctorProfile">
            <Tab eventKey="personal" title="Personal Info">
                <PersonalInfo/>
            </Tab>
            <Tab eventKey="office" title="Office Info">
                <OfficeInfo />
            </Tab>
        </Tabs>
        //<div><h3>Page after Doctor registered</h3></div>

    )
}
