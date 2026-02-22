import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Header from './Header';

describe('Header', () => {
  it('renders EcoTrack title', () => {
    render(
      <AuthContext.Provider value={{ isAuthenticated: false, setIsAuthenticated: jest.fn() }}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByText('🌱 EcoTrack')).toBeInTheDocument();
  });

  it('shows Login button when not authenticated', () => {
    render(
      <AuthContext.Provider value={{ isAuthenticated: false, setIsAuthenticated: jest.fn() }}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('shows Logout button when authenticated', () => {
    render(
      <AuthContext.Provider value={{ isAuthenticated: true, setIsAuthenticated: jest.fn() }}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });
});
