import React, { useState,useContext } from "react";
import { Route, useLocation, useHistory } from "react-router-dom";
import { DoctorPersonalForm } from "./DoctorPersonalForm";
import { DoctorProfessionalForm } from "./DoctorProfessionalForm";
import { DoctorImageForm } from "./DoctorImageForm";
import { MenuTypeContext } from "../../context/MenuContextProvider";
import { PaymentForm } from "./PaymentForm";
import "react-datepicker/dist/react-datepicker.css";
import "../../Styles/Spinner.css";

export function ListYourselfComponent(props) {
  const emptyPersonalFormData = {
    firstName: "",
    middleName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "male",
    file: new File([""], "T")
  };

    const emptyProfessionalFormData = {
    clinicalInterest: "",
    researchInterest:"",
    degree: "",
    education: "",
    experience: "",
    license: "",
    npiNumber: "",
    npiDisclosure: false,
    licenseDisclosure:false,
    specialities: [],
    subspecialities:[],
    languages: [],
    educationCity:"",
    educationCountry: "",
    educationState: "",
    yearOfGraduation: new Date(),
    residencyFrom: "",
    residencyCity: "",
    residencyCountry: "",
    residencyState: "",
    fellowhipFrom: "",
    fellowhipCity: "",
    fellowhipCountry: "",
    fellowhipState: ""
  };

    const emptyImageFormData = [
        {
            id:1,
            address1: "",
            address2: "",
            city: "",
            state: "",
            zipcode: "",
            phoneNumber: "",
            webAddress: "",
            isAdded: false,
            timings: {
                UpdateHours:false,
                SunDayOpen: true,
                SundayStart: new Date(),
                SundayEnd: new Date(),
                MonDayOpen: true,
                MondayStart: new Date(),
                MondayEnd: new Date(),
                TuesDayOpen: true,
                TuesdayStart: new Date(),
                TuesdayEnd: new Date(),
                WednesDayOpen: true,
                WednesdayStart: new Date(),
                WednesdayEnd: new Date(),
                ThursDayOpen: true,
                ThursdayStart: new Date(),
                ThursdayEnd: new Date(),
                FriDayOpen: true,
                FridayStart: new Date(),
                FridayEnd: new Date(),
                SatDayOpen: true,
                SaturdayStart: new Date(),
                SaturdayEnd: new Date()
            }            
        }
    ];

    const [errorMsg, seterrorMsg] = useState("");
    const [submissionErrorState, setSubmissionErrorState] = useState(false);
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

  function getProfessionalForm() {
    let lastIndexOfPath = location.pathname.lastIndexOf("/");
    let professionalFormPath =
      location.pathname.substring(0, lastIndexOfPath + 1) + "Professional";
    history.push(professionalFormPath);
    }

    function addNewAddressData(addressId) {
        setdefaultImageFormData(defaultImageFormData => {
            const newState = defaultImageFormData.map(item => item)
            newState.push({
                id: addressId,
                address1: "",
                address2: "",
                city: "",
                state: "",
                zipcode: "",
                phoneNumber: "",
                webAddress: "",
                isAdded: false,
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
                }
            });
            return newState;
        });
    }

    function saveImageFormData(values) {
      setdefaultImageFormData(defaultImageFormData => {
          const newstate = defaultImageFormData.map(item => {              
              if (item.id == values.id) {
                  item.address1 = values.address1;
                  item.address2 = values.address2;
                  item.city = values.city;
                  item.state = values.state;
                  item.zipcode = values.zipcode;
                  item.phoneNumber = values.phoneNumber;
                  item.webAddress = values.webAddress;
                  item.isAdded = true;
                  item.timings = values.timings;
              }
              return item;
          });
          return newstate;
      });
    }

    function saveDoctorRegistration() {
        const doctor = {
            FirstName: defaultPersonalFormData.firstName,
            MiddleName: defaultPersonalFormData.middleName,
            LastName: defaultPersonalFormData.lastName,
            Email: defaultPersonalFormData.emailAddress,
            Password: defaultPersonalFormData.password,
            DateOfBirth: defaultPersonalFormData.dateOfBirth.toJSON(),
            Gender: defaultPersonalFormData.gender,
            Degree: defaultProfessionalFormData.degree,
            Education: defaultProfessionalFormData.education,
            YearsInPractice: defaultProfessionalFormData.experience,
            License: defaultProfessionalFormData.license,
            NpiNumber: defaultProfessionalFormData.npiNumber,
            NpiDisclosure: defaultProfessionalFormData.npiDisclosure,
            UserImage: defaultPersonalFormData.file,
            LicenseDisclosure: defaultProfessionalFormData.licenseDisclosure,
            EducationCity: defaultProfessionalFormData.educationCity,
            EducationCountry: defaultProfessionalFormData.educationCountry,
            EducationState: defaultProfessionalFormData.educationState,
            YearOfGraduation: defaultProfessionalFormData.yearOfGraduation.toJSON(),
            ResidencyFrom: defaultProfessionalFormData.residencyFrom,
            ResidencyCity: defaultProfessionalFormData.residencyCity,
            ResidencyCountry: defaultProfessionalFormData.residencyCountry,
            ResidencyState: defaultProfessionalFormData.residencyState,
            FellowhipFrom: defaultProfessionalFormData.fellowhipFrom,
            FellowhipCity: defaultProfessionalFormData.fellowhipCity,
            FellowhipCountry: defaultProfessionalFormData.fellowhipCountry,
            FellowhipState: defaultProfessionalFormData.fellowhipState,
            IsPaid: false,
            IsVerified:false
        };                           

        var DoctorForCreationDTO = new FormData();
        for (var key in doctor) {
            DoctorForCreationDTO.append(key, doctor[key]);
        }
        const savedAddresses = defaultImageFormData.filter(address => {
            if (address.isAdded) {
                return address;
            }
        });
        const addressForCreation = savedAddresses.map(address => {
            let doctor = {
                Address1: address.address1,
                Address2: address.address2,
                City: address.city,
                State: address.state,
                Zipcode: address.zipcode,
                PhoneNumber: address.phoneNumber,
                WebAddress: address.webAddress,
                HospitalTimings: address.timings
            }            
            return doctor;
        });
        debugger;
        DoctorForCreationDTO.append('Specialities', JSON.stringify(defaultProfessionalFormData.specialities));
        DoctorForCreationDTO.append('Languages', JSON.stringify(defaultProfessionalFormData.languages));
        DoctorForCreationDTO.append('Addresses', JSON.stringify(addressForCreation));
       setRequestProcessingStatus(true);
       submitDoctorRegistrationForm(DoctorForCreationDTO);
    }

    function submitDoctorRegistrationForm(doctor) {
        setSubmissionErrorState(false);
        seterrorMsg("");
    const requestOptions = {
        method: 'post',
        body: doctor
    };
    fetch("Doctor", requestOptions)
      .then(async response => {
        const data = await response.json();
        if (!response.ok) {
            let error = (data && data.message) || response.status;
            if (data.responseMessage) {
                error = data.responseMessage;
            }
          return Promise.reject(error);
        }
        let firstIndexOfPath = location.pathname.indexOf("/");
        let doctorProfilePath =
          location.pathname.substring(0, firstIndexOfPath + 1) +
              "DoctorProfile";
          let paymentMethod =
              location.pathname.substring(0, firstIndexOfPath + 1) + "list/yourself/Payment";
        setRequestProcessingStatus(false);
       // context.dispatch({ type: "doctor" });
          history.push(paymentMethod, { doctordetails: data });
      })
      .catch(error => {
          setSubmissionErrorState(true);
          setRequestProcessingStatus(false);
          seterrorMsg(error);
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
                      submissionErrorState={submissionErrorState}
                      errorMsg={errorMsg}
                      addNewAddressData={addNewAddressData}
                      saveDoctorRegistration={saveDoctorRegistration}
          />
         </Route>
              <Route path={`${props.match.path}/Payment`}>
                  <PaymentForm/>
         </Route>
          </fieldset>
      {isRequestProcessing && <div className="spinner" />}
    </div>
  );
}
