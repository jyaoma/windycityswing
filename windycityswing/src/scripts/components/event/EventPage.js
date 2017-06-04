import React from 'react';

import dances from '../../../../dances/dances';

const eventDescription = (event) => {
    if (!event.info || event.info.length === 0) {
        return null;
    }
    const info = event.info;
    const result = [];
    for (let i = 0; i < info.length; i++) {
        result.push(<span key={i} className='event-details__description'>{info[i]}</span>);
    }

    return result;
};

const EventPage = ({match}) => {
    const eventFinder = event => event.className === match.params.eventName;
    const event = dances.find(eventFinder);

    return (
    <div className='event-details'>
        <span className='event-details__title'>{event.title}</span>
        <span className='event-details__description-header'>DESCRIPTION</span>
        {eventDescription(event)}
    </div>);
}

export default EventPage;