// imports
import React from "react";
import axiosService from "../../helpers/axios";
import "./css/companyDelete.css";
import GeneralButton from "../general/GeneralButton";



// Delete component
const DeleteCompany = ({companyObject, showDelete, setShowDelete, setShowMessage}) => {    
    function handleDelete() {
        axiosService
            .delete(`/company/${companyObject.id}/`)
            .then(res => {                
                console.log("Enter then");
                setShowDelete({visibility:'hidden', opacity:'0'})
                setShowMessage({height:'3rem', fontSize:'1.4rem'});
            })
            .catch(e => {
                console.log("Error deleting the company ", e);
            })
    }


    return (
        <div style={showDelete} id="divDeleteCompany">
            <div id="divDeleteCompanyMain">
                <label htmlFor="">Are you sure you want to delete the company {companyObject.name}?</label>

                <div>
                    <GeneralButton
                        children='Cancel'
                        onClick={() => setShowDelete({visibility:'hidden', opacity:'0'})}
                    />

                    <GeneralButton
                        children='Delete'
                        onClick={handleDelete}
                    />
                </div>
            </div>
        </div>        
    )
};



// Export
export default DeleteCompany;