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
    expect(buttons.length).toBe(5);

    // Comprobar que la pregunta y las respuestas están en la pantalla
    expect(screen.getByText('Test question')).toBeInTheDocument();
    expect(screen.getByText('Test answer 1')).toBeInTheDocument();
    expect(screen.getByText('Test answer 2')).toBeInTheDocument();
    expect(screen.getByText('Test answer 3')).toBeInTheDocument();
    expect(screen.getByText('Test answer 4')).toBeInTheDocument();

  });

});
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import GetQuestion from '../components/GetQuestion';
import Login from './Login';

jest.mock('axios');

describe('GetQuestion component', () => {
    beforeEach(() => {
        axios.post.mockResolvedValue({
          data: {
            question: 'What is the capital of France?',
            correctAnswerLabel: 'Paris',
            answerLabelSet: ['Paris', 'London', 'Madrid', 'Lisbon']
          }
        });
      });

    test('Should render question and answer buttons', async () => {
    render(<GetQuestion />);

    // Wait for the question to be rendered
    await waitFor(() => expect(screen.getByText('What is the capital of France?')).toBeInTheDocument());

    // Check if answer buttons are rendered
    expect(screen.getByTestId('answer0Button')).toBeInTheDocument();
    expect(screen.getByTestId('answer1Button')).toBeInTheDocument();
    expect(screen.getByTestId('answer2Button')).toBeInTheDocument();
    expect(screen.getByTestId('answer3Button')).toBeInTheDocument();
    });
  
});
