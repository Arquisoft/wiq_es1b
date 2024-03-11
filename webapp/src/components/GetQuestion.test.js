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
  });

  it('should show the question', async () => {
    mockAxios.onPost('http://localhost:8000/getQuestion').reply(200, {
      question: 'Test question',
      correctAnswerLabel: 'Test correct answer',
      answerLabelSet: ['Test answer 1', 'Test answer 2', 'Test answer 3', 'Test answer 4']
    });
    
    render(
    <Router>
      <Question />
    </Router>);

  
    // Esperar a que la pregunta aparezca en el documento
    await waitFor(() => screen.getByText('Test question'));

    
    // Comprobar que hay 5 botones, 4 de las respuestas y 1 del next question
    const buttons = await screen.findAllByRole('button');
    expect(buttons.length).toBe(7);

    // Comprobar que la pregunta y las respuestas están en la pantalla
    expect(screen.getByText('Test question')).toBeInTheDocument();
    expect(screen.getByText('Test answer 1')).toBeInTheDocument();
    expect(screen.getByText('Test answer 2')).toBeInTheDocument();
    expect(screen.getByText('Test answer 3')).toBeInTheDocument();
    expect(screen.getByText('Test answer 4')).toBeInTheDocument();

  });

});
