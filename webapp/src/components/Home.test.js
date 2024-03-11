import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Home from './Home';

const mockAxios = new MockAdapter(axios);

describe('Home component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('should show the username an buttons successfully', async () => {

    const usernamePrueba = 'usernamePrueba';
    const createdAt = new Date().toISOString();

    /*render(
      <Router>
        <Home location={{ state: { username: usernamePrueba, createdAt: new Date() } }} />
      </Router>
    );*/

    render(
      <MemoryRouter initialEntries={[{ pathname: '/home', state: { username: usernamePrueba, createdAt } }]}>
        <Home />
      </MemoryRouter>
    );

    //compruebo que hay dos botones, jugar y record
    const buttons = await screen.findAllByRole('button');
    expect(buttons.length).toBe(2);
    
    expect(screen.getByText(/Here you can start a new game or check your record./i)).toBeInTheDocument();
    expect(screen.getByText(`Hello ${usernamePrueba}!`)).toBeInTheDocument();
  });
    
});
