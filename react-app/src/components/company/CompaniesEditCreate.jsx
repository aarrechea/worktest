// Imports
import React, { useRef, useState } from "react";
import GeneralButton from "../general/GeneralButton";
import { useLocation, useNavigate } from "react-router-dom";
import "./css/companiesEditCreate.css";
import axiosService from "../../helpers/axios";
import { getUser } from "../hooks/actions";



// Create edit component
const CreateEditCompany = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState();
    const initialName = useRef();    
    const user = getUser();


    // Location brings the edit mode if applicable
    const location = useLocation();


    // Get the company to be edited if mode is Edit
    if (location.state.mode === "Edit") {
        axiosService
            .get(`/company/${location.state.id}/`)
            .then(res => res.data)
            .then((data) => {
                setCompanyName(() => data.name);                
            })
    }


    // Handle create or edit click
    function handleCreateEdit() {
        let data = {};

        if (initialName.current.length < 3) {
            return
        } else {
            data = {
                'name':initialName.current,
                'user':user.id
            }
        }


        if (location.state.mode === "Create") {
            axiosService                
                .post("/company/", data)
                .then((res) => {
                    navigate(-1)
                })            
        } else {
            axiosService
                .put(`/company/${location.state.id}/`, data)
                .then(() => {
                    navigate(-1)
                })            
        }
    }
    

    // To handle each time a key is pressed in the textarea
    function handleOnChange(e) {
        initialName.current = e.target.value;        
    }


    
    // Return
    return (
        <>
            <div id="divCompanyCreateButtons">
                <GeneralButton
                    children={location.state.mode}
                    onClick={handleCreateEdit}
                />

                <GeneralButton
                    children='Previous'
                    onClick={() => navigate(-1)}
                />
            </div>

            <div id="divCompanyData">
                <h1>Company data</h1>

                <label htmlFor="companyName">Name</label>
                <textarea 
                    name="companyName" 
                    id="" placeholder="Company name" 
                    defaultValue={companyName}
                    onChange={(e) => handleOnChange(e)}
                    maxLength={50}
                ></textarea>
            </div>
        </>
        
    )
};



// Export
export default CreateEditCompany;




