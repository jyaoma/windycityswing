import React from 'react';
import history from './history.js';

class IndexPage extends React.Component {
    render () {
        return (
            <div id="index">
                <span>Welcome to Jeremy's Web Host!</span>
                <span>Pick one of the sites below:</span>
                <br/>
                <a onClick={() => {history.push('/WindyCitySwing')}}>Windy City Swing</a><br/>
                <a onClick={() => {history.push('/vday2017')}}>Valentines Day 2017</a><br/>
                <a onClick={() => {history.push('/jerissatothemoon')}}>Jerissa To The Moon</a>
            </div>
        );
    }
}

export default IndexPage;