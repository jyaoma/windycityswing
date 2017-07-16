import './../less/main.less';
import '../../../vday2017/src/less/vday2017.less';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import IndexPage from './IndexPage';
import WindyCitySwing from './components/WindyCitySwing';
import HomePage from './components/home/HomePage';
import EventPage from './components/event/EventPage';
import Vday2017 from '../../../vday2017/src/scripts/Vday2017';

ReactDOM.render(
    <Router history={createHistory()}>
        <Switch>
            <Route exact path="/" component={IndexPage}/>
            <WindyCitySwing>
                <Route exact path="/WindyCitySwing" component={HomePage}/>
                <Route path="/WindyCitySwing.:eventName.:date" component={EventPage}/>
            </WindyCitySwing>
            <Route path="/vday2017" component={Vday2017}/>
        </Switch>
    </Router>,
    document.getElementById('app'));