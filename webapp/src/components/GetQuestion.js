// src/components/AddUser.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';

const GetQuestion = () => {
  //all the information about the question
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [answersArray, setAnswersArray] = useState([]);
  const [error, setError] = useState('');
  const [isRedy, setIsRedy] = useState(false); 
  const [answerFeedback, setAnswerFeedback] = useState('');
  const [nextQuestion, setNextQuestion] = useState(false);

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

  //method to get que information of the question
  const getQuestion = async () => {
    try {
      //call to get a question
      const response = await axios.post(`${apiEndpoint}/getQuestion`);

      // Extract data from the response, the question, the correct and the incorrect answers
      const { question: q, correctAnswerLabel:correctAnswer, answerLabelSet:answers } = response.data;

      //save the data 
      setQuestion(q);
      setCorrectAnswer(correctAnswer);
      setAnswersArray(answers);

      //set the attribute to show it is ready to true
      setIsRedy(true);

      //set nextQuestiona true to make the button to get another question disabled
      setNextQuestion(true);

      //set answer feedback to none
      setAnswerFeedback('');

      //set the background of the buttons grey when it is a new question
      backgroundButtonColorGrey();

    } catch (error) {
      setError(error.response.data.error);
    }
  };

  /**
   * Method to check the answer, sets the feedback to show the user if
   * it was right or not, also calls a method to show the color green in the correct
   * answer button and red in the incorrect ones
   * @param {} selectedAnswer of the button clicked
   */
  const checkAnswer = (selectedAnswer) => {
    //only executes the first time a button is clicked
    if(answerFeedback == ''){
      if(selectedAnswer == correctAnswer){
        setAnswerFeedback("You have won! Congratulations!");
      } else {
        setAnswerFeedback("You lost! Try again :(");
      }
      showAnswerColors();
      setNextQuestion(false);
    }
  }

  /**
   * Method to change the background color to the buttons
   */
  const showAnswerColors = () => {
    const answersDiv = document.querySelector('.answers');
    if (answersDiv) {
      const buttons = answersDiv.querySelectorAll('button');
      buttons.forEach(button => {
        button.style.color = 'black';
        if (button.textContent === correctAnswer) {
          button.style.backgroundColor = 'green';
        } else {
          button.style.backgroundColor = 'red';
        }
        //disable the buttons so the user cannot choose another option
        button.disabled = true; 
      });
    }
  };

  /**
   * Changes the background color of the buttons back to grey as it is a new question
   */
  const backgroundButtonColorGrey = () => {
    const answersDiv = document.querySelector('.answers');
    if (answersDiv) {
      const buttons = answersDiv.querySelectorAll('button');
      buttons.forEach(button => {
        button.style.backgroundColor = 'lightgrey';
        button.style.color = 'black';
        //let the user be able to click a button to choose an answer
        button.disabled = false;
      });
    }
  };

  return (
    <Container>
      {isRedy ?  
        <div className='answers'>
          <h2>
            {question}
          </h2>
        
          {/* Generate buttons for the answers */}
          {answersArray.map((answer, index) => (
            <button key={index} onClick={() => checkAnswer(answer)}>{answer}</button>
          ))}

          {/* To show the feedback after answering */}
          <p>{answerFeedback}</p>
        </div>
      :
        <div>
          
        </div>
      }
      <div>
          {/* Button to request a new question It will be disabled when the question is not answered */}
          <button onClick={getQuestion} disabled={nextQuestion}>Siguiente Pregunta</button>
      </div>
      
    </Container>
  );
};

export default GetQuestion;
