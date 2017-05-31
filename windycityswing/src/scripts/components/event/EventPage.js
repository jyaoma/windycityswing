import React from 'react';

const EventPage = ({match}) => {
    return (
    <div className='event-details'>
        {match.params.eventName}
    </div>);
}

export default EventPage;