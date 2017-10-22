import '../less/main.less';
import '../../../../jerissatothemoon/src/less/base.less';
import '../../../../vday2017/src/less/vday2017.less';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import history from './history';

import IndexPage from './IndexPage';
import WindyCitySwing from './components/WindyCitySwing';
import HomePage from './components/home/HomePage';
import EventPage from './components/event/EventPage';
import Vday2017 from '../../../../vday2017/src/scripts/Vday2017';
import JerissaIndex from '../../../../jerissatothemoon/src/scripts/JerissaIndex';
import JerissaGuestSearch from '../../../../jerissatothemoon/src/scripts/GuestSearch';
import JerissaRSVP from '../../../../jerissatothemoon/src/scripts/RSVP';
import JerissaRecords from '../../../../jerissatothemoon/src/scripts/Records';
import JerissaSubmit from '../../../../jerissatothemoon/src/scripts/Submit';
import JerissaMenu from '../../../../jerissatothemoon/src/scripts/Menu';
import JerissaToTheMoon from '../../../../jerissatothemoon/src/scripts/JerissaToTheMoon';

ReactDOM.render(
    <Router history={history}>
        <Switch>
            <Route exact path="/" component={IndexPage}/>
            <Route path="/vday2017" component={Vday2017}/>
            <JerissaToTheMoon path='/jerissatothemoon*'>
                <Route path="/jerissatothemoon" component={JerissaIndex}/>
                <Route path="/jerissatothemoon-guestsearch" component={JerissaGuestSearch}/>
                <Route path="/jerissatothemoon-rsvp-:groupNumber" component={JerissaRSVP}/>
                <Route path="/jerissatothemoon-records-:groupNumber" component={JerissaRecords}/>
                <Route path="/jerissatothemoon-submit" component={JerissaSubmit}/>
                <Route path="/jerissatothemoon-menu" component={JerissaMenu}/>
            </JerissaToTheMoon>
            <WindyCitySwing path='/WindyCitySwing*'>
                <Route exact path="/WindyCitySwing" component={HomePage}/>
                <Route path="/WindyCitySwing-:year-:month" component={HomePage}/>
                <Route path="/WindyCitySwing__:eventName--:date" component={EventPage}/>
            </WindyCitySwing>
        </Switch>
    </Router>,
    document.getElementById('app'));