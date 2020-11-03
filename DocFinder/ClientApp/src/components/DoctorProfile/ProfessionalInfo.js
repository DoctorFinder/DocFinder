import React from 'react';
import { Form, Row, Col } from "react-bootstrap";

export function ProfessionalInfo(props) {
    const doctorDetails = props.DoctorDetails;
    console.log(props);

    
    return (        
        <Form>
            <Row md={6}>
                <Col>
                    <div>
                        <Form.Label>Year Graduated : </Form.Label>
                    </div>
                </Col>
                <Col>
                    <div>
                        <Form.Label>
                            {doctorDetails.yearOfGraduation}
                        </Form.Label>
                    </div>
                </Col>
            </Row>
            <Row md={6}>
                <Col>
                    <div>
                        <Form.Label>Graduated City : </Form.Label>
                    </div>
                </Col>
                <Col>
                    <div>
                        <Form.Label>
                            {doctorDetails.educationCity}
                        </Form.Label>
                    </div>
                </Col>
            </Row>
            <Row md={6}>
                <Col>
                    <div>
                        <Form.Label>Graduated State : </Form.Label>
                    </div>
                </Col>
                <Col>
                    <div>
                        <Form.Label>
                            {doctorDetails.educationState}
                        </Form.Label>
                    </div>
                </Col>
            </Row>
            <Row md={6}>
                <Col>
                    <div>
                        <Form.Label>Graduated Country : </Form.Label>
                    </div>
                </Col>
                <Col>
                    <div>
                        <Form.Label>
                            {doctorDetails.educationCountry}
                        </Form.Label>
                    </div>
                </Col>
            </Row>
            <Row md={6}>
                <Col>
                    <div>
                        <Form.Label>Residency From : </Form.Label>
                    </div>
                </Col>
                <Col>
                    <div>
                        <Form.Label>
                            {doctorDetails.residencyFrom}
                        </Form.Label>
                    </div>
                </Col>
            </Row>
            <Row md={6}>
                <Col>
                    <div>
                        <Form.Label>Residency City : </Form.Label>
                    </div>
                </Col>
                <Col>
                    <div>
                        <Form.Label>
                            {doctorDetails.residencyCity}
                        </Form.Label>
                    </div>
                </Col>
            </Row>
            <Row md={6}>
                <Col>
                    <div>
                        <Form.Label>Residency State : </Form.Label>
                    </div>
                </Col>
                <Col>
                    <div>
                        <Form.Label>
                            {doctorDetails.residencyState}
                        </Form.Label>
                    </div>
                </Col>
            </Row>
            <Row md={6}>
                <Col>
                    <div>
                        <Form.Label>Residency Country : </Form.Label>
                    </div>
                </Col>
                <Col>
                    <div>
                        <Form.Label>
                            {doctorDetails.residencyCountry}
                        </Form.Label>
                    </div>
                </Col>
            </Row>
            <Row md={6}>
                <Col>
                    <div>
                        <Form.Label>Fellowship From : </Form.Label>
                    </div>
                </Col>
                <Col>
                    <div>
                        <Form.Label>
                            {doctorDetails.fellowshipFrom}
                        </Form.Label>
                    </div>
                </Col>
            </Row>
            <Row md={6}>
                <Col>
                    <div>
                        <Form.Label>Fellowship City : </Form.Label>
                    </div>
                </Col>
                <Col>
                    <div>
                        <Form.Label>
                            {doctorDetails.fellowshipCity}
                        </Form.Label>
                    </div>
                </Col>
            </Row>
            <Row md={6}>
                <Col>
                    <div>
                        <Form.Label>Fellowship State : </Form.Label>
                    </div>
                </Col>
                <Col>
                    <div>
                        <Form.Label>
                            {doctorDetails.fellowshipState}
                        </Form.Label>
                    </div>
                </Col>
            </Row>
            <Row md={6}>
                <Col>
                    <div>
                        <Form.Label>Fellowship Country : </Form.Label>
                    </div>
                </Col>
                <Col>
                    <div>
                        <Form.Label>
                            {doctorDetails.fellowshipCountry}
                        </Form.Label>
                    </div>
                </Col>
            </Row>
            <Row md={6}>
                <Col>
                    <div>
                        <Form.Label>Clinical Interests : </Form.Label>
                    </div>
                </Col>
                <Col>
                    <div>
                        <Form.Label>
                            {doctorDetails.clinicalInterests}
                        </Form.Label>
                    </div>
                </Col>
            </Row>
            <Row md={6}>
                <Col>
                    <div>
                        <Form.Label>Research Interests : </Form.Label>
                    </div>
                </Col>
                <Col>
                    <div>
                        <Form.Label>
                            {doctorDetails.researchInterests}
                        </Form.Label>
                    </div>
                </Col>
            </Row>
            <Row md={6}>
                <Col>
                    <div>
                        <Form.Label> License : </Form.Label>
                    </div>
                </Col>
                <Col>
                    <div>
                        <Form.Label>
                            {doctorDetails.license}
                        </Form.Label>
                    </div>
                </Col>
            </Row>
            <Row md={6}>
                <Col>
                    <div>
                        <Form.Label>NPI Number : </Form.Label>
                    </div>
                </Col>
                <Col>
                    <div>
                        <Form.Label>
                            {doctorDetails.npiNumber}
                        </Form.Label>
                    </div>
                </Col>
            </Row>
            </Form>
        )
} 