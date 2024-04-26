// src/components/NavigationBar.test.js
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

  it('should navigate to Ranking page when ranking button is clicked', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <MemoryRouter>
        <NavigationBar />
      </MemoryRouter>
    );

    const rankingButton = getByTestId('ranking-tab');
    fireEvent.click(rankingButton);

    expect(history.location.pathname).toBe('/');
  });

  it('should open the info menu when info button is clicked', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <NavigationBar />
      </MemoryRouter>
    );

    const infoButton = getByTestId('info-tab');
    fireEvent.click(infoButton);

    expect(getByTestId("help-item")).toBeInTheDocument();
    expect(getByTestId("about-us-item")).toBeInTheDocument();
    expect(getByTestId("get-db-data-item")).toBeInTheDocument();
    expect(getByTestId("api-doc-item")).toBeInTheDocument();
  });

  it('should navigate to Help page when help button is clicked', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <MemoryRouter>
        <NavigationBar />
      </MemoryRouter>
    );

    const infoButton = getByTestId('info-tab');
    fireEvent.click(infoButton);

    const helpButton = getByTestId('help-item');
    fireEvent.click(helpButton);

    expect(history.location.pathname).toBe('/');
  });

  it('should navigate to AboutUs page when about us button is clicked', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <MemoryRouter>
        <NavigationBar />
      </MemoryRouter>
    );

    const infoButton = getByTestId('info-tab');
    fireEvent.click(infoButton);

    const aboutUsButton = getByTestId('about-us-item');
    fireEvent.click(aboutUsButton);

    expect(history.location.pathname).toBe('/');
  });

  it('should navigate to API Doc page when api doc button is clicked', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <MemoryRouter>
        <NavigationBar />
      </MemoryRouter>
    );

    const infoButton = getByTestId('info-tab');
    fireEvent.click(infoButton);

    const apiButton = getByTestId('api-doc-item');
    fireEvent.click(apiButton);

    expect(history.location.pathname).toBe('/');
  });

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
