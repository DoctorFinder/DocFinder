import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import fetch from 'cross-fetch';
import {useLocation, useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { MenuTypeContext } from "../../context/MenuContextProvider";
import errors from "../../Config/errorMessages";
import "../../Styles/Spinner.css";
import { LoginComponent } from "./LoginComponent"; 



export function DoctorLoginComponent() {

    const [key, setKey] = useState("doctor");
  const [show, setShow] = useState(true);
  const [errorMsg, seterrorMsg] = useState("");

  const [isRequestProcessing, setRequestProcessingStatus] = useState(false);
  const context = useContext(MenuTypeContext);

  let location = useLocation();
  let history = useHistory();

  function handleClose() {
    let firstIndexOfPath = location.pathname.indexOf("/");
    let homePath = location.pathname.substring(0, firstIndexOfPath);
    setShow(false);
    history.push(homePath);
  }

  function loginAsUserProvided(values) {
    const doctor = {
      EmailAddress: values.emailAddress,
      Password: values.password
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doctor)
    };
    setRequestProcessingStatus(true);
    fetch("Doctor/PostDoctorLogin", requestOptions)
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
        setRequestProcessingStatus(false);
        context.dispatch({ type: "doctor" });
        history.push(doctorProfilePath, { doctordetails: data });
      })
      .catch(error => {
        setRequestProcessingStatus(false);
        seterrorMsg(error);
      });
    }

    function loginAsAdminProvided(values) {
        const admin = {
            EmailAddress: values.emailAddress,
            Password: values.password
        };
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(admin)
        };
        setRequestProcessingStatus(true);
        fetch("Admin/PostAdminLogin", requestOptions)
            .then(async response => {
                const data = await response.json();
                console.log(data);

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
                    "AdminDashboard";
                setRequestProcessingStatus(false);
                context.dispatch({ type: "doctor" });
                history.push(doctorProfilePath, { doctordetails: data });
            })
            .catch(error => {
                setRequestProcessingStatus(false);
                seterrorMsg(error);
            });
    }

  return (
    <div>
          <Modal show={show} onHide={handleClose}>
   
        <Modal.Header closeButton>
          <Modal.Title> Login as a doctor </Modal.Title>
        </Modal.Header>
              <Modal.Body>
                  <Tabs activeKey={key}
                      onSelect={(k) => setKey(k)} id="login">
                      <Tab eventKey="doctor" title="Doctor Login">
          <fieldset disabled={isRequestProcessing}>
                              <LoginComponent LoginAsUserProvided={loginAsUserProvided}/>
                          </fieldset>
                      </Tab>
                      <Tab eventKey="admin" title="Admin Login">
                          <fieldset disabled={isRequestProcessing}>
                              <LoginComponent LoginAsUserProvided={loginAsAdminProvided}/>
                          </fieldset>
                      </Tab>
                  </Tabs>
        </Modal.Body>

        <Modal.Footer>
          <label> {errorMsg}</label>
        </Modal.Footer>
                      {isRequestProcessing && <div className="spinner" />}                
      </Modal>
    </div>
  );
}
