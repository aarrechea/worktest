// Import
import React from "react";
import "./css/evaluationAssess.css";
import GeneralButton from "../general/GeneralButton";
import axiosService from "../../helpers/axios";



// Assessment component
const EvaluationAssessment = (props) => {    
    const {style, setStyle, dataToAssess, saveDisabled, setSaveDisabled, title, setTitle,
        setLastScoreSaved, lastScoreSaved, styleButton, styleButtonClose, setStyleButtonClose,
        titleStyle, setTitleStyle, setRefreshList} = props;

    
    // To put the score
    function fcnPutScore() {
        document.querySelectorAll('.evaAssess').forEach(function(item) {
            if(parseInt(item.value) === parseInt(dataToAssess.score)) {                
                item.checked = true;
            }
        });
    }


    // Executing the function to put the score
    fcnPutScore();


    /* Handle input radio change */
    function handleRadioChange(e) {
        setSaveDisabled('');
        dataToAssess.score = e.target.value;
    };


    // Double check to close the form
    function handleClose() {
        // if is red is because a click to leave was already made
        if (titleStyle.color === 'red') {
            setStyle({visibility:'hidden', opacity:'0'});
        
        } else {
            // if not red and changes were made
            if(saveDisabled === '') {
                setTitle('Changes will not be saved - Click close again to leave');
                setStyleButtonClose(prev => {
                    return {
                        ...prev, 
                        color:'red'
                    }
                })
                setTitleStyle({color:'red'});
    
            } else {
                setStyle({visibility:'hidden', opacity:'0'});
            }
        }   
    };


    // To save the evaluation
    function handleSaveEvaluation() {
        const dataScore = parseInt(dataToAssess.score);

        if (dataScore !== lastScoreSaved && dataScore > 0) {
            setLastScoreSaved(dataScore);

            const jsonData = {'score':dataScore, 'company':dataToAssess.company.id};

            axiosService
                .patch(`/evaluation/${dataToAssess.idEva}/`, jsonData)
                .then(res => res.data)
                .then((res) => {                    
                    setStyleButtonClose(prev => {
                        return {
                            ...prev, 
                            color:'black'
                        }
                    });
                    setTitleStyle({color:'black'});
                    setSaveDisabled('disabled');
                    setLastScoreSaved(dataScore);
                    setRefreshList(true);

                    setTitle('Score saved');
                    setTitleStyle({color:'green'})

                    setTimeout(() => {
                        setTitle('Company assessment');    
                        setTitleStyle({color:'black'})
                    }, 2500);                    
                })
                .catch(e => {
                    console.log("Error saving the score - Error: ", e);
                })


        }
    };



    // Return Evaluation Assessment
    return (
        <div style={style} id="divEvaluationAssess">
            <div id="divEvaluationAssessMain">
                <div id="divEvaluationAssessTitle">
                    <h2 style={titleStyle}>{title}</h2>
                </div>

                <div id="divEvaluationAssessLabels">
                    <label>
                        <span>Company name: &nbsp; &nbsp;</span>
                        {dataToAssess?.company?.name}
                    </label>

                    <label>
                        <span>Evaluation creator: &nbsp; &nbsp;</span>
                        {dataToAssess?.user?.email} - {dataToAssess?.user?.full_name}
                    </label>
                </div>

                <div id="divEvaluationAssessRadios">
                    <label htmlFor="inputZero">0</label>
                    <label htmlFor="inputOne">1</label>
                    <label htmlFor="inputTwo">2</label>
                    <label htmlFor="inputThree">3</label>
                    <label htmlFor="inputFour">4</label>
                    <label htmlFor="inputFive">5</label>

                    <input onChange={(e) => handleRadioChange(e)}
                        value={0} type="radio" name="evaAssess" className="evaAssess" id="inputZero" />                    
                    <input onChange={(e) => handleRadioChange(e)}
                        value={1} type="radio" name="evaAssess" className="evaAssess" id="inputOne" />                    
                    <input onChange={(e) => handleRadioChange(e)}
                        value={2} type="radio" name="evaAssess" className="evaAssess" id="inputTwo" />                    
                    <input onChange={(e) => handleRadioChange(e)}
                        value={3} type="radio" name="evaAssess" className="evaAssess" id="inputThree" />                    
                    <input onChange={(e) => handleRadioChange(e)}
                        value={4} type="radio" name="evaAssess" className="evaAssess" id="inputFour" />                    
                    <input onChange={(e) => handleRadioChange(e)}
                        value={5} type="radio" name="evaAssess" className="evaAssess" id="inputFive" />
                </div>
                
                <div id="divEvaluationAssessButtons">
                    <GeneralButton 
                        children={'Close'}
                        onClick={handleClose}
                        style={styleButtonClose}
                    />

                    <GeneralButton
                        children={'Save'}
                        style={styleButton}
                        disabled={saveDisabled}
                        onClick={handleSaveEvaluation}
                    />
                </div>                
            </div>            
        </div>
    )
};



// Export
export default EvaluationAssessment;


