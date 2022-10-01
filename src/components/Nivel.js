import React from 'react'


import { useContext } from "react";
import { QuizContext } from "../context/quiz";

import "./Nivel.css";

import voltar from '../img/voltar.png'
import goku from '../img/goku.png'
import goku1 from '../img/goku1.png'
import goku2 from '../img/goku2.png'

const Nivel = () => {

    const [quizState, dispatch] = useContext(QuizContext);

    return (
        <div className='ContainerNivel'>
            <small>Niveis em Desenvolvimento</small>
            <br></br>
            <button disabled={true} className="btnEasy" onClick={() => dispatch({ type: "CHANGE_STAGE" })}>
                <div className='divEasy'>
                    Easy<img src={goku} />
                </div>
            </button>
            <button className="btnMedium" onClick={() => dispatch({ type: "CHANGE_STAGE" })}>
                <div className='divEasy'>
                    Medium<img src={goku1} />
                </div>
            </button>
            <button disabled={true} className="btnHard" onClick={() => dispatch({ type: "CHANGE_STAGE" })}>
                <div className='divEasy'>
                    Hard<img src={goku2} />
                </div>
            </button>
            <div>
                <div>
                    <img className="imgVoltar" onClick={() => dispatch({ type: "HOME" })} src={voltar} />
                </div>
            </div>
        </div>
    )
}

export default Nivel