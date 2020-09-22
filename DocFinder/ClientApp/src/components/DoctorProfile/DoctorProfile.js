import React from "react";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { OfficeInfo } from './OfficeInfo';
import { PersonalInfo} from './PersonalInfo'

export function DoctorProfileComponent() {
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
