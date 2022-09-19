import { useContext, useEffect } from "react";
import { QuizContext } from "./context/quiz";

import Welcome from "./components/Welcome";
import Question from "./components/Question";
import GameOver from "./components/GameOver";
import PickCategory from "./components/PickCategory";
import Ranking from "./components/Ranking";
import TopDez from "./components/TopDez";

import foguete from './img/foguete.png'

import "./App.css";


function App() {
  const [quizState, dispatch] = useContext(QuizContext);

  return (
    <div>
      {quizState.gameStage === "Start" &&
        <div className="divRank">
          <div className="divBtnRank" >
            <button id="rank"> Ranking</button>
          </div>
          <div>
            <img onClick={() => dispatch({ type: "Ranking" })} src={foguete} />
          </div>

        </div>
      }

      <div className="App">
        <h1>Quiz de Programação</h1>
        {quizState.gameStage === "Start" && <Welcome />}
        {quizState.gameStage === "Ranking" && <Ranking />}
        {quizState.gameStage === "TopDez" && <TopDez />}
        {quizState.gameStage === "Category" && <PickCategory />}
        {quizState.gameStage === "Playing" && <Question />}
        {quizState.gameStage === "End" && <GameOver />}
      </div>
    </div>
  );
}

export default App;
