// src/components/GameFinale.test.js
import React from 'react';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import GameFinale from './GameFinale';

const mockAxios = new MockAdapter(axios);

const paragraph1 = "Game finished!";
const paragraph2 = "You've successfully tackled all 10 questions!";
const paragraph3 = "Feel free to review them in the record or head back home to start a new game.";

describe('GameFinale component', () => {
  beforeEach(() => {
    mockAxios.reset();
    localStorage.setItem('username', 'usernamePrueba');
  });

  it('should render text succesfully', async () => {    
    mockAxios.onPost('http://localhost:8000/saveGameRecord').reply(200);
    const date = new Date();
    
    render(
    <MemoryRouter initialEntries={[{ pathname: '/gameFinale', state: { username: "usernamePrueba", createdAt: date } }]}>
      <GameFinale numberOfQuestions={10} />
    </MemoryRouter>
      );

    await waitFor(() => screen.getByText(paragraph1));

    expect(screen.getByText(paragraph1)).toBeInTheDocument();
    expect(screen.getByText(paragraph2)).toBeInTheDocument();
    expect(screen.getByText(paragraph3)).toBeInTheDocument();
  });

  it('should render the record saved message succesfully', async () => {   
    mockAxios.onPost('http://localhost:8000/saveGameRecord').reply(200);
    render(
    <Router>
      <GameFinale numberOfQuestions={10} />
    </Router>);

    //test the dialog is visible
    const messageElement = await screen.findByText("Record saved successfully!");
    expect(messageElement).toBeInTheDocument();
  });



});
