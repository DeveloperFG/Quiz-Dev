import React from 'react'
import firebase from '../firebaseConnection';
import { useContext } from 'react'
import { QuizContext } from '../context/quiz'

import questions from "../data/questoes";

import '../components/FimDoJogo.css'

import Alto from '../img/alto.png'


const FimDoJogo = () => {


    const [quizState, dispatch] = useContext(QuizContext)

    // convertendo os numero e subtraindo para saber o tempo
    let timeInicial = 7

    let convertMinutos = parseInt((timeInicial - quizState.newMinutos) - 1)

    let convertSegundos = parseInt(59 - quizState.newSegundos)

    // convertendo os numeros em string
    // let timerDeQuiz = convertMinutos.toString() + ':' + convertSegundos.toString()

    console.log(convertMinutos, convertSegundos)


    cadastrarUser();

    async function cadastrarUser() {

        await firebase.firestore().collection('users')
            .doc()
            .set({
                nome: quizState.nome,
                categoria: quizState.categoria,
                pontuacao: quizState.score,
                minutos: convertMinutos,
                segundos: convertSegundos
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
                    {quizState.score == 7 ? ` Você estar na média ${quizState.nome} continue os estudos!` : quizState.score == 8 || quizState.score == 9 ? `Muito bem ${quizState.nome} você acertou mais de 70%! continue assim!` : quizState.score == 10 ? `Parabéns ${quizState.nome} você acertou 100% das questões! Mas não se deixe levar, continue estudando e seja humilde sempre.` : 'Você acertou menos de 70%, mas não desanime! continue firme na sua jornada! '}
                </>
            </div>
            <div className='divSeuTime'>
                <h3 className='seuTime'>Seu tempo foi - {convertMinutos}m : {convertSegundos}s </h3>
            </div>
            <div className='final'>
                <img className='imgFinal' src={Alto} alt="Fim do Quiz" />
                <button className='btnGeral' onClick={() => dispatch({ type: "NEW_GAME" })}>Reiniciar</button>
            </div>

        </div>
    )
}

export default FimDoJogo;
