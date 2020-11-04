import React, { useEffect,useState} from 'react'
import { OfficeTimings } from './OfficeTimings'

import { Form, Row, Col, Button } from 'react-bootstrap';

export function OfficeAddress(props) {
    let address = props.address;
    console.log(props);

    const [timingsState, setTimingsState] = useState({});
    const [timingsAvailable, setTimingsAvailable] = useState(false);
    const [displayTimingsModal, setDisplayTimingsModal] = useState(false);


    useEffect(() => {
        getHospitalTimings();
    }, []);

    function getHospitalTimings() {

        fetch(`HospitalTimings?addressId=${address.id}`)
            .then(response => response.json())
            .then(data => {
                setTimingsState(data);
                setTimingsAvailable(true);
                console.log(data);
            });
    }

    function ToggleTimingsModal() {
        setDisplayTimingsModal(!displayTimingsModal);
    }

    return (
        <Form>
            <Form.Group>
                <Row md={4}>
                    <Col>
                        <Form.Label>Address 1 </Form.Label>
                    </Col>
                    <Col>
                        <Form.Label>
                            {address.address1}
                        </Form.Label>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group>
                <Row md={4}>
                    <Col>
                        <Form.Label>Address 2 </Form.Label>
                    </Col>
                    <Col>
                        <Form.Label>
                            {address.address2}
                        </Form.Label>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group>
                <Row md={4}>
                    <Col>
                        <Form.Label>City </Form.Label>
                    </Col>
                    <Col>
                        <Form.Label>
                            {address.city}
                        </Form.Label>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group>
                <Row md={4}>
                    <Col>
                        <Form.Label>State </Form.Label>
                    </Col>
                    <Col>
                        <Form.Label>
                            {address.state}
                        </Form.Label>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group>
                <Row md={4}>
                    <Col>
                        <Form.Label>ZipCode </Form.Label>
                    </Col>
                    <Col>
                        <Form.Label>
                            {address.zipcode}
                        </Form.Label>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group>
                <Row md={4}>
                    <Col>
                        <Form.Label> Phone Number</Form.Label>
                    </Col>
                    <Col>
                        <Form.Label>
                            {address.phoneNumber}
                        </Form.Label>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group>
                <Row md={4}>
                    <Col>
                        <Form.Label>Web Address</Form.Label>
                    </Col>
                    <Col>
                        <Form.Label>
                            {address.webAddress}
                        </Form.Label>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group>
                <Row md={4}>
                    <Col>
                        <Button onClick={ToggleTimingsModal} disabled={!timingsAvailable}>Display Timings</Button>
                    </Col>
                    <Col>
                        <OfficeTimings
                            DisplayModal={displayTimingsModal}
                            ToggleModal={ToggleTimingsModal}
                            Hospitaltimings={timingsState}
                        />
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )
}