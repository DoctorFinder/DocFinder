import React from "react";
import { OfficeAddressEdit } from './OfficeAddressEdit';
import { Container } from "react-bootstrap";

export function OfficeInfoEdit(props) {
    const addresses = props.DoctorDetails.addresses;

    return (
        <Container>
            {addresses.map((adrs, index) => {
                return <OfficeAddressEdit address={adrs} key={index} />
            })
            }
        </Container>
    );

}
