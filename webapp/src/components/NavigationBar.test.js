import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import { createMemoryHistory } from 'history';

describe('NavigationBar component', () => {
  it('should navigate to home page when "Home" button is clicked', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <MemoryRouter>
        <NavigationBar />
      </MemoryRouter>
    );

    const homeButton = getByText('Home');
    fireEvent.click(homeButton);

    expect(history.location.pathname).toBe('/');
  });

  it('should navigate to record page when "Record" button is clicked', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <MemoryRouter>
        <NavigationBar />
      </MemoryRouter>
    );

    const recordButton = getByText('Record');
    fireEvent.click(recordButton);

    expect(history.location.pathname).toBe('/');
  });

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

});
