import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export function OfficeTimingsEdit(props) {

    const [hospitalTimings, setHospitalTimings] = useState(props.Hospitaltimings);
    console.log(props);
    let hospTimings = props.Hospitaltimings;

    function modifyTimings(dayToChange, date) {
        let modifiedState = { ...hospitalTimings };
        modifiedState[dayToChange] = date;
        setHospitalTimings(modifiedState);
    }

    function handleClose() {
        props.ToggleModal();
    }

    function UpdateTimings() {
        let modifiedState = { ...hospitalTimings };
        modifiedState.UpdateHours = true;
        setHospitalTimings(modifiedState);
        props.UpdateHospitalTimings(modifiedState);
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
                                    disabled={!hospTimings.sunDayOpen}
                                    selected={new Date(Date.parse(hospTimings.sundayStart))}
                                    onChange={date => {
                                        modifyTimings("sundayStart", date)
                                    }}
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
                                    disabled={!hospTimings.sunDayOpen}
                                    selected={new Date(Date.parse(hospTimings.sundayEnd))}
                                    onChange={date => {
                                        modifyTimings("sundayEnd", date)
                                    }}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className="maxwidth"
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Check type='checkbox' label='Closed' defaultChecked={hospTimings.sunDayOpen}
                                    onChange={() => {
                                        const modifiedState = { ...hospitalTimings };
                                        modifiedState.sunDayOpen = !hospitalTimings.sunDayOpen;
                                        setHospitalTimings(modifiedState);
                                    }
                                    }
                                />
                            </Col>
                        </Row>
                        <Row md={4}>
                            <Col md={3}>
                                <Form.Label>Monday :</Form.Label>
                            </Col>
                            <Col md={3}>
                                <DatePicker
                                    disabled={!hospitalTimings.monDayOpen}
                                    selected={new Date(Date.parse(hospTimings.mondayStart))}
                                    onChange={date => {
                                        modifyTimings("mondayStart", date)
                                    }}
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
                                    disabled={!hospitalTimings.monDayOpen}
                                    selected={new Date(Date.parse(hospTimings.mondayEnd))}
                                    onChange={date => {
                                        modifyTimings("mondayEnd", date)
                                    }}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className="maxwidth"
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Check type='checkbox' label='Closed' defaultChecked={hospitalTimings.monDayOpen}
                                    onChange={() => {
                                        const modifiedState = { ...hospitalTimings };
                                        modifiedState.monDayOpen = !hospitalTimings.monDayOpen;
                                        setHospitalTimings(modifiedState);
                                    }
                                    }
                                />
                            </Col>
                        </Row>
                        <Row md={4}>
                            <Col md={3}>
                                <Form.Label>Tuesday :</Form.Label>
                            </Col>
                            <Col md={3}>
                                <DatePicker
                                    disabled={!hospitalTimings.tuesDayOpen}
                                    selected={new Date(Date.parse(hospTimings.tuesdayStart))}
                                    onChange={date => {
                                        modifyTimings("tuesdayStart", date)
                                    }}
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
                                    disabled={!hospitalTimings.tuesDayOpen}
                                    selected={new Date(Date.parse(hospTimings.tuesdayEnd))}
                                    onChange={date => {
                                        modifyTimings("tuesdayEnd", date)
                                    }}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className="maxwidth"
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Check type='checkbox' label='Closed' defaultChecked={hospitalTimings.tuesDayOpen}
                                    onChange={() => {
                                        const modifiedState = { ...hospitalTimings };
                                        modifiedState.tuesDayOpen = !hospitalTimings.tuesDayOpen;
                                        setHospitalTimings(modifiedState);
                                    }
                                    }
                                />
                            </Col>
                        </Row>
                        <Row md={4}>
                            <Col md={3}>
                                <Form.Label>Wednesday:</Form.Label>
                            </Col>
                            <Col md={3}>
                                <DatePicker
                                    disabled={!hospitalTimings.wednesDayOpen}
                                    selected={new Date(Date.parse(hospTimings.wednesdayStart))}
                                    onChange={date => {
                                        modifyTimings("wednesdayStart", date)
                                    }}
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
                                    disabled={!hospitalTimings.wednesDayOpen}
                                    selected={new Date(Date.parse(hospTimings.wednesdayEnd))}
                                    onChange={date => {
                                        modifyTimings("wednesdayEnd", date)
                                    }}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className="maxwidth"
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Check type='checkbox' label='Closed' defaultChecked={hospitalTimings.wednesDayOpen}
                                    onChange={() => {
                                        const modifiedState = { ...hospitalTimings };
                                        modifiedState.wednesDayOpen = !hospitalTimings.wednesDayOpen;
                                        setHospitalTimings(modifiedState);
                                    }
                                    }
                                />
                            </Col>
                        </Row>
                        <Row md={4}>
                            <Col md={3}>
                                <Form.Label>Thursday :</Form.Label>
                            </Col>
                            <Col md={3}>
                                <DatePicker
                                    disabled={!hospitalTimings.thursDayOpen}
                                    selected={new Date(Date.parse(hospTimings.thursdayStart))}
                                    onChange={date => {
                                        modifyTimings("thursdayStart", date)

                                    }}
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
                                    disabled={!hospitalTimings.thursDayOpen}
                                    selected={new Date(Date.parse(hospTimings.thursdayEnd))}
                                    onChange={date => {
                                        modifyTimings("thursdayEnd", date)

                                    }}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className="maxwidth"
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Check type='checkbox' label='Closed' defaultChecked={hospitalTimings.thursDayOpen}
                                    onChange={() => {
                                        const modifiedState = { ...hospitalTimings };
                                        modifiedState.thursDayOpen = !hospitalTimings.thursDayOpen;
                                        setHospitalTimings(modifiedState);
                                    }
                                    }
                                />
                            </Col>
                        </Row>
                        <Row md={4}>
                            <Col md={3}>
                                <Form.Label>Friday :</Form.Label>
                            </Col>
                            <Col md={3}>
                                <DatePicker
                                    disabled={!hospitalTimings.friDayOpen}
                                    selected={new Date(Date.parse(hospTimings.fridayStart))}
                                    onChange={date => {
                                        modifyTimings("fridayStart", date)
                                    }}
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
                                    disabled={!hospitalTimings.friDayOpen}
                                    selected={new Date(Date.parse(hospTimings.fridayEnd))}
                                    onChange={date => {
                                        modifyTimings("fridayEnd", date)
                                    }}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className="maxwidth"
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Check type='checkbox' label='Closed' defaultChecked={hospitalTimings.friDayOpen}
                                    onChange={() => {
                                        const modifiedState = { ...hospitalTimings };
                                        modifiedState.FriDayOpen = !hospitalTimings.friDayOpen;
                                        setHospitalTimings(modifiedState);
                                    }
                                    }
                                />
                            </Col>
                        </Row>
                        <Row md={4}>
                            <Col md={3}>
                                <Form.Label>Saturday :</Form.Label>
                            </Col>
                            <Col md={3}>
                                <DatePicker
                                    disabled={!hospitalTimings.satDayOpen}
                                    selected={new Date(Date.parse(hospTimings.saturdayStart))}
                                    onChange={date => {
                                        modifyTimings("saturdayStart", date)
                                    }}
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
                                    disabled={!hospitalTimings.satDayOpen}
                                    selected={new Date(Date.parse(hospTimings.saturdayEnd))}
                                    onChange={date => {
                                        modifyTimings("saturdayEnd", date)
                                    }}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className="maxwidth"
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Check type='checkbox' label='Closed' defaultChecked={hospitalTimings.satDayOpen}
                                    onChange={() => {
                                        const modifiedState = { ...hospitalTimings };
                                        modifiedState.satDayOpen = !hospitalTimings.satDayOpen;
                                        setHospitalTimings(modifiedState);
                                    }
                                    }
                                />
                            </Col>
                        </Row>
                    </Container>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={UpdateTimings}>Submit</Button>
            </Modal.Footer>
        </Modal>
    )
}