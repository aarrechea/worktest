// Imports
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fcnGetValues } from "./Various";
import GeneralButton from "../general/GeneralButton";
import "./css/login.css";
import { fcnSetTimeOut } from "../../functions/GeneralFunctions";
import { useUserActions } from "../hooks/actions";



// Login component
const Login = () => {    
    // User actions contains login functionality
    const userActions = useUserActions();


    // To change the H1 text and style
    const [h1Text, setH1Text] = useState("Login")
    const [styleH1, setStyleH1] = useState({});


    // Handle login
    function handleLogin() {
        const data = fcnGetValues('loginInput');

        userActions.login(data)
            .catch((err) => {
                console.log("Error in the login: ", err);
                fcnSetTimeOut("Login", "Email or password incorrect", setH1Text, setStyleH1);                
            })        
    };


    // Return
    return (
        <div id="divLogin">
            <div style={{marginTop:'1rem'}}>
                <h1 style={styleH1}>{h1Text}</h1>
            </div>
            
            <div id="divLoginInput">
                <label htmlFor="inputLoginEmail">Email</label>
                <input 
                    maxLength={50} 
                    type="email" 
                    id="inputLoginEmail" 
                    placeholder="Email" 
                    className="loginInput"
                    name="email"
                    required
                />
                
                <label htmlFor="inputLoginPassword">Password</label>
                <input 
                    maxLength={20} 
                    type="password" 
                    id="inputLoginPassword" 
                    placeholder="Password" 
                    className="loginInput"
                    name="password"
                    required
                />                
            </div>            

            <div>
                <GeneralButton
                    children={'Login'}
                    onClick={handleLogin}
                />
            </div>            
        </div>
    )
};



// Export
export default Login;


