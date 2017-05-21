import './../less/main.less';
import '../../../vday2017/src/less/vday2017.less';
// import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
// import { createStore, applyMiddleware } from 'redux';
// import createSagaMiddleware from 'redux-saga';
// import thunk from 'redux-thunk';
// import createLogger from 'redux-logger';
// import reducers from './index';
// import { Provider } from 'react-redux';
// import rootSaga from './sagas';
import { Router, Route, Switch } from 'react-router';
import createHashHistory from 'history/createHashHistory';
import IndexPage from './IndexPage';
import WindyCitySwing from './components/WindyCitySwing';
import Vday2017 from '../../../vday2017/src/scripts/Vday2017';

// const logger = createLogger();

// const sagaMiddleware = createSagaMiddleware();

// const store = createStore(reducers, applyMiddleware(thunk, sagaMiddleware, logger));

// sagaMiddleware.run(rootSaga);

ReactDOM.render(
    // <Provider store={store}>
        <Router history={createHashHistory()}>
            <Switch>
                <Route exact path="/" component={IndexPage}/>
                <Route path="/WindyCitySwing" component={WindyCitySwing}/>
                <Route path="/vday2017" component={Vday2017}/>
            </Switch>
        </Router>,
    // </Provider>,
    document.getElementById('app'));