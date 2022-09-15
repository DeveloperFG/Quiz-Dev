import { useContext } from "react";

import { QuizContext } from "../context/quiz";

import Quiz from "../img/pessoa.svg";
import Pergunta from "../img/pergunta.png";


import "./PickCategory.css";

const PickCategory = () => {
    const [quizState, dispatch] = useContext(QuizContext);


    function chooseCategoryAndReorderQuestions(category) {
        dispatch({ type: "START_GAME", payload: category });


        dispatch({ type: "REORDER_QUESTIONS" });
    }

    return (
        <div>
            <h2>Escolha uma categoria</h2>

            <div id="category">

                {quizState.questions.map((question) => (
                    <div id='categoryButtons'>

                        <button className="category"
                            onClick={() => chooseCategoryAndReorderQuestions(question.category)}
                            key={question.category}>
                            <div id='divImg'>
                                <div className="iimm">
                                    <img className="imgCategory" src={question.img} />
                                </div>

                                <div>
                                    {question.category}
                                </div>

                            </div>

                        </button>
                    </div>

                ))}
                <div>
                    {/* <img src={Pergunta} alt="Início do Quiz" />
                    <img src={Quiz} alt="Início do Quiz" /> */}
                </div>

            </div>
        </div>
    );
};

export default PickCategory;
