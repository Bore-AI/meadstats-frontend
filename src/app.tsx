import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

import jwtDecode from 'jwt-decode';

import 'bootstrap/dist/css/bootstrap.css';
import './assets/favicon.ico';

import { Container, Row } from 'reactstrap';
import { Footer } from './components/footer';
import { ErrorBoundary } from './components/errorboundary';
import { Routes } from './routes';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(['jwt_token']);

  const logoutUser = (): void => {
    window.localStorage.clear();
    setIsAuthenticated(false);
  };

  const loginUser = (token: string): void => {
    window.localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  useEffect(() => {
    // If we have a cookie from login redirect exchange it to localstorage
    if (cookies['jwt_token']) {
      loginUser(cookies['jwt_token']);
      removeCookie('jwt_token');
    }

    // Login user if token is stored
    if (window.localStorage.getItem('authToken')) {
      const decoded = jwtDecode(window.localStorage.getItem('authToken'));
      setIsAuthenticated(true);
      setUsername(decoded.identity);
    } else {
      setIsAuthenticated(false);
    }
  }, [cookies, removeCookie]);

  return (
    <Container>
      <Row>
        <ErrorBoundary>
          <main role="main" className="col-md-12 col-lg-12 px-4">
            <Routes isAuthenticated={isAuthenticated} username={username} logoutUser={logoutUser} />
          </main>
        </ErrorBoundary>
      </Row>
      <Footer />
    </Container>
  );
};

export default App;
