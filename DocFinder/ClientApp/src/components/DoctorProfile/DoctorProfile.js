import React, { Fragment,useState } from "react";
import {  useLocation } from "react-router-dom";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { OfficeInfo } from './OfficeInfo';
import { OfficeInfoEdit } from './OfficeInfoEdit';
import { PersonalInfo } from './PersonalInfo';
import { PersonalInfoEdit } from './PersonalInfoEdit';
import { ProfessionalEditInfo } from './ProfessionalEditInfo';

import {  Button, } from "react-bootstrap";

export function DoctorProfileComponent() {

    const [updateModeState, setUpdateModeState] = useState(false);
    let location = useLocation();

    console.log(location.state);
    console.log(location.state.doctordetails.doctor);
    let doctor = location.state.doctordetails.doctor;

    function setEditMode() {
        setUpdateModeState(true);
    }

    function setReadOnlyMode() {
        setUpdateModeState(false);
    }

    return (
        <Fragment>
        <Tabs defaultActiveKey="personal" id="doctorProfile">
            <Tab eventKey="personal" title="Personal Info">
                    {!updateModeState && <PersonalInfo DoctorDetails={doctor} />} 
                    {updateModeState && <PersonalInfoEdit DoctorDetails={doctor} />} 
                </Tab>
                {updateModeState &&
                    <Tab eventKey="professional" title="Professional Info">
                    <ProfessionalEditInfo DoctorDetails={doctor} />
                    </Tab>
                }
            <Tab eventKey="office" title="Office Info">
                    {!updateModeState && <OfficeInfo DoctorDetails={doctor} />}
                    {updateModeState && <OfficeInfoEdit DoctorDetails={doctor} />}
                </Tab>
            </Tabs>
            {!updateModeState && <div><Button onClick={setEditMode}>Edit Profile</Button> </div>}
            {updateModeState && <div><Button onClick={setReadOnlyMode}>save</Button> <Button onClick={setReadOnlyMode}>Cancel</Button></div>}
            </Fragment>
    )
}
