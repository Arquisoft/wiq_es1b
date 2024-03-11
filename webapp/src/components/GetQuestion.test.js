import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Question from './GetQuestion';

const mockAxios = new MockAdapter(axios);

describe('GetQuestion component', () => {
  beforeEach(() => {
    mockAxios.reset();
    mockAxios.onPost('http://localhost:8000/getQuestion').reply(200, {
      question: 'Test question',
      correctAnswerLabel: 'Test correct answer',
      answerLabelSet: ['Test answer 1', 'Test answer 2', 'Test answer 3', 'Test correct answer']
    });

    mockAxios.onPost('http://localhost:8000/saveHistorial').reply(200, {   
    });
  });

  it('Should render question and answer buttons', async () => {   
    render(
    <Router>
      <Question />
    </Router>);
  
    // Wait for the question to appear in the document
    await waitFor(() => screen.getByText('Test question'));
    
    // Check that there are 5 buttons, 4 for the answers and 1 for the next question
    const buttons = await screen.findAllByRole('button');
    expect(buttons.length).toBe(5);

    // Check that the question and answers are on the screen
    expect(screen.getByText('Test question')).toBeInTheDocument();
    expect(screen.getByText('Test answer 1')).toBeInTheDocument();
    expect(screen.getByText('Test answer 2')).toBeInTheDocument();
    expect(screen.getByText('Test answer 3')).toBeInTheDocument();
    expect(screen.getByText('Test correct answer')).toBeInTheDocument();
  });

  it('Should play and guess the correct answer', async () => {    
    render(
    <Router>
      <Question />
    </Router>);
  
    // Wait for the question to appear in the document
    await waitFor(() => screen.getByText('Test question'));

    // Click the correct answer
    fireEvent.click(screen.getByText('Test correct answer')); 

    // Wait for feedback to be rendered
    await waitFor(() => expect(screen.getByText('You have won! Congratulations!')).toBeInTheDocument()); 
  });

  it('Should play and select an incorrect answer', async () => {    
    render(
    <Router>
      <Question />
    </Router>);
  
    // Wait for the question to appear in the document
    await waitFor(() => screen.getByText('Test question'));

    // Click the correct answer
    fireEvent.click(screen.getByText('Test answer 1')); 

    // Wait for feedback to be rendered
    await waitFor(() => expect(screen.getByText('You lost! Try again :(')).toBeInTheDocument()); 
  });

});
/*
jest.mock('axios');

  beforeEach(() => {
      axios.post.mockResolvedValue({
        data: {
          question: 'What is the capital of France?',
          correctAnswerLabel: 'Paris',
          answerLabelSet: ['Paris', 'London', 'Madrid', 'Lisbon']
        }
      });
    });
    expect(screen.getByTestId('answer0Button')).toBeInTheDocument();
*/