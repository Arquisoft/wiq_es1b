import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import UserProfile from './UserProfile';
import { createMemoryHistory } from 'history';

const mockAxios = new MockAdapter(axios);

describe('UserProfile component', () => {
  
  beforeEach(() => {
    mockAxios.reset();
  });

  beforeAll(() => {
    localStorage.setItem('userProfileUsername', 'expectedUsername');
    mockAxios.onGet(`http://localhost:8000/getGameRecord`).reply(function(config) {
      if (config.params.username === 'expectedUsername') {
        return [200, { /* respuesta para 'expectedUsername' */ }];
      } else {
        return [404, { message: 'User not found' }];
      }
    });
    mockAxios.onGet(`http://localhost:8000/getUserByUsername`).reply(200, {user: {
      createdAt: "2024-04-22T20:11:53.053Z",
      password: "$2b$10$m6RxpAY0yd23plXLXWn0cOUNTObjrpbsoPlLvFBwJk3VTdbwzxg92",
      username: "mery2",
      __v: 0,
      _id: "6626c489de07476e84fe74f2"
    }});
    /**mockAxios.onGet(`http://localhost:8000/getUserByUsername`).reply(function(config) {
      // config.params contiene los parámetros de la petición
      if (config.params.username === 'expectedUsername') {
        return [200, {
          user: {
            createdAt: "2024-04-22T20:11:53.053Z",
            password: "$2b$10$m6RxpAY0yd23plXLXWn0cOUNTObjrpbsoPlLvFBwJk3VTdbwzxg92",
            username: "mery2",
            __v: 0,
            _id: "6626c489de07476e84fe74f2"
          }
        }];
      } else {
        return [404, { message: 'User not found' }];
      }
    });**/
  });

  it('should render succesfully', async () => {
    
    
    render(
    <Router>
      <UserProfile />
    </Router>);

    screen.debug();

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
