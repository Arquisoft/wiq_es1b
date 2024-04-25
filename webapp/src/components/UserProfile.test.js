import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import UserProfile from './UserProfile';
import { BarChart } from '@mui/x-charts/BarChart';
/**
jest.mock('@mui/x-charts/BarChart', () => {
  return function DummyBarChart() {
    return <div />;
  };
});**/

const mockAxios = new MockAdapter(axios);


describe('UserProfile component', () => {

  beforeEach(() => {
    mockAxios.reset();
  });

  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: true, // provide a default value
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
    });
    localStorage.setItem('userProfileUsername', 'expectedUsername');
    localStorage.setItem('username', 'user');
  });


  it('should render succesfully with a user with no games played', async () => {
    
    mockAxios.onGet(`http://localhost:8000/getGameRecord`, { params: { username: 'expectedUsername' } }).reply(200, {
      games: [
          
      ]
    });

    mockAxios.onGet(`http://localhost:8000/getUserByUsername`, { params: { username: 'expectedUsername' } }).reply(200, {
      user: {
        createdAt: "2024-04-22T20:11:53.053Z",
        password: "$2b$10$m6RxpAY0yd23plXLXWn0cOUNTObjrpbsoPlLvFBwJk3VTdbwzxg92",
        username: "mery2",
        __v: 0,
        _id: "6626c489de07476e84fe74f2"
      }
    });

    await act(async () => {
      render(
        <Router>
          <UserProfile />
        </Router>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('22/04/2024')).toBeInTheDocument();
      expect(screen.getByText('Username')).toBeInTheDocument();
      expect(screen.getByText('expectedUsername')).toBeInTheDocument();
      expect(screen.getByText('Account created on')).toBeInTheDocument();
    });

  });

});
