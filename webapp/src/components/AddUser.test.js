import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AddUser from './AddUser';

const mockAxios = new MockAdapter(axios);

describe('AddUser component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  const setupTest = async (username, password, response) => {
    render(
      <Router>
        <AddUser />
      </Router>
    );

    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const addUserButton = screen.getByRole('button', { name: /Add User/i });

    mockAxios.onPost('http://localhost:8000/adduser').reply(...response);

    fireEvent.change(usernameInput, { target: { value: username } });
    fireEvent.change(passwordInput, { target: { value: password } });

    fireEvent.click(addUserButton);
  };

  it('should add user successfully', async () => {
    await setupTest('testUser', 'testPassword', [200]);

    await waitFor(() => {
      expect(screen.getByText(/User added successfully/i)).toBeInTheDocument();
    });
  });

  it('should handle error when adding user with a short password', async () => {
    await setupTest('testUser', 'pass', [500, { error: 'Password must be at least 8 characters long' }]);

    await waitFor(() => {
      expect(screen.getByText(/Password must be at least 8 characters long/i)).toBeInTheDocument();
    });
  });

  it('should handle error when adding user with a password without a sign of capital letter', async () => {
    await setupTest('testUser', 'shortbadpasswordnosigns', [500, { error: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one symbol' }]);

    await waitFor(() => {
      expect(screen.getByText(/Password must contain at least one lowercase letter, one uppercase letter, one digit, and one symbol/i)).toBeInTheDocument();
    });
  });

  it('should handle error when adding user with a password without a sign of capital letter', async () => {
    render(
      <Router>
        <AddUser />
      </Router>
    );
    await waitFor(() => {
      expect(screen.getByText(/Welcome to WIQ!/i)).toBeInTheDocument();
      expect(screen.getByText(/Create an account to start playing!/i)).toBeInTheDocument();
    });
  });
});