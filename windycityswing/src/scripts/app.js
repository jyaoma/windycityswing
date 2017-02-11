// import './../less/main.less';
// import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
// import { createStore, applyMiddleware } from 'redux';
// import createSagaMiddleware from 'redux-saga';
// import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
// import reducers from './index';
import { Provider } from 'react-redux';
// import rootSaga from './sagas';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Container from './Container';
import HomePage from './components/home/HomePage';

// const logger = createLogger();

// const sagaMiddleware = createSagaMiddleware();

// const store = createStore(reducers, applyMiddleware(thunk, sagaMiddleware, logger));

// sagaMiddleware.run(rootSaga);

ReactDOM.render(
    // <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Container}>
                <IndexRoute component={HomePage}/>
                <Route path="/home" component={HomePage}/>
            </Route>
        </Router>,
    // </Provider>,
    document.getElementById('app'));