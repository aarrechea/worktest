// Imports
import axios from "axios";
import { useNavigate } from "react-router-dom";



/* User actions */
function useUserActions() {
    /* Constants */
    const navigate = useNavigate();
    const baseURL = "http://localhost:8000/api";



    /* Login function */
    function login(data) {
        return axios
            .post(`${baseURL}/auth/login/`, data)

            .then((res) => {                
                setUserData(res);
                navigate("/")
            })            
    }



    /* Logout function */
    function logout() {
        localStorage.removeItem("auth");
        navigate("/login");
    }



    /* Return */
    return{
        login,        
        logout,
    };
}



/* Get the user */
function getUser() {    
    try {
        const auth = JSON.parse(localStorage.getItem("auth"));    
        return auth.user;    
    } catch (e) {
        console.log("Error getting the user: " + e)        
    }    
}



/* Get the access token */
function getAccessToken() {
    try {
        const auth = JSON.parse(localStorage.getItem("auth"));
        return auth.access;    
    } catch (e) {
        console.log("Error getting access token: " + e);
    }        
}



/* Get the refresh token */
function getRefreshToken() {
    try {
        const auth = JSON.parse(localStorage.getItem("auth"));
        return auth.refresh;    
    } catch (e) {
        console.log("Error getting refresh token - line 75 useraction.js: " + e);
    }    
}



/* Set user data */
function setUserData(data) {
    localStorage.setItem("auth", JSON.stringify({
        access: data.data.access,
        refresh: data.data.refresh,
        user: data.data.user,
    }));
}



/* Exports */
export {
    useUserActions,
    getUser,
    getAccessToken,
    getRefreshToken,
    setUserData
}
