// src/components/Ranking.test.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Ranking from './Ranking';

const mockAxios = new MockAdapter(axios);

describe('Ranking component', () => {
  
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
    const localStorageMock = {
        getItem: jest.fn(),
    };

    Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
    });

    mockAxios.onGet('http://localhost:8000/getGameRecord').reply(200, {games: []});

    mockAxios.onPost('http://localhost:8000/getAllUsers').reply(200, {users: []});
    
    render(
    <Router>
      <Ranking />
    </Router>);

    await waitFor(() => screen.getByText(/Ranking/i));

    const linkElement = screen.getByText(/Ranking/i);
    expect(linkElement).toBeInTheDocument();

  });

});