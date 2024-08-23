// Imports
import React, { useEffect, useState } from "react";
import "./css/evaluationPage.css";
import NavigationBar from "../navBar/NavBar";
import EvaluationList from "./EvaluationList";
import GeneralButton from "../general/GeneralButton";
import axiosService from "../../helpers/axios";
import { getUser } from "../hooks/actions";
import GeneralDelete from "../general/GeneralDelete";
import EvaluationAssessment from "./EvaluationAssess";



// Evaluation component
const EvaluationPage = () => {    
    const [companyList, setCompanyList] = useState();
    const [style, setStyle] = useState();
    const [message, setMessage] = useState('Choose a company to create the evaluation')
    const [generalTitle, setGeneralTitle] = useState("Evaluations Menu");
    const [generalTitleStyle, setGeneralTitleStyle] = useState({});
    const [refreshList, setRefreshList] = useState(false);

    // States to pass to general delete component
    const [object, setObject] = useState({});
    const [showDelete, setShowDelete] = useState({visibility:'hidden', opacity:'0'});
    const [showMessage, setShowMessage] = useState({height:'0rem', fontSize:'0rem'});

    // For evaluation assess
    const [assessStyle, setAssessStyle] = useState({visibility:'hidden', opacity:'0'});
    const [dataToAssess, setDataToAssess] = useState({});
    const [saveDisabled, setSaveDisabled] = useState('disabled');
    const [lastScoreSaved, setLastScoreSaved] = useState();
    const styleButton = {height:'3rem'};
    const [styleButtonClose, setStyleButtonClose] = useState({...styleButton});
    const [title, setTitle] = useState('Company assessment');
    const [titleStyle, setTitleStyle] = useState({color:'black'});

    
    // Companies list
    useEffect(() => {        
        axiosService
            .get(`/company`)
            .then(res => res.data)
            .then((data) => {
                setCompanyList(() => [...data]);
            })        
    }, []);
    
    
    // Create evaluation component
    const CreateEvaluation = () => {
        const user = getUser();


        /* Creating the evaluation */
        function handleCreateClick() {
            let companyId;
            
            document.querySelectorAll('.companyRadio').forEach(function(item) {
                if (item.checked) {
                    companyId = item.id;
                }
            });
            
            if (!companyId) {
                setStyle({color:'red'})
                setMessage('You have to choose a company to create the evaluation');

                setTimeout(() => {
                    setStyle({color:'black'})
                    setMessage('Choose a company to create the evaluation');
                }, 3000);

            } else {
                const data = {
                    'company':companyId,
                    'user':user.id
                }

                axiosService
                    .post("/evaluation/", data)
                    .then(res => {                        
                        window.scrollTo(0, 0);
                        setGeneralTitle('The evaluation was succesfully created');
                        setGeneralTitleStyle({color:'green'});
                        setRefreshList(true);

                        setTimeout(() => {
                            setGeneralTitle('Evaluations Menu');
                            setGeneralTitleStyle({color:'black'});
                        }, 3000);
                    })
            }
        }


        // Return create evaluation
        return (
            <div id="divCreateEvaluation">
                <div id="divCreateEvaluationTitle">
                    <h3 style={style}>{message}</h3>

                    <GeneralButton
                        children='Create' 
                        style={{height:'3rem'}}
                        onClick={handleCreateClick}
                    />
                </div>
                
                <div id="divCreateEvaluationRadio">
                    {companyList?.length === 0 
                        ?
                            <label id="lblCompaniesListCard">The list is empty</label> 
                        :                
                            companyList?.map((element, index) => (
                                <ul>
                                    <li key={index} value={element.id}>
                                        <label>
                                            <span className="spanCompanyName">Company name</span>
                                            {element.name}
                                            <input 
                                                type="radio" 
                                                name="companyRadio" 
                                                className="companyRadio"
                                                id={element.id}                                            
                                            />
                                        </label>                                        
                                    </li>
                                </ul>
                            ))
                    }
                </div>                
            </div>
        )
    }


    // If the evaluation was deleted, the height should be 3rem
    if (showMessage.height === '3rem') {        
        setTimeout(() => {
            setShowMessage({height:'0rem', fontSize:'0rem'})
        }, 3000);
    }



    // Return evaluation page
    return (
        <div id="divEvaluationPage">
            <GeneralDelete
                object={object}
                showDelete={showDelete}
                setShowDelete={setShowDelete}                
                setShowMessage={setShowMessage}
                path={'evaluation'}
                element={'evaluation'}
                setRefreshList={setRefreshList}
            />

            {/* Assessment modal component */}
            <EvaluationAssessment
                style={assessStyle}
                setStyle={setAssessStyle}
                dataToAssess={dataToAssess}
                saveDisabled={saveDisabled}
                setSaveDisabled={setSaveDisabled}
                setLastScoreSaved={setLastScoreSaved}
                styleButton={styleButton}
                styleButtonClose={styleButtonClose}
                setStyleButtonClose={setStyleButtonClose}
                title={title}
                setTitle={setTitle}
                titleStyle={titleStyle}
                setTitleStyle={setTitleStyle}
                setRefreshList={setRefreshList}
            />
            
            <div id="divEvaluationFirstBar">
                <h1 style={generalTitleStyle}>{generalTitle}</h1>
            </div>

            <div style={showMessage} id="divEvaluationMessage">
                <label>The evaluation was successfully deleted</label>
            </div>

            <NavigationBar/>

            <EvaluationList
                refreshList={refreshList}
                setRefreshList={setRefreshList}
                setObject={setObject}
                setShowDelete={setShowDelete}
                setAssessStyle={setAssessStyle}
                setDataToAssess={setDataToAssess}
                setSaveDisabled={setSaveDisabled}
                lastScoreSaved={lastScoreSaved}
                setLastScoreSaved={setLastScoreSaved}
                setStyleButtonClose={setStyleButtonClose}
                setTitle={setTitle}
                setTitleStyle={setTitleStyle}
            />

            <p className="evaSeparatorParagraph"/>

            <CreateEvaluation/>

            <p className="evaSeparatorParagraph"/>
        </div>
    )
};



// Export
export default EvaluationPage;

