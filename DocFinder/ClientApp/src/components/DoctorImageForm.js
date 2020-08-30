import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link} from 'react-router-dom'

export function DoctorImageForm(props) {

    const [linkToProfessional, setlinkToProfessional] = useState(props)    

    useEffect(() => {
        let lastIdx = props.match.url.lastIndexOf("/");
        let linkRoute = props.match.url.substring(0, lastIdx) + "/Professional";
        setlinkToProfessional(linkRoute);
        console.log(linkRoute);
        },[props]);

    return (
       
        <Form>
            <Form.Group>
                <Form.Label>Primary Address </Form.Label>
                <Form.Control type="text" placeholder="Enter Address here"></Form.Control>

                <Form.Label> Phone Number</Form.Label>
                <Form.Control type="text" placeholder="Enter Your Phone Number"></Form.Control>

            </Form.Group>
            <Link to={linkToProfessional}>Prev </Link>
            <Button >Submit </Button>{' '}
        </Form>
        
        ) 


}