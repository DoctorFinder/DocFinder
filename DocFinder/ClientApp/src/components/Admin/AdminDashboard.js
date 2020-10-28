import React, { useState, Fragment,useContext, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../../Styles/Spinner.css";
import "../../Styles/AdminDashBoard.css";
import { AgGridColumn, AgGridReact } from '@ag-grid-community/react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';


const StatusRenderer = props => {
    const invokeParentMethod = () => {
        props.context.methodFromParent(props.data.id);
    };
    return <Fragment>
        {!props.data.status && <Button onClick={invokeParentMethod}> Activate</Button>}
        {props.data.status && <Button onClick={invokeParentMethod}> DeActivate</Button>}
    </Fragment>
    //return <span>Field: {props.colDef.field}, Value: {props.data.id}</span>
};

const AdminDashboard = () =>{

    let location = useLocation();
    let doctors = location.state.doctordetails;
    let modifiedDoctors = doctors.map(doc => {
        let modifiedDoctor = {
            fullName: doc.doctor.firstName + " " + doc.doctor.lastName,
            emailaddress: doc.doctor.email,
            id: doc.doctor.id,
            status: doc.doctor.isVerified
        }
        return modifiedDoctor;
    });

    const gridApi = useRef();
    const [doctorsData, setDoctorsData] = useState(modifiedDoctors);
    const [errorMsg, seterrorMsg] = useState("");
    const [isRequestProcessing, setRequestProcessingStatus] = useState(false);


    const methodFromParent = cell => {
        ActivateDoctor(cell);
    };

    const onGridReady = (params) => {

    };

    function ActivateDoctor(doctorId) {   
         
        const selectedDoctor = doctorsData.filter((doc) => {
            if (doc.id == doctorId) {
                return true;
            }
            else
                return false;               
        });
        console.log(selectedDoctor);
        const doctor = {
            EmailAddress: selectedDoctor[0].emailaddress,
            Password: ''
        };
        const requestOptions = {
            method: 'put',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(doctor)
        };
        fetch("Admin/Put", requestOptions)
            .then(async response => {
                const data = await response.json();
                if (!response.ok) {
                    let error = (data && data.message) || response.status;
                    if (data.responseMessage) {
                        error = data.responseMessage;
                    }
                    return Promise.reject(error);
                }

                const updateDoctors = doctorsData.map((doc) => {
                    console.log(doc);
                    if (doc.id == doctorId) {
                        doc.status = !doc.status;
                    }
                    return doc;
                });
                setDoctorsData(updateDoctors);
                
                gridApi.current.setRowData(updateDoctors);
                setRequestProcessingStatus(false);
            })
            .catch(error => {
                console.log(error);
                              setRequestProcessingStatus(false);
                            seterrorMsg(error);
            });
    }

    return (
        <div
            className="ag-theme-alpine setMargin ag-theme-alpine test-grid"
            style={{
                height: '500px',
                width: '800px'
            }}>
            <fieldset disabled={isRequestProcessing}>
                <AgGridReact
            modules={AllCommunityModules}
                    rowData={[]}
                    onGridReady={params => {
                        console.log("grid rendered");
                        gridApi.current = params.api;                        
                        params.api.setRowData(doctorsData);
                    }}
                frameworkComponents={{
                    statusRenderer: StatusRenderer
                    }}
                context={{
                    methodFromParent
                    }}                    
            defaultColDef={{
                sortable: true,
                flex: 1,
                minWidth: 100,
                filter: true,
                resizable: true
                    }}
                    pagination={true}
                    paginationPageSize={10}
                >
                <AgGridColumn field="id"/>
                <AgGridColumn field="fullName"  />
                <AgGridColumn field="emailaddress" />
                <AgGridColumn cellRenderer="statusRenderer" field="status"/>
                </AgGridReact>
            </fieldset>
            {isRequestProcessing && <div className="spinner" />}                
            </div>
        );
        
}

export default AdminDashboard;