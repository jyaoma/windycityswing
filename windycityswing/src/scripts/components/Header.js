import React from 'react';

class Header extends React.Component {
    render () {
        return (
            <div id='header'>
                <span id='title'>Windy City Swing</span>
                <div id="subtitle">THE SWING DANCING INFORMATION IN CHICAGO AND CHICAGOLAND AREA</div>

                <div id="main-menu">
                    <div className="main-menu-item" id="venue-button">Venues</div>
                    <div className="main-menu-item" id="event-button">Events</div>
                    <div className="main-menu-item" id="class-button">Classes</div>
                </div>
            </div>
        );
    }
}

export default Header;