// Imports
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axiosService from "../../helpers/axios";
import "./css/companiesList.css";
import GeneralDelete from "../general/GeneralDelete";



// Companies list
const CompaniesList = ({refreshList, setRefreshList}) => {
    /* States */
    const [companiesList, setCompaniesList] = useState([]);        
    const [companyObject, setCompanyObject] = useState({});
    const [showDelete, setShowDelete] = useState({visibility:'hidden', opacity:'0'});
    const [showMessage, setShowMessage] = useState({height:'0', fontSize:'0rem'}); // to show if the company was deleted    


    /* Function to get all companies */
    function fcnGetCompanies() {
        axiosService
            .get(`/company`)
            .then(res => res.data)
            .then((data) => {
                setCompaniesList(() => [...data]);
            })
    };

    /* List of companies */
    useEffect(() => {
        fcnGetCompanies();
    }, []);


    // If a company is deleted, I have to refresh the list
    if (refreshList) {
        fcnGetCompanies();
        setRefreshList(false);
    }


    // Company card to loop over with the companies already created
    const CompanyCard = ({name, id, evaMade}) => {      
        const navigate = useNavigate();
                    
    
        /* Edit the company */
        function handleClickEdit() {         
            navigate("/create-company", {state:{mode:'Edit', id:id}});
        }


        // Delete the company
        function handleDelete(id, name) {            
            setCompanyObject({'id':id, 'name':name});
            setShowDelete({visibility:'visible', opacity:'1'})
        }
    
    
    
        // Return company card
        return (
            <div id="companyCard">
                <div id="divCompanyCard">
                    <div id="divCompanyCardLabels">
                        <label className="label">Company<br/>name</label>
                        <textarea disabled className="name" value={name}></textarea>
                    </div>
    
                    <div id="divCompanyCardButtons">
                        {evaMade === 0 
                            ?
                            <>
                                <button onClick={handleClickEdit}>Edit</button>
                                <button onClick={() => handleDelete(id, name)}>Delete</button>
                            </>                             
                            :
                            <>
                                <button disabled>Edit</button>
                                <button disabled>Delete</button>
                            </> 
                        }
                    </div>                
                </div>
            </div>
        )
    }

    
    // If the company was deleted, the height should be 3rem
    if (showMessage.height === '3rem') {        
        setTimeout(() => {
            setShowMessage({height:'0rem', fontSize:'0rem'})            
        }, 3000);
    }


    // Return companies list
    return (
        <>            
            <GeneralDelete
                object={companyObject}
                showDelete={showDelete}
                setShowDelete={setShowDelete}                
                setShowMessage={setShowMessage}
                path={'company'}
                element={'company'}
                setRefreshList={setRefreshList}
            />

            <div style={showMessage} id="divCompaniesMessage">
                <label>The company was successfully deleted</label>
            </div>

            <div id="companiesListTitle">
                <label htmlFor="">Companies list</label>
            </div>
            
            <div id="companiesListCard">
                {companiesList.length === 0 
                    ?
                        <label id="lblCompaniesListCard">The list is empty</label> 
                    :
            
                        companiesList?.map((element, index) => {
                            return (
                                <CompanyCard 
                                    key={index} 
                                    name={element.name}                                
                                    id={element.id}
                                    evaMade={element.evaluations_made}
                                />
                            )
                        })
                }
            </div>
        </>
    )
};



// Export
export default CompaniesList


