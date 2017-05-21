import React from 'react';
import { Link } from 'react-router-dom';

class IndexPage extends React.Component {
    render () {
        return (
            <div id="index">
                <span>Welcome to Jeremy's Web Host!</span>
                <span>Pick one of the sites below:</span>
                <br/>
                <Link to="/WindyCitySwing">Windy City Swing</Link><br/>
                <Link to="/vday2017">Valentines Day 2017</Link>
            </div>
        );
    }
}

export default IndexPage;