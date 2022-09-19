import React, { useContext, useState, useEffect } from "react";

import { QuizContext } from "../context/quiz";

import Cronometro from './../img/cronometro.png'

import Option from "./Option";

import "./Question.css";


const Question = () => {

    const [minutes, setMinutes] = useState(7);
    const [seconds, setSeconds] = useState(0);


    const [quizState, dispatch] = useContext(QuizContext);
    const currentQuestion = quizState.questions[quizState.currentQuestion];



    useEffect(() => {
        let interval = setInterval(() => {
            clearInterval(interval)

            if (seconds === 0) {
                if (minutes !== 0) {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                } else {

                }

            } else {
                setSeconds(seconds - 1);
            }

        }, 1000);
    }, [seconds]);



    const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

    function Gameover() {
        if (seconds === 0 && minutes == 0) {
            dispatch({
                type: "FINISHI TIMER",
            });
        }

    };

    Gameover();


    const onSelectOption = (option) => {
        dispatch({
            type: "CHECK_ANSWER",
            payload: { answer: currentQuestion.answer, option },
        });
    };


    quizState.newMinutos = timerMinutes;
    quizState.newSegundos = timerSeconds;


    return (
        <div id="question">
            <div className="divCronometro">
                <small className={timerMinutes >= 1 ? "timer" : timerSeconds < 10 ? "timerColorRed" : "timerColorYellow"}>{timerMinutes}:{timerSeconds}</small>
                <img className="cronometro" src={Cronometro} />
            </div>

            <p>
                Pergunta {quizState.currentQuestion + 1} de {quizState.questions.length}
            </p>
            <h2>{currentQuestion.question}</h2>
            <div id="options-container">
                {currentQuestion.options.map((option) => (
                    <Option
                        option={option}
                        key={option}
                        answer={currentQuestion.answer}
                        selectOption={() => onSelectOption(option)}
                        hide={quizState.optionToHide === option ? "hide" : null}
                    />
                ))}
            </div>
            {/* {!quizState.answerSelected && !quizState.help && (
                <>
                    {currentQuestion.tip && (
                        <button onClick={() => dispatch({ type: "SHOW_TIP" })}>Dica</button>
                    )}
                    <button onClick={() => dispatch({ type: "REMOVE_OPTION" })}>
                        Excluir uma
                    </button>
                </>
            )} */}
            {
                !quizState.answerSelected && quizState.help === "tip" && (
                    <p>{currentQuestion.tip}</p>
                )
            }
            {
                quizState.answerSelected && (
                    <button className="btnGeral" onClick={() => dispatch({ type: "CHANGE_QUESTION" })}>
                        Proxima
                    </button>
                )
            }
            <div>
                <small> Participante: {quizState.nome} </small>
            </div>
        </div >
    );
};

export default Question;
