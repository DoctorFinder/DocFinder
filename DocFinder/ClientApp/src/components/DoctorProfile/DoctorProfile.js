import React, { Fragment,useState } from "react";
import {  useLocation } from "react-router-dom";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { OfficeInfo } from './OfficeInfo';
import { OfficeInfoEdit } from './OfficeInfoEdit';
import { PersonalInfo } from './PersonalInfo';
import { PersonalInfoEdit } from './PersonalInfoEdit';
import { ProfessionalEditInfo } from './ProfessionalEditInfo';
import "../../Styles/Spinner.css";

import {  Button, } from "react-bootstrap";

export function DoctorProfileComponent() {

    const [key, setKey] = useState("personal");
    const [updateModeState, setUpdateModeState] = useState(false);
    const [isRequestProcessing, setRequestProcessingStatus] = useState(false);
    let location = useLocation();

    let doctor = location.state.doctordetails.doctor;
        doctor.languages = location.state.doctordetails.languages;
    doctor.specialities = location.state.doctordetails.specialities;
    doctor.subspecialities = location.state.doctordetails.specialities;

    function setEditMode() {
        setUpdateModeState(true);
    }

    function setReadOnlyMode() {
        setUpdateModeState(false);
    }

    function saveDoctorPersonalData(values) {
        setRequestProcessingStatus(true);
        setRequestProcessingStatus(false);
        console.log(values);
        setReadOnlyMode();
    }

    function saveDoctorProfessionalData(values) {
        setRequestProcessingStatus(true);
        setRequestProcessingStatus(false);
        console.log(values);
        setReadOnlyMode();
        setKey("personal");
    }

    function saveDoctorOfficeData(values) {
        setRequestProcessingStatus(true);
        setRequestProcessingStatus(false);
        console.log(values);
        setReadOnlyMode();
    }

    return (
        <Fragment>
            <fieldset disabled={isRequestProcessing}>
            <Tabs activeKey={key}
                onSelect={(k) => setKey(k)} id="doctorProfile">
            <Tab eventKey="personal" title="Personal Info">
                    {!updateModeState && <PersonalInfo DoctorDetails={doctor} />} 
                    {updateModeState && <PersonalInfoEdit DoctorDetails={doctor} SetReadOnlyMode={setReadOnlyMode} SaveDoctorPersonalData={saveDoctorPersonalData} />} 
                </Tab>
                {updateModeState &&
                    <Tab eventKey="professional" title="Professional Info">
                    <ProfessionalEditInfo DoctorDetails={doctor} SetReadOnlyMode={setReadOnlyMode} SaveDoctorProfessionalData={saveDoctorProfessionalData}/>
                    </Tab>
                }
            <Tab eventKey="office" title="Office Info">
                    {!updateModeState && <OfficeInfo DoctorDetails={doctor} />}
                    {updateModeState && <OfficeInfoEdit DoctorDetails={doctor} SetReadOnlyMode={setReadOnlyMode} SaveDoctorOfficeData={saveDoctorOfficeData}/>}
                </Tab>
            </Tabs>
            {!updateModeState && <div><Button onClick={setEditMode}>Edit Profile</Button> </div>} 
              </fieldset>
            {isRequestProcessing && <div className="spinner" />}
            </Fragment>
    )
}
