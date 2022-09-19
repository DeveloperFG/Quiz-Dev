import React, { } from 'react'
import { useContext } from "react";
import { QuizContext } from "../context/quiz";

import voltar from '../img/voltar.png'

import './Ranking.css'

const Ranking = () => {


    const [quizState, dispatch] = useContext(QuizContext);




    function topDez(category) {
        dispatch({ type: "TopDez", payload: category });

    }



    return (
        <div className='containerRank'>
            <p> Top 10 Rank das Categorias </p>

            {quizState.questions.map((question, index) => {
                return (
                    <div key={index} className='divCat'>
                        <button onClick={() => topDez(question.category)}  > {question.category} </button>
                    </div>
                )

            })}
            <img onClick={() => dispatch({ type: "HOME" })} src={voltar} />
        </div>
    )
}

export default Ranking



