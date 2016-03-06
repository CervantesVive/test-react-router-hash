/*global window, document */
import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import { Provider } from 'react-redux';
import { Router, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import routes from './Routes.jsx';
import store from './ConfigureStore';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
ReactDOM.render(<Provider store={store}>
    <Router history={appHistory} routes={routes} />
</Provider>, window.document.querySelector('.app'));
