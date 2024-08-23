// Imports
import React, {useEffect, useState} from "react";
import "./css/evaluationList.css";
import axiosService from "../../helpers/axios";



// Evaluation list component
const EvaluationList = (props) => {

    const {refreshList, setRefreshList, setObject, setShowDelete, setAssessStyle, setTitle, 
        setDataToAssess, setSaveDisabled, setLastScoreSaved, setStyleButtonClose, setTitleStyle} = props;

    /* States */
    const [evaluationList, setEvaluationList] = useState([]);        
        

    /* Function to get the evaluation list */
    function fcnGetEvaluationList() {
        axiosService
            .get(`/evaluation`)
            .then(res => res.data)
            .then((data) => {
                setEvaluationList(() => [...data]);
            })
    }
    

    /* List of evaluations */
    useEffect(() => {
        fcnGetEvaluationList();
    }, []);
    

    // if refreshList is ture, the evaluation was deleted, so, the list has to be refreshed
    if (refreshList) {
        fcnGetEvaluationList();
        setRefreshList(false);
    }


    // Evaluation card to loop over with the evaluations already created
    const EvaluationCard = ({company, id, user, score}) => {         
        function handleDelete() {
            setObject({'id':id, 'name':company.name});
            setShowDelete({visibility:'visible', opacity:'1'})
        }


        // To evaluate the company
        function handleClickEvaluate() {
            setDataToAssess({
                company:company,
                user:user,
                idEva:id,
                score:score
            });
            
            setAssessStyle({visibility:'visible', opacity:'1'});
            setSaveDisabled('disabled')
            setLastScoreSaved(score);
            setStyleButtonClose({height:'3rem'});
            setTitle('Company assessment');
            setTitleStyle({color:'black'});
        }
    
    
    
        // Return evaluation card
        return (
            <div id="EvaluationCard">
                <div id="divEvaluationCard">
                    <div id="divEvaluationCardLabels">
                        <div id="divEvaluationCardLabelsName">
                            <label className="label">Company<br/>name</label>
                            <textarea disabled className="name toBold" value={company.name}></textarea>
                        </div>
                        
                        <div id="divEvaluationCardLabelsUser">
                            <label className="label">User creator</label>
                            <label className="label toBold">{user.full_name}</label>

                            <label className="label">Score</label>
                            <label className="label toBold">{score}</label>
                        </div>
                    </div>
    
                    <div id="divEvaluationCardButtons">
                        {score === 0
                            ?
                            <>
                                <button onClick={handleClickEvaluate}>Evaluate</button>
                                <button onClick={() => handleDelete()}>Delete</button>
                            </>
                            :
                            <>
                                <button disabled>Evaluate</button>
                                <button disabled>Delete</button>
                            </>                        
                        }
                    </div>                
                </div>
            </div>
        )

    } // end evaluation card ----



    // Return Evaluation list
    return (
        <div id="divEvaluationList">
            <div id="evaluationListCard">
                {evaluationList.length === 0 
                    ?
                        <label id="lblEvaluationListCard">The list is empty</label> 
                    :
            
                        evaluationList?.map((element, index) => {
                            return (
                                <EvaluationCard
                                    key={index}
                                    name={element.company.name}
                                    company={element.company}
                                    user={element.user}
                                    score={element.score}
                                    id={element.id}                                    
                                />
                            )
                        })
                }
            </div>  
        </div>
    )
}



// Export
export default EvaluationList;


