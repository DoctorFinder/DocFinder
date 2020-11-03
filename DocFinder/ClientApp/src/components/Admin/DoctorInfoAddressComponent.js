import React from 'react';
import { DoctorInfoLocationComponent } from './DoctorInfoLocationComponent';
import { Container} from 'react-bootstrap'; 

export function DoctorInfoAddressComponent(props) {

    let addresses = props.Doctor.addresses;
    let languages = props.Doctor.languages;
    return (
        <Container>
            {addresses.map((adrs, index) => {
                return <DoctorInfoLocationComponent address={adrs} key={ index} />
            })
            }
            </Container>
    )
}