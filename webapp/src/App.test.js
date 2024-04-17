import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders learn react link', () => {
  render(<Router>
          <App />
        </Router>);
  const linkElement = screen.getByText(/Welcome to WIQ!/i);
  expect(linkElement).toBeInTheDocument();
  const linkElement2 = screen.getByText(/Log in to start playing!/i);
  expect(linkElement2).toBeInTheDocument();
});
