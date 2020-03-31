// Core
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Guardian } from '../bus/customer/gurdian';

// Routes
import { book } from './book';

// Pages
import { SignUpPage } from '../pages/signUp';
import { LoginPage } from '../pages/login';
import { TasksPage } from '../pages/tasks';

export const Routes = () => (
  <>
    <Switch>
      <Route exact path={book.root}>
        <Redirect to={book.tasks} />
      </Route>
      <Route exact path={book.signup}>
        <SignUpPage />
      </Route>
      <Route exact path={book.login}>
        <LoginPage />
      </Route>
      <Guardian>
        <Route exact path={book.tasks}>
          <TasksPage />
        </Route>
      </Guardian>
    </Switch>
  </>
);
