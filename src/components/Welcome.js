
import { useContext } from "react";
import { QuizContext } from "../context/quiz";

import "./Welcome.css";


import Quiz from "../img/quiz.png";

const Welcome = () => {
    const [quizState, dispatch] = useContext(QuizContext);



    return (
        <div id="welcome">
            <h2>Seja bem-vindo : <small> {quizState.nome} </small> </h2>
            <button className="btnGeral" onClick={() => dispatch({ type: "CHANGE_STAGE" })}>
                Iniciar
            </button>
            <img src={Quiz} alt="Início do Quiz" width='600px' />
        </div>
    );
};

export default Welcome;
