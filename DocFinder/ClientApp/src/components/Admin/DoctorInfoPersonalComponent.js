import React, { useEffect,useRef} from 'react';
import { Container, Row, Col, Image,Form } from 'react-bootstrap';

export function DoctorInfoPersonalComponent(props) {

    let doctor = props.Doctor.doctor;
    let specialities = props.Doctor.specialities;
    let languages = props.Doctor.languages;
 

    const imageRef = useRef();
    function getAgeFromDOB(dob) {
        var today = new Date();
        var birthDate = new Date(dob);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function getLanguagesSelected(selectedLanguages) {
        let labels = selectedLanguages.map(function (item) {
            return item["label"];
       });
        return labels.join();
    }

    function getSpecialitiesSelected(selectedSpecialities) {
        let labels = selectedSpecialities.map(function (item) {
            return item["label"];
        });
        return labels.join();
    }

    useEffect(() => {
        imageRef.current.src = "data:image/png;base64," + doctor.userImage;
    },[]);

    console.log(props.Doctor);
    return (
        <div className="parent-container d-flex">
            <Container fluid={true}>
                <Row >
                    <Col>
                        <Image className="img-fluid" alt="nopes" roundedCircle ref={imageRef} />
                    </Col>
                </Row>

            </Container>   
            <Container fluid={true}>
                <Form>
                    <Row md={12}>
                        <Col>
                            <div>
                                <Form.Label>Full Name : </Form.Label>
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <Form.Label>
                                    {" "}
                                    {doctor.firstName +
                                        " " +
                                        doctor.middleName +
                                        " " +
                                        doctor.lastName}{" "}
                                </Form.Label>
                            </div>
                        </Col>
                    </Row>
                    <Row md={12}>
                        <Col>
                            <div>
                                <Form.Label>Age : </Form.Label>
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <Form.Label>{getAgeFromDOB(doctor.dateOfBirth)}</Form.Label>
                            </div>
                        </Col>
                    </Row>
                    <Row md={12}>
                        <Col>
                            <div>
                                <Form.Label>Gender</Form.Label>
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <Form.Label>{doctor.gender}</Form.Label>
                            </div>
                        </Col>
                    </Row>
                    <Row md={12}>
                        <Col>
                            <div>
                                <Form.Label>University</Form.Label>
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <Form.Label>{doctor.education}</Form.Label>
                            </div>
                        </Col>
                    </Row>
                    <Row md={12}>
                        <Col>
                            <div>
                                <Form.Label>Degree</Form.Label>
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <Form.Label>{doctor.degree}</Form.Label>
                            </div>
                        </Col>
                    </Row>
                    <Row md={12}>
                        <Col>
                            <div>
                                <Form.Label>Experience</Form.Label>
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <Form.Label>{doctor.yearsInPractice}</Form.Label>
                            </div>
                        </Col>
                    </Row>
                    <Row md={12}>
                        <Col>
                            <div>
                                <Form.Label>Languages</Form.Label>
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    disabled
                                    value={getLanguagesSelected(languages)}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row md={12}>
                        <Col>
                            <div>
                                <Form.Label>Specialities</Form.Label>
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    disabled
                                    value={getSpecialitiesSelected(specialities)}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row md={12}>
                        <Col>
                            <div>
                                <Form.Label>Sub Specialities</Form.Label>
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    disabled
                                    value={getSpecialitiesSelected(specialities)}
                                />
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
        )
}