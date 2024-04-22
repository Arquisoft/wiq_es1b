// src/components/Ranking.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Container } from '@mui/material';
import axios from 'axios';
import './stylesheets/ranking.css';

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
      const getScoreForUser = async (username) => {
        try {
          console.log(username);
          const response = await axios.post(`${apiEndpoint}/getGameRecord`, { username });
          // Extract data from the response
          let { games } = response.data;
          //console.log(games);
          setRecord(games);
          let correctAnswers = 0;
          games.forEach((game, index) => {
            let correctCount = game.correctAnswers;
            correctAnswers += correctCount;
          });

          return correctAnswers;
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
          console.log(users);

          const rankingWithScores = [];
          for (const userInDB of users) {
            let userInDBName = userInDB.username;
            const score = await getScoreForUser(userInDBName);
            rankingWithScores.push({ ...userInDB, score });
          }
          /*
          const rankingWithScores = await Promise.all(
            users.map(async (userInDB) => {
                console.log(userInDB.username);
                let userInDBName = userInDB.username;
                const score = await getScoreForUser(userInDBName);
                return { ...userInDB, score };
            })
          );*/
          // Sort users based on their scores (descending order)
          rankingWithScores.sort((a, b) => b.score - a.score);
          setRanking(rankingWithScores);
          setLoading(false);
          //console.log(rankingWithScores);
          //console.log(ranking);
        } catch (error) {
          setError(error.response.data.error);
        }
      }

      getRanking();

    }, []);
    
    return (
        <Container component="main" maxWidth="sm" sx={{ marginTop: 4 }}>
          <div style={{ marginTop: '2rem' }}>
            {/* Aquí renderizamos el ranking */}
            <h2>Ranking</h2>
            {loading ? (
                <div className='charging'>
                  <div className='ball one'></div>
                  <div className='ball two'></div>
                </div>
            ) : (
                    ranking.map((user, index) => (
                      <div className="user-wrapper" key={index}>
                        <p>{index + 1}:  {user.username}  -  Puntuación:{user.score}</p>
                    </div>
                    ))
            )}
        </div>
        </Container>
    );
  };
  
  export default Ranking;