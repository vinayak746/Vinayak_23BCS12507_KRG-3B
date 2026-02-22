import { render } from '@testing-library/react';
import Header from '../components/Header';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

describe('Header snapshot', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <AuthContext.Provider value={{ isAuthenticated: false, setIsAuthenticated: jest.fn() }}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
