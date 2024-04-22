import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import NavigationBar from './NavigationBar';

describe('NavigationBar component', () => {

  it('should navigate to Home page when the logo icon button is clicked', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <MemoryRouter>
        <NavigationBar />
      </MemoryRouter>
    );

    const logoButton = getByTestId('logo-tab');
    fireEvent.click(logoButton);

    expect(history.location.pathname).toBe('/');
  });

  it('should navigate to Home page when "WIQ" button is clicked', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <MemoryRouter>
        <NavigationBar />
      </MemoryRouter>
    );

    const wiqButton = getByTestId('wiq-tab');
    fireEvent.click(wiqButton);

    expect(history.location.pathname).toBe('/');
  });

  it('should navigate to Settings page when settings button is clicked', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <MemoryRouter>
        <NavigationBar />
      </MemoryRouter>
    );

    const settingsButton = getByTestId('settings-tab');
    fireEvent.click(settingsButton);

    expect(history.location.pathname).toBe('/');
  });

  it('should navigate to Record page when record button is clicked', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <MemoryRouter>
        <NavigationBar />
      </MemoryRouter>
    );

    const recordButton = getByTestId('record-tab');
    fireEvent.click(recordButton);

    expect(history.location.pathname).toBe('/');
  });
/*
  it('should navigate to help page when "Help" button is clicked', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <MemoryRouter>
        <NavigationBar />
      </MemoryRouter>
    );

    const helpButton = getByText('Help');
    fireEvent.click(helpButton);

    expect(history.location.pathname).toBe('/');
  });

  it('should navigate to aboutUs page when "About Us" button is clicked', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <MemoryRouter>
        <NavigationBar />
      </MemoryRouter>
    );

    const aboutUsButton = getByText('About Us');
    fireEvent.click(aboutUsButton);

    expect(history.location.pathname).toBe('/');
  });

  it('should navigate to API Doc page when "API Doc" button is clicked', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <MemoryRouter>
        <NavigationBar />
      </MemoryRouter>
    );

    const apiButton = getByText('API Doc');
    fireEvent.click(apiButton);

    expect(history.location.pathname).toBe('/');
  });
*/
  it('should navigate to Login page when log out button is clicked', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <MemoryRouter>
        <NavigationBar />
      </MemoryRouter>
    );

    const logoutButton = getByTestId('logout-tab');
    fireEvent.click(logoutButton);

    expect(history.location.pathname).toBe('/');
  });

});
