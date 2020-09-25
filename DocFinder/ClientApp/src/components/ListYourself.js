import React, { useState, useEffect, useContext } from "react";
import { Route, useLocation, useHistory } from "react-router-dom";
import { DoctorPersonalForm } from "./DoctorPersonalForm";
import { DoctorProfessionalForm } from "./DoctorProfessionalForm";
import { DoctorImageForm } from "./DoctorImageForm";
import { MenuTypeContext } from "../context/MenuContextProvider";
import "react-datepicker/dist/react-datepicker.css";
import "../Styles/Spinner.css";

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
  };

  const emptyProfessionalFormData = {
    degree: "",
    education: "",
    experience: "",
      license: "",
      npiNumber:"",
      specialities: [],
     subspecialities:[],
    languages: []
  };

  const emptyImageFormData = {
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipcode: "",
    phoneNumber: ""
  };

  const [isRequestProcessing, setRequestProcessingStatus] = useState(false);
  const [isPersonalFormCompleted, setPersonalFormStatus] = useState(false);
  const [isProfessionalFormCompleted, setProfessionalFormStatus] = useState(
    false
  );
  const [defaultPersonalFormData, setdefaultPersonalFormData] = useState(
    emptyPersonalFormData
  );
  const [
    defaultProfessionalFormData,
    setdefaultProfessionalFormData
  ] = useState(emptyProfessionalFormData);
  const [defaultImageFormData, setdefaultImageFormData] = useState(
    emptyImageFormData
  );

  const context = useContext(MenuTypeContext);

  let location = useLocation();
  let history = useHistory();

  function savePersonalFormData(values) {
    setPersonalFormStatus(true);
    setdefaultPersonalFormData(values);
    console.log(values);
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
    let imagePath =
      location.pathname.substring(0, lastIndexOfPath + 1) + "Image";
    history.push(imagePath);
  }

  function getProfessionalForm(values) {
    setdefaultImageFormData(values);
    let lastIndexOfPath = location.pathname.lastIndexOf("/");
    let professionalFormPath =
      location.pathname.substring(0, lastIndexOfPath + 1) + "Professional";
    history.push(professionalFormPath);
  }

  function saveImageFormData(values) {
    setdefaultImageFormData(values);
    console.log("parent component called from Image component");
    console.log(values);
    const doctor = {
      FirstName: defaultPersonalFormData.firstName,
      MiddleName: defaultPersonalFormData.middleName,
      LastName: defaultPersonalFormData.lastName,
      Email: defaultPersonalFormData.emailAddress,
      Password: defaultPersonalFormData.password,
      DateOfBirth: defaultPersonalFormData.dateOfBirth,
      Gender: defaultPersonalFormData.gender,
      Degree: defaultProfessionalFormData.degree,
      Education: defaultProfessionalFormData.education,
      YearsInPractice: defaultProfessionalFormData.experience,
      License: defaultProfessionalFormData.license,
      Specialities: defaultProfessionalFormData.specialities,
      Languages: defaultProfessionalFormData.languages,
      Address1: values.address1,
      Address2: values.address2,
      City: values.city,
      State: values.state,
      Zipcode: values.zipcode,
      PhoneNumber: values.phoneNumber
    };
    console.log(doctor);
    setRequestProcessingStatus(true);

    submitDoctorRegistrationForm(doctor);
  }

  function submitDoctorRegistrationForm(doctor) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doctor)
    };
    fetch("Doctor", requestOptions)
      .then(async response => {
        console.log("reasched success");
        debugger;
        const data = await response.json();
        console.log("reasched success after json");
        debugger;
        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
        let firstIndexOfPath = location.pathname.indexOf("/");
        let doctorProfilePath =
          location.pathname.substring(0, firstIndexOfPath + 1) +
          "DoctorProfile";
        setRequestProcessingStatus(false);
        context.dispatch({ type: "doctor" });
        history.push(doctorProfilePath);
      })
      .catch(error => {
        debugger;
        setRequestProcessingStatus(false);
        console.error("There was an error!", error);
      });
  }

  function resetRegistrationForm() {
    setdefaultPersonalFormData(emptyPersonalFormData);
    setdefaultProfessionalFormData(emptyProfessionalFormData);
    setdefaultImageFormData(emptyImageFormData);
  }

  return (
    <div>
      <fieldset disabled={isRequestProcessing}>
        <Route exact path={`${props.match.path}`}>
          <DoctorPersonalForm
            savePersonalFormData={savePersonalFormData}
            defaultPersonalFormData={defaultPersonalFormData}
          />
        </Route>
        <Route path={`${props.match.path}/Professional`}>
          <DoctorProfessionalForm
            getPersonalForm={getPersonalForm}
            saveProfessionalFormData={saveProfessionalFormData}
            defaultProfessionalFormData={defaultProfessionalFormData}
            isPersonalFormCompleted={isPersonalFormCompleted}
          />
        </Route>
        <Route path={`${props.match.path}/Image`}>
          <DoctorImageForm
            isRequestProcessing={isRequestProcessing}
            getProfessionalForm={getProfessionalForm}
            saveImageFormData={saveImageFormData}
            defaultImageFormData={defaultImageFormData}
            isProfessionalFormCompleted={isProfessionalFormCompleted}
          />
        </Route>
      </fieldset>
      {isRequestProcessing && <div className="spinner" />}
    </div>
  );
}
