// Imports
import React, { useState } from "react";
import NavigationBar from "../navBar/NavBar";
import CompaniesList from "./CompaniesList";
import GeneralButton from "../general/GeneralButton";
import { useNavigate } from "react-router-dom";
import "./css/companiesPage.css";



// Company component
const Company = () => {
    const navigate = useNavigate();
    const [refreshList, setRefreshList] = useState(false);
    
    return (
        <div>
            <div id="divCompaniesFirstBar">
                <h1>Companies Menu</h1>

                <GeneralButton
                    children='Create'
                    onClick={() => navigate("/create-company", {state:{mode:'Create'}})}
                />
            </div>

            <NavigationBar/>
            <CompaniesList
                refreshList={refreshList}
                setRefreshList={setRefreshList}
            />
        </div>
    )
}



// Export
export default Company;


