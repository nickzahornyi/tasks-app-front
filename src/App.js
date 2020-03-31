// Core
import React from 'react';
import { Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';

// Other
import { client } from './init/client';

// Styles
import './base/reset.scss';

// Routes
import { history } from './navigation/history';
import { Routes } from './navigation';

// Icons
import { initializeIcons } from 'office-ui-fabric-react';

initializeIcons();

export const App = () => (
  <ApolloProvider client={client}>
    <Router history = { history }>
      <Routes />
    </Router>
  </ApolloProvider>
);
