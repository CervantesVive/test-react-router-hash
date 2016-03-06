/*global window, document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, useRouterHistory, hashHistory, browserHistory } from 'react-router';
import { createHashHistory } from 'history';
import routes from './Routes.jsx';
import store from './ConfigureStore';

//DOESNT WORK
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

//DOESNT WORK EITHER
//const appHistory = hashHistory;

//WORKS
//const appHistory = browserHistory;

ReactDOM.render(<Provider store={store}>
    <Router history={appHistory} routes={routes} />
</Provider>, window.document.querySelector('.app'));
