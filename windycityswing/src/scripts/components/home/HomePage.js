import React from 'react';

class HomePage extends React.Component {
    render () {
        document.title = 'Windy City Swing';
        return (
            <div id='windy-city-home'>
                <h1>This is a test.</h1>
            </div>
        );
    }
}

export default HomePage;