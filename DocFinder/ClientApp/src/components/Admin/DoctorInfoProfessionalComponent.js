import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';

export function DoctorInfoProfessionalComponent(props) {

    let doctor = props.Doctor.doctor;

    console.log(doctor);


    return (
        <Form>
            <div className="docPersonalInfoFormContainer">
                <Container>
                    <Form.Group>
                        <Row md={12}>
                            <Col sm={3} className="margin-bottom">
                                <Form.Label>Education</Form.Label>
                            </Col>
                            <Col sm={3} className="margin-bottom">
                                <Form.Label>
                                    {doctor.education}   
                                    </Form.Label>
                            </Col>
                            <Col sm={3} className="margin-bottom">
                                <Form.Label>Degree</Form.Label>
                            </Col>
                            <Col sm={3} className="margin-bottom">
                                <Form.Label>
                                   {doctor.degree}
                                </Form.Label>                                
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group>
                        <Row md={12}>
                            <Col sm={3} className="margin-bottom">
                                <Form.Label className="block">Year Graduated</Form.Label>
                            </Col>
                            <Col sm={3} className="margin-bottom">
                                <Form.Label>
                                {doctor.yearOfGraduation}  
                                   
                                </Form.Label>                                                            
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group>
                        <Row md={12}>
                            <Col sm={3} className="margin-bottom">
                                <Form.Label>Years In Practise</Form.Label>
                            </Col>
                            <Col sm={3} className="margin-bottom">
                                    <Form.Label>
                              {doctor.yearsInPractice}
                                </Form.Label>                                
                            </Col>
                            <Col sm={3} className="margin-bottom">
                                <Form.Label>Graduated City </Form.Label>
                            </Col>
                            <Col sm={3} className="margin-bottom">
                                        <Form.Label>
                           {doctor.educationCity}
                                </Form.Label>                                
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row md={12}>
                            <Col sm={3} className="margin-bottom">
                                <Form.Label>Graduated Country</Form.Label>
                            </Col>
                            <Col sm={3} className="margin-bottom">
                                <Form.Label>
                          {doctor.educationCountry} 
                                </Form.Label>                                
                            </Col>
                            <Col sm={3} className="margin-bottom">
                                <Form.Label>Graduated State </Form.Label>
                            </Col>
                            <Col sm={3} className="margin-bottom">
                                <Form.Label>
                          {doctor.educationState}                                   
                                </Form.Label>                                
                            
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row md={12}>
                            <Col sm={3} className="margin-bottom">
                                <Form.Label>Residency At</Form.Label>
                            </Col>
                            <Col sm={3} className="margin-bottom">
                                <Form.Label>
                              {doctor.residencyFrom}                                   
                                </Form.Label>                                                        
                            </Col>
                            <Col sm={3} className="margin-bottom">
                                <Form.Label>Residency City </Form.Label>
                            </Col>
                            <Col sm={3} className="margin-bottom">
                                <Form.Label>
                            {doctor.residencyCity}                                    
                                </Form.Label>                                
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row md={12}>
                            <Col sm={3} className="margin-bottom">
                                <Form.Label>Residency Country</Form.Label>
                            </Col>
                            <Col sm={3} className="margin-bottom">
                                <Form.Label>
                                    {doctor.residencyCountry} 
                                </Form.Label>                                
                            </Col>
                            <Col sm={3} className="margin-bottom">
                                <Form.Label>Residency State </Form.Label>
                            </Col>
                            <Col sm={3} className="margin-bottom">
                                <Form.Label>
                                    {doctor.residencyState} 
                                </Form.Label>                                
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row md={12}>
                            <Col sm={3} className="margin-bottom">
                                <Form.Label>Fellowship at</Form.Label>
                            </Col>
                            <Col sm={3} className="margin-bottom">
                                <Form.Label>
                                    {doctor.fellowshipFrom}                                     
                                </Form.Label>                                
                            </Col>
                            <Col sm={3} className="margin-bottom">
                                <Form.Label>Fellowship City </Form.Label>
                            </Col>
                            <Col sm={3} className="margin-bottom">
                                <Form.Label>
                                    {doctor.fellowshipCity}                                    
                                </Form.Label>                                
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row md={12}>
                            <Col sm={3} className="margin-bottom">
                                <Form.Label>Fellowship Country</Form.Label>
                            </Col>
                            <Col sm={3} className="margin-bottom">
                                <Form.Label>
                                    {doctor.fellowshipCountry}                                    
                                </Form.Label>                                
                            </Col>
                            <Col sm={3} className="margin-bottom">
                                <Form.Label>Fellowship State </Form.Label>
                            </Col>
                            <Col sm={3} className="margin-bottom">
                                <Form.Label>
                                    {doctor.fellowshipState}                                    
                                </Form.Label>                                
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group>
                        <Row md={12}>
                            <Col sm={3} className="margin-bottom">
                                <Form.Label>Clinical Interests</Form.Label>
                            </Col>
                            <Col sm={3} className="margin-bottom">
                                <Form.Label>
                                    {doctor.clinicalInterests}                                    
                                </Form.Label>                                
                            </Col>
                            <Col sm={3} className="margin-bottom">
                                <Form.Label>Research Interests</Form.Label>
                            </Col>
                            <Col sm={3} className="margin-bottom">
                                <Form.Label>
                                    {doctor.researchInterests}
                                </Form.Label>                                
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row md={12}>
                            <Col sm={3} className="margin-bottom">
                                <Form.Label>License</Form.Label>
                            </Col>
                            <Col sm={3} className="margin-bottom">
                                <Form.Label>
                                     {doctor.license}
                                </Form.Label>                                                      
                            </Col>
                            <Col sm={3} className="margin-bottom">
                                <Form.Label>NPI Number</Form.Label>
                            </Col>
                            <Col sm={3} className="margin-bottom">
                                <Form.Label>
                                   {doctor.npiNumber}                                   
                                </Form.Label>                                
                            </Col>
                        </Row>
                    </Form.Group>
                </Container>
            </div>
        </Form>
    )
}