import React, { useState, useEffect } from 'react'
import firebase from '../firebaseConnection';
import { useContext } from "react";
import { QuizContext } from "../context/quiz";

import './TopDez.css'

const TopDez = () => {


    const [quizState, dispatch] = useContext(QuizContext);

    const [usuarios, setUsuarios] = useState([]);

    // adicionando posicão ao ranking
    let [cont, setCont] = useState(1);

    // Identificando a categoria para mostrar os dados
    let newCategoria = quizState.categoria

    useEffect(() => {

        async function Load() {
            await firebase.firestore().collection('users')
                .get()
                .then((snapshot) => {
                    let listaUser = [];

                    snapshot.forEach((doc) => {
                        listaUser.push({
                            // id: doc.id,
                            categoria: doc.data().categoria,
                            nome: doc.data().nome,
                            pontos: doc.data().pontuacao,
                            minuto: doc.data().minutos,
                            segundo: doc.data().segundos
                        })

                    })
                    setUsuarios(listaUser)

                })
                .catch(() => {
                    console.log('Erro ao buscar no Banco!!!')
                    console.log('DEU ALGUM ERRO ')
                })

        }

        Load()

    }, [])


    // fazendo o filtro para categoria desejada
    let listRank = usuarios.filter(item => item.categoria === newCategoria)

    // funcão que faz a classificação
    let newRank = listRank.sort(function (a, b) {
        if (a.pontos > b.pontos) {
            return -1;
        }
        if (a.pontos < b.pontos) {
            return 1;
        }
        if (a.pontos === b.pontos) {
            if (a.minuto < b.minuto) {
                return -1;
            }

            if (a.minuto > b.minuto) {
                return 1;
            }
            if (a.minuto === b.minuto) {
                if (a.segundos < b.segundos) {
                    return -1;
                }
                if (a.segundos > b.segundos) {
                    return 1;
                }
                if (a.segundos === b.segundos) {
                    return 0;
                }
            }

        }

    })



    return (
        <div className='containerTopDez'>
            <h2>RANKING: {quizState.categoria}</h2>
            {newRank.map((item, index) => {
                return (
                    <div key={index} className='topDez'>
                        <h3>{cont++}-</h3>
                        <p>{item.nome}</p>
                        <small className='pontos'>{item.pontos} pts</small>
                        <small className='minutos'>{item.minuto}m</small>
                        <small className='segundos'>{item.segundo}s</small>
                    </div>
                )
            })}
        </div>
    )
}

export default TopDez



// let newRank = listRank.sort(function (a, b) {
//     if (a.pontos >= b.pontos && a.segundo <= b.segundo && a.minuto <= b.minuto)
//         return -1

// })