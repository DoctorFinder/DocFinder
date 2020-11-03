import React from 'react';
import Modal from "react-bootstrap/Modal";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



export function DoctorInfoTimingscomponent(props) {
    console.log(props);

    let hospitalTimings = props.Hospitaltimings;

    function handleClose() {
        props.ToggleModal();
    }

    return (
        <Modal show={props.DisplayModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Set Hospital Working Hours</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Container>
                        <Row md={4}>
                            <Col md={3}>
                                <Form.Label>WeekDay </Form.Label>
                            </Col>
                            <Col md={3}>
                                <Form.Label>Start Time</Form.Label>
                            </Col>
                            <Col md={3}>
                                <Form.Label>End Time</Form.Label>
                            </Col>
                            <Col md={3}>
                                <Form.Label>Availability</Form.Label>
                            </Col>
                        </Row>
                        <Row md={4}>
                            <Col md={3}>
                                <Form.Label>Sunday :</Form.Label>
                            </Col>
                            <Col md={3}>
                                <DatePicker
                                    disabled={true}
                                    selected={hospitalTimings.SundayStart}                                    
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className="maxwidth"
                                />
                            </Col>
                            <Col md={3}>
                                <DatePicker
                                    disabled={true}
                                    selected={hospitalTimings.SundayEnd}

                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className="maxwidth"
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Check type='checkbox' label='Closed' defaultChecked={hospitalTimings.SunDayOpen} disabled={ true}                                    
                                />
                            </Col>
                        </Row>
                        <Row md={4}>
                            <Col md={3}>
                                <Form.Label>Monday :</Form.Label>
                            </Col>
                            <Col md={3}>
                                <DatePicker
                                    disabled={true}
                                    selected={hospitalTimings.MondayStart}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className="maxwidth"
                                />
                            </Col>
                            <Col md={3}>
                                <DatePicker
                                    disabled={true}
                                    selected={hospitalTimings.MondayEnd}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className="maxwidth"
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Check type='checkbox' label='Closed' defaultChecked={hospitalTimings.MonDayOpen} disabled={true}                                    
                                />
                            </Col>
                        </Row>
                        <Row md={4}>
                            <Col md={3}>
                                <Form.Label>Tuesday :</Form.Label>
                            </Col>
                            <Col md={3}>
                                <DatePicker
                                    disabled={true}
                                    selected={hospitalTimings.TuesdayStart}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className="maxwidth"
                                />
                            </Col>
                            <Col md={3}>
                                <DatePicker
                                    disabled={true}
                                    selected={hospitalTimings.TuesdayEnd}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className="maxwidth"
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Check type='checkbox' label='Closed' defaultChecked={hospitalTimings.TuesDayOpen} disabled={true}                                   
                                />
                            </Col>
                        </Row>
                        <Row md={4}>
                            <Col md={3}>
                                <Form.Label>Wednesday:</Form.Label>
                            </Col>
                            <Col md={3}>
                                <DatePicker
                                    disabled={true}
                                    selected={hospitalTimings.WednesdayStart} 
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className="maxwidth"
                                />
                            </Col>
                            <Col md={3}>
                                <DatePicker
                                    disabled={true}
                                    selected={hospitalTimings.WednesdayEnd} 
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className="maxwidth"
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Check type='checkbox' label='Closed' defaultChecked={hospitalTimings.WednesDayOpen} disabled={true}
                                   
                                />
                            </Col>
                        </Row>
                        <Row md={4}>
                            <Col md={3}>
                                <Form.Label>Thursday :</Form.Label>
                            </Col>
                            <Col md={3}>
                                <DatePicker
                                    disabled={true}
                                    selected={hospitalTimings.ThursdayStart}
                                    
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className="maxwidth"
                                />
                            </Col>
                            <Col md={3}>
                                <DatePicker
                                    disabled={true}
                                    selected={hospitalTimings.ThursdayEnd}
                                     
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className="maxwidth"
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Check type='checkbox' label='Closed' defaultChecked={hospitalTimings.ThursDayOpen} disabled={true}
                                     
                                />
                            </Col>
                        </Row>
                        <Row md={4}>
                            <Col md={3}>
                                <Form.Label>Friday :</Form.Label>
                            </Col>
                            <Col md={3}>
                                <DatePicker
                                    disabled={true}
                                    selected={hospitalTimings.FridayStart}
                                   
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className="maxwidth"
                                />
                            </Col>
                            <Col md={3}>
                                <DatePicker
                                    disabled={true}
                                    selected={hospitalTimings.FridayEnd}
                                    
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className="maxwidth"
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Check type='checkbox' label='Closed' defaultChecked={hospitalTimings.FriDayOpen} disabled={true}
                                     
                                />
                            </Col>
                        </Row>
                        <Row md={4}>
                            <Col md={3}>
                                <Form.Label>Saturday :</Form.Label>
                            </Col>
                            <Col md={3}>
                                <DatePicker
                                    disabled={true}
                                    selected={hospitalTimings.SaturdayStart}
                                  
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className="maxwidth"
                                />
                            </Col>
                            <Col md={3}>
                                <DatePicker
                                    disabled={true}
                                    selected={hospitalTimings.SaturdayEnd}
                                  
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className="maxwidth"
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Check type='checkbox' label='Closed' defaultChecked={hospitalTimings.SatDayOpen} disabled={true}
                                     
                                />
                            </Col>
                        </Row>
                    </Container>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    )

}