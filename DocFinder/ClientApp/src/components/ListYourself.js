import React, { useState } from "react";
import { Route } from 'react-router-dom';
import { DoctorPersonalForm} from './DoctorPersonalForm';
import { DoctorProfessionalForm} from './DoctorProfessionalForm';
import { DoctorImageForm } from './DoctorImageForm';
import "react-datepicker/dist/react-datepicker.css";


export function ListYourselfComponent(props) {

    
    return (
        <div>
            <Route exact path={`${props.match.path}`} component={DoctorPersonalForm} />
            <Route path={`${props.match.path}/Professional`} component={DoctorProfessionalForm} />
            <Route path={`${props.match.path}/Image`} component={DoctorImageForm} />
        </div>
        
        );
}
