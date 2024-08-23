// Imports
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/registration.css";
import GeneralButton from "../general/GeneralButton";
import { fcnGetValues } from "./Various";



// Registration component
const Registration = () => {
    const navigate = useNavigate();
    

    // Handle registration
    function handleRegistration() {
        const data = fcnGetValues('registerInput');

        axios
            .post("http://localhost:8000/api/auth/register/", data)
            .then((res) => {
                localStorage.setItem("auth", JSON.stringify({
                    access: res.data.access,
                    refresh: res.data.refresh,
                    user: res.data.user
                }));

                navigate("/");
            })
            .catch((err) => {
                console.log("Error in the registration: ", err);
            })

    }


    // Return
    return (
        <div id="divRegistration">
            <div>
                <h1>Registration form</h1>
            </div>

            <div id="divRegistrationInput">
                <label htmlFor="inputRegistrationEmail">Email</label>
                <input 
                    maxLength={50} 
                    type="email" 
                    id="inputRegistrationEmail" 
                    placeholder="Email" 
                    className="registerInput"
                    name="email"
                    required
                />

                <label htmlFor="inputRegistrationName">First name</label>
                <input                     
                    maxLength={50} 
                    type="text" 
                    id="inputRegistrationName" 
                    placeholder="First name"
                    className="registerInput"
                    name="first_name"
                />

                <label htmlFor="inputRegistrationSurname">Last name</label>
                <input 
                    maxLength={50} 
                    type="text" 
                    id="inputRegistrationSurname" 
                    placeholder="Last name"
                    className="registerInput"
                    name="last_name"
                />

                <label htmlFor="inputRegistrationPassword">Password</label>
                <input 
                    maxLength={20} 
                    type="password" 
                    id="inputRegistrationPassword" 
                    placeholder="Password" 
                    className="registerInput"
                    name="password"
                    required
                />                
            </div>            

            <div>
                <GeneralButton
                    children={'Register'}
                    onClick={handleRegistration}
                />
            </div>            
        </div>        
    )
};



// Export
export default Registration;
