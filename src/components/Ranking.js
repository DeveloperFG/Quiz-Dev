import React, { } from 'react'
import { useContext } from "react";
import { QuizContext } from "../context/quiz";



import voltar from '../img/voltar.png'
import trofeu from '../img/trofeu.png'


import './Ranking.css'

const Ranking = () => {


    const [quizState, dispatch] = useContext(QuizContext);


    function topDez(category) {
        dispatch({ type: "TopDez", payload: category });

    }

    return (
        <div>
            <div className='containerRank'>
                <div className='trofeu'>
                    <div>
                        <img src={trofeu} />
                    </div>
                </div>
                {quizState.questions.map((question, index) => {
                    return (
                        <div key={index} className='divCat'>
                            <button onClick={() => topDez(question.category)}  > {question.category} </button>
                        </div>
                    )
                })}

            </div>
            <div>
                {quizState.gameStage === 'Ranking' &&
                    <div>
                        <img className="imgVoltar" onClick={() => dispatch({ type: "HOME" })} src={voltar} />
                    </div>
                }
            </div>
        </div>

    )
}

export default Ranking



