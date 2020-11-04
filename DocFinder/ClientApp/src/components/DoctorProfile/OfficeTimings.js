import React from 'react';
import Modal from "react-bootstrap/Modal";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



export function OfficeTimings(props) {
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
                                    selected={new Date(Date.parse(hospitalTimings.sundayStart))}
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
                                    selected={new Date(Date.parse(hospitalTimings.sundayEnd))}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className="maxwidth"
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Check type='checkbox' label='Closed' defaultChecked={hospitalTimings.sunDayOpen} disabled={true}
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
                                    selected={new Date(Date.parse(hospitalTimings.mondayStart))}
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
                                    selected={new Date(Date.parse(hospitalTimings.mondayEnd))}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className="maxwidth"
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Check type='checkbox' label='Closed' defaultChecked={hospitalTimings.monDayOpen} disabled={true}
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
                                    selected={new Date(Date.parse(hospitalTimings.tuesdayStart))}
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
                                    selected={new Date(Date.parse(hospitalTimings.tuesdayEnd))}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className="maxwidth"
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Check type='checkbox' label='Closed' defaultChecked={hospitalTimings.tuesDayOpen} disabled={true}
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
                                    selected={new Date(Date.parse(hospitalTimings.wednesdayStart))}
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
                                    selected={new Date(Date.parse(hospitalTimings.wednesdayEnd))}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className="maxwidth"
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Check type='checkbox' label='Closed' defaultChecked={hospitalTimings.wednesDayOpen} disabled={true}

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
                                    selected={new Date(Date.parse(hospitalTimings.thursdayStart))}
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
                                    selected={new Date(Date.parse(hospitalTimings.thursdayEnd))}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className="maxwidth"
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Check type='checkbox' label='Closed' defaultChecked={hospitalTimings.thursDayOpen} disabled={true}

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
                                    selected={new Date(Date.parse(hospitalTimings.fridayStart))}
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
                                    selected={new Date(Date.parse(hospitalTimings.fridayEnd))}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className="maxwidth"
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Check type='checkbox' label='Closed' defaultChecked={hospitalTimings.friDayOpen} disabled={true}

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
                                    selected={new Date(Date.parse(hospitalTimings.saturdayStart))}
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
                                    selected={new Date(Date.parse(hospitalTimings.saturdayEnd))}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className="maxwidth"
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Check type='checkbox' label='Closed' defaultChecked={hospitalTimings.satDayOpen} disabled={true}

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