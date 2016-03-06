/**
 * App Routing
 * @module Routes
 */

import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import AppContainer from './AppContainer.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';

export default (
    <Route path='/' component={AppContainer}>
        <IndexRedirect to='login' />
        {/* Routes below DO NOT require authentication */}
        <Route path='login' component={Login} />
        <Route path='register' component={Register} />

    </Route>
);
