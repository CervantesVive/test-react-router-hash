/* global module require */
import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistory, routeReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

function configureStore(initialState = {}) {
    const reduxRouterMiddleware = syncHistory(browserHistory);
    const store = createStore(
        combineReducers({
            routing: routeReducer
        }),
        initialState,
        compose(
            applyMiddleware(reduxRouterMiddleware)
        )
    );

    return store;
}

const store = configureStore();

export default store;
