// src/components/Ranking.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
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

    const [record, setRecord] = useState([]);
    const [ranking, setRanking] = useState([]);
    const [puntuacion, setPuntuacion] = useState(0);

    //data for the chart
    const [loading, setLoading] = useState(true);
  
    const getScoreForUser = async (userInDB) => {
        const response = await axios.post(`${apiEndpoint}/getGameRecord`, { userInDB });
        // Extract data from the response
        let { games } = response.data;
        setRecord(games);
    
        //const totalGames = games.length;
        // Calculate correct and incorrect answers for the chartbar
        let correctCount = 0;
        games.forEach((game) => {
          game.questions.forEach(question => {
            if (question.correctAnswer === question.selectedAnswer) {
              correctCount++;
            }
          });
          //labels.push(`Game ${totalGames - games.length + index + 1}`);
        });

        return correctCount;
    }

    const getRanking = async () => {
        const response = await axios.post(`${apiEndpoint}/getAllUsers`, {});
        // Extract data from the response
        let { users } = response.data;
        setRanking(users);

        let scoreForUser = 0;
        users.forEach((userInDB, index) => {
            // Extract score from the user record
            scoreForUser = getScoreForUser(userInDB);

            // Algorithm for sorting the users
            // ...

            setRecord(games);
        });
        setLoading(false);
    }

    useEffect(() => {
        getRanking();
        
    }, []);
  
    return (
        <Container component="main" maxWidth="sm" sx={{ marginTop: 4 }}>
          <div style={{ padding: '4em', borderRadius: '15px', boxShadow: '0 0 50px #00a6bc', backgroundColor: 'rgba(255, 255, 255, 0.65)', zIndex: 1, marginTop: '2rem' }}>
       
          </div>
        </Container>
    );
  };
  
  export default Ranking;