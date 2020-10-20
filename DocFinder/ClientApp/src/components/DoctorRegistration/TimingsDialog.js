import React, { useState} from 'react';
import Modal from "react-bootstrap/Modal";
import { Form, Button, Container, Row, Col} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function TimingsDialog(props){

    const [hospitalTimings, setHospitalTimings] = useState(props.Hospitaltimings);

    function modifyTimings(dayToChange,date) {
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
                                    disabled={!hospitalTimings.SunDayOpen}
                                    selected={hospitalTimings.SundayStart}
                                    onChange={date => {
                                        modifyTimings("SundayStart", date)
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
                                    disabled={!hospitalTimings.SunDayOpen}
                                    selected={hospitalTimings.SundayEnd}
                                    onChange={date => {
                                        modifyTimings("SundayEnd", date)
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
                                <Form.Check type='checkbox' label='Closed' defaultChecked={hospitalTimings.SunDayOpen}
                                    onChange={() => {
                                        const modifiedState = { ...hospitalTimings };
                                        modifiedState.SunDayOpen = !hospitalTimings.SunDayOpen;
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
                                    disabled={!hospitalTimings.MonDayOpen}
                                    selected={hospitalTimings.MondayStart}
                                    onChange={date => {
                                        modifyTimings("MondayStart", date)
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
                                    disabled={!hospitalTimings.MonDayOpen}
                                    selected={hospitalTimings.MondayEnd}
                                    onChange={date => {
                                        modifyTimings("MondayEnd", date)
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
                                <Form.Check type='checkbox' label='Closed' defaultChecked={hospitalTimings.MonDayOpen}
                                    onChange={() => {
                                        const modifiedState = { ...hospitalTimings };
                                        modifiedState.MonDayOpen = !hospitalTimings.MonDayOpen;
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
                                    disabled={!hospitalTimings.TuesDayOpen}
                                    selected={hospitalTimings.TuesdayStart}
                                    onChange={date => {
                                        modifyTimings("TuesdayStart", date)
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
                                    disabled={!hospitalTimings.TuesDayOpen}
                                    selected={hospitalTimings.TuesdayEnd}
                                    onChange={date => {
                                        modifyTimings("TuesdayEnd", date)
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
                                <Form.Check type='checkbox' label='Closed' defaultChecked={hospitalTimings.TuesDayOpen}
                                    onChange={() => {
                                        const modifiedState = { ...hospitalTimings };
                                        modifiedState.TuesDayOpen = !hospitalTimings.TuesDayOpen;
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
                                    disabled={!hospitalTimings.WednesDayOpen}
                                    selected={hospitalTimings.WednesdayStart}
                                    onChange={date => {
                                        modifyTimings("WednesdayStart", date)
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
                                    disabled={!hospitalTimings.WednesDayOpen}
                                    selected={hospitalTimings.WednesdayEnd}
                                    onChange={date => {
                                        modifyTimings("WednesdayEnd", date)
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
                                <Form.Check type='checkbox' label='Closed' defaultChecked={hospitalTimings.WednesDayOpen}
                                    onChange={() => {
                                        const modifiedState = { ...hospitalTimings };
                                        modifiedState.WednesDayOpen = !hospitalTimings.WednesDayOpen;
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
                                    disabled={!hospitalTimings.ThursDayOpen}
                                    selected={hospitalTimings.ThursdayStart}
                                    onChange={date => {
                                        modifyTimings("ThursdayStart", date)
                                        
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
                                    disabled={!hospitalTimings.ThursDayOpen}
                                    selected={hospitalTimings.ThursdayEnd}
                                    onChange={date => {
                                        modifyTimings("ThursdayEnd", date)
                                     
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
                                <Form.Check type='checkbox' label='Closed' defaultChecked={hospitalTimings.ThursDayOpen}
                                    onChange={() => {
                                        const modifiedState = { ...hospitalTimings };
                                        modifiedState.ThursDayOpen = !hospitalTimings.ThursDayOpen;
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
                                    disabled={!hospitalTimings.FriDayOpen}
                                    selected={hospitalTimings.FridayStart}
                                    onChange={date => {
                                        modifyTimings("FridayStart", date)
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
                                    disabled={!hospitalTimings.FriDayOpen}
                                    selected={hospitalTimings.FridayEnd}
                                    onChange={date => {
                                        modifyTimings("FridayEnd", date)
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
                                <Form.Check type='checkbox' label='Closed' defaultChecked={hospitalTimings.FriDayOpen}
                                    onChange={() => {
                                        const modifiedState = { ...hospitalTimings };
                                        modifiedState.FriDayOpen = !hospitalTimings.FriDayOpen;
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
                                    disabled={!hospitalTimings.SatDayOpen}
                                    selected={hospitalTimings.SaturdayStart}
                                    onChange={date => {
                                        modifyTimings("SaturdayStart", date)
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
                                    disabled={!hospitalTimings.SatDayOpen}
                                    selected={hospitalTimings.SaturdayEnd}
                                    onChange={date => {
                                        modifyTimings("SaturdayEnd", date)
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
                                <Form.Check type='checkbox' label='Closed' defaultChecked={hospitalTimings.SatDayOpen}
                                    onChange={() => {
                                        const modifiedState = { ...hospitalTimings };
                                        modifiedState.SatDayOpen = !hospitalTimings.SatDayOpen;
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