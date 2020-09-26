import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import MultiSelect from "react-multi-select-component";
import * as Yup from "yup";
import errors from "../../Config/errorMessages";

const schema = Yup.object({
    education: Yup.string()
        .trim()
        .required(errors.required.replace("{0}", "Education"))
        .max(30, errors.tooLong.replace("{0}", "Education").replace("{1}", "30")),
    degree: Yup.string()
        .trim()
        .required(errors.required.replace("{0}", "Degree"))
        .max(30, errors.tooLong.replace("{0}", "Degree").replace("{1}", "30")),
    experience: Yup.number()
        .required(errors.required.replace("{0}", "Experience"))
        .max(100)
        .min(0),
    license: Yup.string()
        .trim()
        .max(30, errors.tooLong.replace("{0}", "License").replace("{1}", "30")),
    npiDisclosure: Yup.boolean(),
    npiNumber: Yup.string()
        .when('npiDisclosure', {
            is: false, // alternatively: (val) => val == true
            then: Yup.string().required()
        })
        .trim()
        .max(30, errors.tooLong.replace("{0}", "NPI Number").replace("{1}", "30")),
    specialities: Yup.array().required(
        errors.required.replace("{0}", "Specialities")
    ),
    subspecialities: Yup.array().required(
        errors.required.replace("{0}", "Sub Specialities")
    ),
    languages: Yup.array().required(errors.required.replace("{0}", "Languages"))
});


export function ProfessionalEditInfo(props) {

    const specialitiesOverrideOptions = {
        selectSomeItems: "Select Specialities",
        allItemsAreSelected: "All items are selected.",
        search: "Search Specialities"
    };

    const languagesKnownOverrideOptions = {
        selectSomeItems: "Select Specialities",
        allItemsAreSelected: "All items are selected.",
        search: "Search Languages"
    };

    const subspecialitiesOverrideOptions = {
        selectSomeItems: "Select Languages",
        allItemsAreSelected: "All items are selected.",
        search: "Search Sub Specialities"
    };

    console.log(props);
    return (
        <div>This is a professional edit info tab </div>
        )
}
