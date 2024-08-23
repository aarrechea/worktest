// imports
import React from "react";
import axiosService from "../../helpers/axios";
import "../general/css/generalDelete.css";
import GeneralButton from "../general/GeneralButton";



// Delete component
const GeneralDelete = (props) => {

    const {object, showDelete, setShowDelete, setShowMessage, path, element, setRefreshList} = props;

    function handleDelete() {
        axiosService
            .delete(`/${path}/${object.id}/`)
            .then(res => {                                
                setShowDelete({visibility:'hidden', opacity:'0'})
                setShowMessage({height:'3rem', fontSize:'1.4rem'});
                setRefreshList(true);
            })
            .catch(e => {
                console.log("Error deleting the ", element, " - Error: ", e);
            })
    }


    return (
        <div style={showDelete} id="divGeneralDelete">
            <div id="divGeneralDeleteMain">
                <label>Are you sure you want to delete the {element} {object.name}?</label>

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
export default GeneralDelete;