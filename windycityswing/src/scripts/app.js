import '../less/main.less';
import '../../../jerissatothemoon/src/less/base.less';
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
import JerissaIndex from '../../../jerissatothemoon/src/scripts/JerissaIndex';
import JerissaGuestSearch from '../../../jerissatothemoon/src/scripts/GuestSearch';

ReactDOM.render(
    <Router history={createHistory()}>
        <Switch>
            <Route exact path="/" component={IndexPage}/>
            <Route path="/vday2017" component={Vday2017}/>
            <Route path="/jerissatothemoon" component={JerissaIndex}/>
            <Route path="/jerissatothemoon-guestsearch" component={JerissaGuestSearch}/>
            <WindyCitySwing>
                <Route exact path="/WindyCitySwing" component={HomePage}/>
                <Route path="/WindyCitySwing__:eventName--:date" component={EventPage}/>
            </WindyCitySwing>
        </Switch>
    </Router>,
    document.getElementById('app'));