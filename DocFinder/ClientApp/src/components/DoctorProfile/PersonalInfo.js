import React, { useRef,useEffect} from "react";
import { Form, Row, Col,Image } from "react-bootstrap";

export function PersonalInfo(props) {
    const doctorDetails = props.DoctorDetails;
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
    let labels = selectedLanguages.map(function(item) {
      return item["label"];
    });
    return labels.join();
  }

  function getSpecialitiesSelected(selectedSpecialities) {
    let labels = selectedSpecialities.map(function(item) {
      return item["label"];
    });
    return labels.join();
    }

    useEffect(() => {
        if (doctorDetails.userImage != "")
        imageRef.current.src = "data:image/png;base64," + doctorDetails.userImage;
    }, []);



  return (
      <Form>
          <Row md={2}>
              <Col md={2}>
                  <Image className="img-fluid" alt="nopes" roundedCircle ref={imageRef} src="../../Images/defaultimage.jpg"/>
              </Col>
              <Col md={10}>
                  <Row md={6}>
                      <Col>
                          <div>
                              <Form.Label>Full Name : </Form.Label>
                          </div>
                      </Col>
                      <Col>
                          <div>
                              <Form.Label>
                                  {" "}
                                  {doctorDetails.firstName +
                                      " " +
                                      doctorDetails.middleName +
                                      " " +
                                      doctorDetails.lastName}{" "}
                              </Form.Label>
                          </div>
                      </Col>
                  </Row>
                  <Row md={6}>
                      <Col>
                          <div>
                              <Form.Label>Age : </Form.Label>
                          </div>
                      </Col>
                      <Col>
                          <div>
                              <Form.Label>{getAgeFromDOB(doctorDetails.dateOfBirth)}</Form.Label>
                          </div>
                      </Col>
                  </Row>
                  <Row md={6}>
                      <Col>
                          <div>
                              <Form.Label>Gender</Form.Label>
                          </div>
                      </Col>
                      <Col>
                          <div>
                              <Form.Label>{doctorDetails.gender}</Form.Label>
                          </div>
                      </Col>
                  </Row>
                  <Row md={6}>
                      <Col>
                          <div>
                              <Form.Label>University</Form.Label>
                          </div>
                      </Col>
                      <Col>
                          <div>
                              <Form.Label>{doctorDetails.education}</Form.Label>
                          </div>
                      </Col>
                  </Row>

                  <Row md={6}>
                      <Col>
                          <div>
                              <Form.Label>Degree</Form.Label>
                          </div>
                      </Col>
                      <Col>
                          <div>
                              <Form.Label>{doctorDetails.degree}</Form.Label>
                          </div>
                      </Col>
                  </Row>
                  <Row md={6}>
                      <Col>
                          <div>
                              <Form.Label>Experience</Form.Label>
                          </div>
                      </Col>
                      <Col>
                          <div>
                              <Form.Label>{doctorDetails.yearsInPractice}</Form.Label>
                          </div>
                      </Col>
                  </Row>
                  <Row md={6}>
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
                                  value={getLanguagesSelected(doctorDetails.languages)}
                              />
                          </div>
                      </Col>
                  </Row>
                  <Row md={6}>
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
                                  value={getSpecialitiesSelected(doctorDetails.specialities)}
                              />
                          </div>
                      </Col>
                  </Row>
                  <Row md={6}>
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
                                  value={getSpecialitiesSelected(doctorDetails.specialities)}
                              />
                          </div>
                      </Col>
                  </Row>
              </Col>
          </Row>


   
  
  
    </Form>
  );
}
