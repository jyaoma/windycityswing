import React from 'react';

import Header from './Header';
import HomePage from './home/HomePage';
import {windyCitySwingProps} from '../propTypes';

class WindyCitySwing extends React.Component {
    render () {
        document.title = 'Windy City Swing';
        return (
            <div id='windy-city-swing'>
                <Header/>
                <HomePage/>
                <div id='skyline'></div>
            </div>
        );
    }
}

WindyCitySwing.propTypes = windyCitySwingProps;

export default WindyCitySwing;