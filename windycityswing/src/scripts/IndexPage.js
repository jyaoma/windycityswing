import React from 'react';
import { Link } from 'react-router';

class IndexPage extends React.Component {
    render () {
        return (
            <div id="index">
                <h1>Welcome to Jeremy's Web Host!</h1>
                <h2>Pick one of the sites below:</h2>
                <Link to="/WindyCitySwing">Windy City Swing</Link><br/>
                <Link to="/vday2017">Valentines Day 2017</Link>
            </div>
        );
    }
}

export default IndexPage;