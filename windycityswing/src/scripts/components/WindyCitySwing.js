import React from 'react';

import Header from './Header';
import {windyCitySwingProps} from '../propTypes';

class WindyCitySwing extends React.Component {
    render () {
        document.title = 'Windy City Swing';
        return (
            <div id='windy-city-swing'>
                <Header/>
                {this.props.children}
            </div>
        );
    }
}

WindyCitySwing.propTypes = windyCitySwingProps;

export default WindyCitySwing;