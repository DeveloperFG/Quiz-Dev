
import { useContext } from "react";
import { QuizContext } from "../context/quiz";

import "./Bemvindo.css";


import Quiz from "../img/quiz.png";

const Bemvindo = () => {
    const [quizState, dispatch] = useContext(QuizContext);


    console.log(quizState.nome)

    return (
        <div id="welcome">
            <h2>Seja bem-vindo: <small> {quizState.nome} </small> </h2>
            <button className="btnGeral" onClick={() => dispatch({ type: "Niveis" })}>
                Iniciar
            </button>
            <img src={Quiz} alt="Início do Quiz" width='400px' />
            <footer>Todos os direitos reservados <a href="https://www.instagram.com/f.fsolutions/" target='#'>@fsolutions</a></footer>
        </div>
    );
};

export default Bemvindo;
