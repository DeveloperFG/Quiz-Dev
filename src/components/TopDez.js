import React, { useState, useEffect } from 'react'
import firebase from '../firebaseConnection';

import { useContext } from "react";
import { QuizContext } from "../context/quiz";

import Load from '../Load/load';

import voltar from '../img/voltar.png'

import './TopDez.css'



const TopDez = () => {


    const [quizState, dispatch] = useContext(QuizContext);

    const [Loading, setLoading] = useState(false)

    const [usuarios, setUsuarios] = useState([]);

    // adicionando posicão ao ranking
    let [cont, setCont] = useState(1);

    // Identificando a categoria para mostrar os dados
    let newCategoria = quizState.categoria


    // fazendo o filtro para categoria desejada
    let listRank = usuarios.filter(item => item.categoria === newCategoria)



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

                    let sortPoints = listaUser.sort((a, b) => {
                        return a?.pontos >= b?.pontos ? -1 : 1;
                    });

                    let sortUsers = sortPoints.sort((a, b) => {
                        if (a?.pontos == b?.pontos) {
                            return a?.minuto <= b?.minuto ? -1 : 1;
                        }
                    })

                    let sortFinal = sortUsers.sort((a, b) => {
                        if (a.pontos == b.pontos && a?.minuto == b?.minuto) {
                            return a?.segundo <= b?.segundo ? -1 : 1;
                        }

                    })


                    setUsuarios(sortFinal)

                })
                .catch(() => {
                    console.log('Erro ao buscar no Banco!!!')
                    console.log('DEU ALGUM ERRO ')
                })

        }

        Load()

    }, [])





    return (
        <div className='containerTopDez'>
            <h2>RANKING: {quizState.categoria}</h2>
            {usuarios.length === 0 && (
                <Load />
            )}
            {listRank.map((item, index) => {
                return (
                    <div key={index} className='topDez'>
                        <div className='filtro1'>
                            <h3>{cont++}-</h3>
                            <p className={cont < 12 ? 'tops' : cont < 22 ? 'medio' : 'abaixo'}>{item.nome}</p>
                        </div>

                        <div className='filtro2'>
                            <small className='pontos'>{item.pontos} pts</small>
                            <small className='minutos'>{item.minuto}m</small>
                            <small className='segundos'>{item.segundo}s</small>
                        </div>


                    </div>
                )
            })}

            <div>
                {usuarios != '' &&
                    <div>
                        <img className="imgReturn" onClick={() => dispatch({ type: "Ranking" })} src={voltar} />
                    </div>
                }
            </div>

        </div>
    )
}

export default TopDez



// let newRank = listRank.sort(function (a, b) {
//     if (a.pontos >= b.pontos && a.segundo <= b.segundo && a.minuto <= b.minuto)
//         return -1

// })