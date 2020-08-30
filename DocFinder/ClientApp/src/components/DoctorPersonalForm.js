import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import  DatePicker  from 'react-datepicker'
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

export function DoctorPersonalForm(props) {

    const [startDate, setStartDate] = useState(new Date());

    return (
        <Form>
            <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="First Name"></Form.Control>

                <Form.Label>Middle Name</Form.Label>
                <Form.Control type="text" placeholder="Middle Name"></Form.Control>

                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Last Name"></Form.Control>

                <Form.Label>Date Of Birth</Form.Label>
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} />

                <Form.Label>Gender</Form.Label>
                <Form.Check type="radio" label="Male" name="Genderradios" id="GenderradiosM"/>
                <Form.Check type="radio" label="Female" name="Genderradios" id="GenderradiosF" />

                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter Email"></Form.Control>

                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Password"></Form.Control>

                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password"></Form.Control>

            </Form.Group>

            <Link to={`${props.match.url}/Professional`}>Next </Link>

        </Form>        
      )
}