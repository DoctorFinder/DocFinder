import React, {useState}from "react";
import { Route, useLocation, useHistory } from "react-router-dom";
import { DoctorPersonalForm } from "./DoctorPersonalForm";
import { DoctorProfessionalForm } from "./DoctorProfessionalForm";
import { DoctorImageForm } from "./DoctorImageForm";
import "react-datepicker/dist/react-datepicker.css";



export function ListYourselfComponent(props) {

    const emptyPersonalFormData = {
        firstName: "",
        middleName: "",
        lastName: "",
        emailAddress: "",
        password: "",
        confirmPassword: "",
        dateOfBirth: "",
        gender: "male"
    }

    const emptyProfessionalFormData = {
        degree: "",
        education: "",
        experience: "",
        hospitals: "",
        license: "",
        specialities: [],
        languages: []
    }

    const emptyImageFormData = {
        address1: "",
        address2: "",
        city:"",
        state: "",
        zipcode:"",
        phoneNumber: ""
    }

    const [isPersonalFormCompleted, setPersonalFormStatus] = useState(false);
    const [isProfessionalFormCompleted, setProfessionalFormStatus] = useState(false);
    const [defaultPersonalFormData, setdefaultPersonalFormData] = useState(emptyPersonalFormData);
    const [defaultProfessionalFormData, setdefaultProfessionalFormData] = useState(emptyProfessionalFormData);
    const [defaultImageFormData, setdefaultImageFormData] = useState(emptyImageFormData);


    let location = useLocation();
    let history = useHistory();

    function savePersonalFormData(values) {
        setPersonalFormStatus(true);
        setdefaultPersonalFormData(values);
        history.push(location.pathname + "/Professional");
    }

    function getPersonalForm(values) {
        setdefaultProfessionalFormData(values);
        let lastIndexOfPath = location.pathname.lastIndexOf("/");
        let personalFormPath = location.pathname.substring(0, lastIndexOfPath);
        history.push(personalFormPath);
    }

    function saveProfessionalFormData(values) {
        setProfessionalFormStatus(true);
        setdefaultProfessionalFormData(values);
        let lastIndexOfPath = location.pathname.lastIndexOf("/");
        let imagePath = location.pathname.substring(0, lastIndexOfPath + 1) + "Image";
        history.push(imagePath);
  }

    function getProfessionalForm(values) {
        setdefaultImageFormData(values);
        let lastIndexOfPath = location.pathname.lastIndexOf("/");
        let professionalFormPath = location.pathname.substring(0, lastIndexOfPath + 1) + "Professional";
        history.push(professionalFormPath);
    }

    function saveImageFormData(values) {
        setdefaultImageFormData(values);
        console.log("parent component called from Image component");
        console.log(values);
    }



  return (
    <div>
      <Route exact path={`${props.match.path}`}>
              <DoctorPersonalForm savePersonalFormData={savePersonalFormData} defaultPersonalFormData={defaultPersonalFormData} />
      </Route>
      <Route path={`${props.match.path}/Professional`}>
              <DoctorProfessionalForm getPersonalForm={getPersonalForm} saveProfessionalFormData={saveProfessionalFormData} defaultProfessionalFormData={defaultProfessionalFormData} isPersonalFormCompleted={isPersonalFormCompleted} />
      </Route>
      <Route path={`${props.match.path}/Image`}>
              <DoctorImageForm getProfessionalForm={getProfessionalForm} saveImageFormData={saveImageFormData} defaultImageFormData={defaultImageFormData} isProfessionalFormCompleted={isProfessionalFormCompleted} />
      </Route>
    </div>
  );
}
