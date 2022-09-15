import React from 'react'
import firebase from '../firebaseConnection'
import { useContext } from 'react'
import { QuizContext } from '../context/quiz'

import questions from "../data/questions_complete";

import '../components/GameOver.css'

import Fim from '../img/fim.png'
import Alto from '../img/alto.png'


const GameOver = () => {


    const [quizState, dispatch] = useContext(QuizContext)


    cadastrarUser();

    async function cadastrarUser() {

        await firebase.firestore().collection('users')
            .doc()
            .set({
                nome: quizState.nome,
                categoria: quizState.categoria,
                pontuacao: quizState.score,
            })

            .then(() => {
                console.log('Dados salvos!')
            })
            .catch((error) => {
                console.log('Erro ao salvar!')
            })

    }

    return (
        <div id='gameover'>
            <h1>Fim de Jogo!</h1>
            <h4> CATEGORIA : {quizState.categoria} </h4> <br></br>
            <p>Pontuação: {quizState.score} pontos </p>
            <p>Voce acertou {quizState.score} de {quizState.questions.length} perguntas</p>
            <div>
                <>
                    {quizState.score == 5 || quizState.score == 6 ? `Muito bem ${quizState.nome} você acertou mais de 70%! continue assim!` : quizState.score == 7 ? `Parabéns ${quizState.nome} você acertou 100% das questões! Mas não se deixe levar, continue estudando e seja humilde sempre.` : 'Você acertou menos de 70%, mas não desanime! continue firme na sua jornada! '}
                </>
            </div>
            <div className='final'>
                <img className='imgFinal' src={Alto} alt="Fim do Quiz" />
                <button className='btnGeral' onClick={() => dispatch({ type: "NEW_GAME" })}>Reiniciar</button>
            </div>

        </div>
    )
}

export default GameOver;
