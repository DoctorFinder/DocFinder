import React, { useState} from 'react';
import { useLocation } from "react-router-dom";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { MyCheckOutForm } from './MyCheckOutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51HfT5ZBZF2Gh46d9YHazocY5sb2WmgZqiUJBjIyDTb5jITgYS07fZEr3h6iQanJViu1vbuyfhHjJXRxPUBGTX64F00xLNKICmm');


export function PaymentForm(props) {
    const emptyPaymentFormData = {
        fullName:"",
        emailaddress: "",
        phoneNumber: ""
    };

    const [defaultEmptyPaymentFormData, setDefaultEmptyPaymentFormData] = useState(emptyPaymentFormData);

    let location = useLocation();

    let doctor = location.state.doctordetails.doctor;
    doctor.languages = location.state.doctordetails.languages;
    doctor.specialities = location.state.doctordetails.specialities;
    doctor.subspecialities = location.state.doctordetails.specialities;
      

    return (
        <Elements stripe={stripePromise}>
            <MyCheckOutForm DefaultEmptyPaymentFormData={defaultEmptyPaymentFormData}
                Doctor={doctor} />              
        </Elements>
    );
}