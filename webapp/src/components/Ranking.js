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
  
    const getHistorialForLoggedUser = async () => {
        const response = await axios.post(`${apiEndpoint}/getGameRecord`, { username });
        // Extract data from the response
        let { games } = response.data;
        setRecord(games);
    
        //const totalGames = games.length;
        // Calculate correct and incorrect answers for the chartbar
        let correctCount = 0;
        games.forEach((game, index) => {
          game.questions.forEach(question => {
            if (question.correctAnswer === question.selectedAnswer) {
              correctCount++;
            }
          });
          //labels.push(`Game ${totalGames - games.length + index + 1}`);
          setLoading(false);
        });

        return correctCount;
    }
  
    return (
        <Container component="main" maxWidth="sm" sx={{ marginTop: 4 }}>

        </Container>
    );
  };
  
  export default Ranking;