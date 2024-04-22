// src/components/Ranking.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Container } from '@mui/material';
import axios from 'axios';

const Ranking = () => {

    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';
    
    const navigate = useNavigate();
   
    useEffect(() => {
      const user = localStorage.getItem('username');
      if (user === null) {
        navigate('/');
      }
      // eslint-disable-next-line 
    }, []);

    //accedo al usuario logeado
    const location = useLocation();
    const { username } = location.state || {};
    const { createdAt } = location.state || {};
    const [error, setError] = useState('');

    const [record, setRecord] = useState([]);
    const [ranking, setRanking] = useState([]);
    const [puntuacion, setPuntuacion] = useState(0);

    //data for the chart
    const [loading, setLoading] = useState(true);
  
    

    useEffect(() => {
      const getScoreForUser = async (userInDB) => {
        try {
          const response = await axios.post(`${apiEndpoint}/getGameRecord`, { userInDB });
          // Extract data from the response
          let { games } = response.data;
          setRecord(games);

          return games.correctAnswers;
        } catch (error) {
          setError(error.response.data.error);
        }
        
      }

      const getRanking = async () => {
        try {
          const response = await axios.post(`${apiEndpoint}/getAllUsers`, {});
          // Extract data from the response
         let { users } = response.data;
          setRanking(users);

          const rankingWithScores = await Promise.all(
            users.map(async (userInDB) => {
                const score = await getScoreForUser(userInDB);
                return { ...userInDB, score };
            })
          );
          // Sort users based on their scores (descending order)
          rankingWithScores.sort((a, b) => b.score - a.score);
          setRanking(rankingWithScores);
          setLoading(false);
        } catch (error) {
          setError(error.response.data.error);
        }
      }

      getRanking();

    }, []);
  
    return (
        <Container component="main" maxWidth="sm" sx={{ marginTop: 4 }}>
          <div style={{ padding: '4em', borderRadius: '15px', boxShadow: '0 0 50px #00a6bc', backgroundColor: 'rgba(255, 255, 255, 0.65)', zIndex: 1, marginTop: '2rem' }}>
            {/* Aquí renderizamos el ranking */}
            <h2>Ranking</h2>
            {loading ? (
                <div className='charging'>
                  <div className='ball one'></div>
                  <div className='ball two'></div>
                </div>
            ) : (
                <ol>
                    {ranking.map((user, index) => (
                        <li className="user-wrapper" key={index}>
                            {user.username}: {user.score}
                        </li>
                    ))}
                </ol>
            )}

            {/* Aquí renderizamos el registro de juego */}
            <h2>Registro de Juego</h2>
            {loading ? (
                <div className='charging'>
                  <div className='ball one'></div>
                  <div className='ball two'></div>
                </div>
            ) : (
                <ul>
                    {record.map((game, index) => (
                        <li key={index}>
                            Juego {index + 1}: {game.score}
                        </li>
                    ))}
                </ul>
            )}
        </div>
        </Container>
    );
  };
  
  export default Ranking;