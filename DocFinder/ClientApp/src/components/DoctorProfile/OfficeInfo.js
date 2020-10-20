import React from "react";
import { Form, Row, Col } from "react-bootstrap";

export function OfficeInfo(props) {
   const doctorDetails = props.DoctorDetails;

  return (
    <Form>
      <Row md={6}>
        <Col>
          <div>
            <Form.Label>License</Form.Label>
          </div>
        </Col>
        <Col>
          <div>
            <Form.Label>{doctorDetails.license}</Form.Label>
          </div>
        </Col>
      </Row>
      <Row md={6}>
        <Col>
          <div>
            <Form.Label>NPI Number</Form.Label>
          </div>
        </Col>
        <Col>
          <div>
            <Form.Label>{doctorDetails.npiNumber}</Form.Label>
          </div>
        </Col>
      </Row>
      <Row md={6}>
        <Col>
          <div>
            <Form.Label>Address 1</Form.Label>
          </div>
        </Col>
        <Col>
          <div>
            <Form.Label>{doctorDetails.address1}</Form.Label>
          </div>
        </Col>
      </Row>
      <Row md={6}>
        <Col>
          <div>
            <Form.Label>Address 2</Form.Label>
          </div>
        </Col>
        <Col>
          <div>
            <Form.Label>{doctorDetails.address2}</Form.Label>
          </div>
        </Col>
      </Row>
      <Row md={6}>
        <Col>
          <div>
            <Form.Label>City</Form.Label>
          </div>
        </Col>
        <Col>
          <div>
            <Form.Label>{doctorDetails.city}</Form.Label>
          </div>
        </Col>
      </Row>
      <Row md={6}>
        <Col>
          <div>
            <Form.Label>State</Form.Label>
          </div>
        </Col>
        <Col>
          <div>
            <Form.Label>{doctorDetails.state}</Form.Label>
          </div>
        </Col>
      </Row>
      <Row md={6}>
        <Col>
          <div>
            <Form.Label>ZipCode</Form.Label>
          </div>
        </Col>
        <Col>
          <div>
            <Form.Label>{doctorDetails.zipcode}</Form.Label>
          </div>
        </Col>
      </Row>
      <Row md={6}>
        <Col>
          <div>
            <Form.Label>Phone Number</Form.Label>
          </div>
        </Col>
        <Col>
          <div>
            <Form.Label>{doctorDetails.phoneNumber}</Form.Label>
          </div>
        </Col>
      </Row>
    </Form>
  );
}
