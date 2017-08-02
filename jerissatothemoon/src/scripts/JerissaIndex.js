import React from 'react';
import {Link} from 'react-router-dom';

import backgroundImage from '../images/background.png';
import rsvpLinkImage from '../images/HOME_jerissa logo.png';

const JerissaIndex = () => {
    return (
        <div className='jerissa-index'>
            <img className="jerissa-index__bg" src={backgroundImage}/>
            <Link className="jerissa-index__rsvp-link" to="/jerissatothemoon-guestSearch">
                <img className="jerissa-index__rsvp-link-image" src={rsvpLinkImage}/>
            </Link>
        </div>
    );
}

export default JerissaIndex;