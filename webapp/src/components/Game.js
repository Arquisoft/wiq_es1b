import React, { useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';

function Game() {
  const questions = [
    {
      id: 1,
      question: '¿Cuál es la capital de Francia?',
      options: ['Madrid', 'Roma', 'París', 'Londres'],
      correctAnswer: 'París'
    },
    {
      id: 2,
      question: '¿Cuál es el río más largo del mundo?',
      options: ['Amazonas', 'Nilo', 'Yangtsé', 'Misisipi'],
      correctAnswer: 'Amazonas'
    },
    // Agregar más preguntas aquí
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerButtonClick = (selectedOption) => {
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowScore(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
      {showScore ? (
        <div className="score-section">
          <h2>Tu puntaje es {score} de {questions.length}</h2>
        </div>
      ) : (
        <>
          <div className="question-section">
            <Typography component="h1" variant="h4" align="center" className='question-count'>
              <span>Pregunta {currentQuestionIndex + 1}</span>/{questions.length}
            </Typography>
            <Typography component="h2" variant="h5" className='question-text'>
              {questions[currentQuestionIndex].question}
            </Typography>
          </div>
          <div className="answer-section">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <Box key={option} sx={{ display: 'flex', alignItems: 'center', marginY: '0.6em'}}>
                <Typography component="span" variant="h5" sx={{ marginRight: '0.35em' }}>
                  {index + 1}. 
                </Typography>
                <Button 
                  variant="contained" 
                  sx={{ backgroundColor: 'darkorange', color: '#ffffff' }}
                  key={option} 
                  onClick={() => handleAnswerButtonClick(option)}>
                    {option}
                </Button>
              </Box>
            ))}
          </div>
          <Typography component="h1" variant="h4" className='question-count'>
            <span>Pregunta {currentQuestionIndex + 1}</span>/{questions.length}
          </Typography>
        </>
      )}
    </Container>
  );
}

export default Game;
