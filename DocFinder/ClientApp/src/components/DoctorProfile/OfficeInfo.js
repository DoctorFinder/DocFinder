import React from "react";
import { OfficeAddress} from './OfficeAddress'
import { Container } from "react-bootstrap";

export function OfficeInfo(props) {
    const addresses = props.DoctorDetails.addresses;

  return (
      <Container>
          {addresses.map((adrs, index) => {
              return <OfficeAddress address={adrs} key={index} />
          })
          }
      </Container>
  );
}
