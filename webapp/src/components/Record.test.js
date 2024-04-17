import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Record from './Record';
import { createMemoryHistory } from 'history';

const mockAxios = new MockAdapter(axios);

describe('Record component', () => {
  
  beforeEach(() => {
    mockAxios.reset();
  });

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('should render succesfully', async () => {

    mockAxios.onPost('http://localhost:8000/getGameRecord').reply(200, {games: []});
    
    render(
    <Router>
      <Record />
    </Router>);

    await waitFor(() => screen.getByText(/Here you can see your record! All about your past games and all!/i));

    const linkElement = screen.getByText(/Here you can see your record! All about your past games and all!/i);
    expect(linkElement).toBeInTheDocument();

  });
/**
  it('should render the games succesfully', async () => {

    mockAxios.onPost('http://localhost:8000/getGameRecord').reply(200, {
      games: [
        {
          user: '60d6c47e0b5f5c15d44c9a2c',
          questions: [
            {
              question: 'What is the capital of Spain?',
              answersArray: ['Madrid', 'Barcelona', 'Valencia', 'Seville'],
              correctAnswer: 'Madrid',
              selectedAnswer: 'Madrid',
              isCorrect: true
            },
            {
              question: 'What is the capital of France?',
              answersArray: ['Paris', 'Lyon', 'Marseille', 'Nice'],
              correctAnswer: 'Paris',
              selectedAnswer: 'Lyon',
              isCorrect: false
            }
          ]
        },
        {
          user: '60d6c47e0b5f5c15d44c9a2d',
          questions: [
            {
              question: 'What is the capital of Italy?',
              answersArray: ['Rome', 'Milan', 'Naples', 'Turin'],
              correctAnswer: 'Rome',
              selectedAnswer: 'Rome',
              isCorrect: true
            },
            {
              question: 'What is the capital of Germany?',
              answersArray: ['Berlin', 'Hamburg', 'Munich', 'Cologne'],
              correctAnswer: 'Berlin',
              selectedAnswer: 'Munich',
              isCorrect: false
            }
          ]
        }
      ],
    });

    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Record />
      </Router>
    );
  
      await waitFor(() => screen.getByText(/Here you can see your record! All about your past games and all!/i));
      
  });**/

});
