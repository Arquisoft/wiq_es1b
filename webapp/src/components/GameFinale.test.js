import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
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
  });

  it('should render text succesfully', async () => {    
    render(
    <Router>
      <GameFinale />
    </Router>);

    await waitFor(() => screen.getByText(paragraph1));

    expect(screen.getByText(paragraph1)).toBeInTheDocument();
    expect(screen.getByText(paragraph2)).toBeInTheDocument();
    expect(screen.getByText(paragraph3)).toBeInTheDocument();
  });

  it('should render button succesfully', async () => {    
    render(
    <Router>
      <GameFinale />
    </Router>);

    const buttons = await screen.findAllByRole('button');
    expect(buttons.length).toBe(1);
  });

});
