import React from 'react';
import {Route} from 'react-router';
import IndexPage from '../scripts/IndexPage';
import WindyCitySwing from '../scripts/components/WindyCitySwing';
import Vday2017 from '../../../vday2017/src/scripts/Vday2017';

module.exports = (
<Switch>
    <Route exact path="/" component={IndexPage}/>
    <Route path="/WindyCitySwing" component={WindyCitySwing}/>
    <Route path="/vday2017" component={Vday2017}/>
</Switch>
);