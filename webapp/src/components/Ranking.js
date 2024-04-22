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
          const response = await axios.post(`${apiEndpoint}/getGameRecord`, { username });
          // Extract data from the response
          let { games } = response.data;
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

          const rankingWithScores = [];
          for (const userInDB of users) {
            let userInDBName = userInDB.username;
            const score = await getScoreForUser(userInDBName);
            rankingWithScores.push({ ...userInDB, score });
          }
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
    
    const showUserProfile = (userProfileName) =>{
      localStorage.setItem('userProfileUsername', userProfileName)
      navigate("/userProfile", {state: {username, createdAt, userProfileName}});
    }

    return (
        <Container component="main" maxWidth="sm" sx={{ marginTop: 4 }}>
          <div style={{ marginTop: '2rem' }}>
            {/* Aquí renderizamos el ranking */}
            <h1>Ranking</h1>
            {loading ? (
                <div className='charging'>
                  <div className='ball one'></div>
                  <div className='ball two'></div>
                </div>
            ) : (
              ranking.map((user, index) => (
                <div className="user-wrapper" key={index}> 
                  <div className={`user-box ${index < 3 ? 'red-circle' : ''}`}>
                    <div className="circle">{index + 1}</div>
                    <button 
                      style={{background: 'transparent', border: 'none', cursor: 'pointer'}} 
                      onClick={() => showUserProfile(user.username)}
                    >
                      <p>{user.username}</p>
                    </button>
                    <div className="user-shadow">
                      <p>Score: {user.score}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
        </div>
        </Container>
    );
  };
  
  export default Ranking;