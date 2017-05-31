import React from 'react';

import dances from '../../../../dances/dances';

const EventPage = ({match}) => {
    const eventFinder = event => event.className === match.params.eventName;
    const event = dances.find(eventFinder);

    return (
    <div className='event-details'>
        <span className='event-details__title'>{event.title}</span>
    </div>);
}

export default EventPage;