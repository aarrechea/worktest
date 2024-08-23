// Imports
import React, { useRef, useState } from "react";
import { getUser } from "../hooks/actions";
import { useUserActions } from "../hooks/actions";
import "./css/navBar.css";
import { useNavigate } from "react-router-dom";
import GeneralButton from "../general/GeneralButton";



// Navigation bar
const NavigationBar = () => {    
    // First bar that hide in scroll
    const GeneralBar = () => {            
        return (
            <div id="background_menu">
                <div id="bar_menu">
                    <h3>Company Assessment</h3>
    
                    <div id="user_identification">
                        { getUser()
                            ?
                                <>
                                    <h6 style={{color:'grey'}}>User:<span>{getUser().email}</span></h6>                                
                                </>
                            :
                                <>
                                    <h6 style={{color:'gray'}}>User</h6>
                                    <h4>Anonymous</h4>
                                </>
                        }
                    </div>                
                </div>
            </div>
        )        
    }


    const ButtonsBar = () => {
        /* Constants */    
        const userActions = useUserActions();
        const navigate = useNavigate();


        
        return (
            <>
                <div id="div-main">
                    <div className="navbar" style={{padding:0}}>
                        
                        <GeneralButton
                            onClick={() => navigate('/company')}                            
                            children="Companies"
                            value="Companies"
                            dataPage='/company'
                            className='navBarButtons'
                        />
                        
                        <GeneralButton
                            children="Evaluations"
                            onClick={() => navigate("/")}
                            value="Evaluations"
                            dataPage='/'
                            className='navBarButtons'
                        />
                                                
                        
                        <GeneralButton
                            onClick={() => userActions.logout()}                         
                            children="Logout"
                            value='Logout'                            
                        />
                    </div>
                </div>        
            </>
        )
    }
    


    return (
        <>
            <GeneralBar/>
            <ButtonsBar/>            
        </>    
    );
}



// Export
export default NavigationBar;


