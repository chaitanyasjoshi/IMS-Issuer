import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { ProtectedRoute } from '../utils/ProtectedRoute';

import Authentication from './Authentication';
import Dashboard from './Dashboard';
import Spinner from './Spinner';

export default function App() {
  return (
    <Switch>
      <Route exact path='/' component={Authentication} />
      <ProtectedRoute path='/dashboard' component={Dashboard} />
      <Redirect from='*' to='/' />
    </Switch>
  );
}
