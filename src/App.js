import { useContext, useEffect } from "react";
import { QuizContext } from "./context/quiz";

import Bemvindo from "./components/Bemvindo";
import Question from "./components/Question";
import FimDoJogo from "./components/FimDoJogo.js";
import Categorias from "./components/Categorias";
import Ranking from "./components/Ranking";
import TopDez from "./components/TopDez";
import Nivel from "./components/Nivel";

import foguete from './img/foguete.png'
import "./App.css";




function App() {
  const [quizState, dispatch] = useContext(QuizContext);



  return (
    <div>
      {quizState.gameStage === "Start" &&
        <div className="divRank">
          <div>
            <img className="imgVoltar" onClick={() => dispatch({ type: "HOME" })} />
          </div>

          <div>
            <div className="divFoguete">
              <img onClick={() => dispatch({ type: "Ranking" })} src={foguete} />
            </div>
            <div className="divBtnRank" >
              <button id="rank"> Ranking</button>
            </div>
          </div>
        </div>
      }

      <div className="App">
        <h1>Quiz de Programação</h1>
        {quizState.gameStage === "Start" && <Bemvindo />}
        {quizState.gameStage === "Ranking" && <Ranking />}
        {quizState.gameStage === "TopDez" && <TopDez />}
        {quizState.gameStage === "Category" && <Categorias />}
        {quizState.gameStage === "Playing" && <Question />}
        {quizState.gameStage === "End" && <FimDoJogo />}
        {quizState.gameStage === "Niveis" && <Nivel />}
      </div>
    </div>
  );
}

export default App;
