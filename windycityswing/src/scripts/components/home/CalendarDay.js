import React from 'react';
import PropTypes from 'prop-types';

const events = (eventList) => {
    if (!eventList || eventList.length === 0) {
        return null;
    } else {
        const renderedEventList = [];
        for (let i = 0; i < eventList.length; i++) {
            const event = eventList[i];
            renderedEventList.push(<div className={'calendar-day__event event--'+event.className} key={i}>{event.title}</div>);
        }
        return renderedEventList;
    }
};

const callToAction = (eventList) => {
    if (!eventList || eventList.length === 0) {
        return null;
    }
    return <span className='calendar-day__call-to-action'>Details >></span>;
}

const CalendarDay = (props) => {
    if (!props || !props.day) {
        return <td></td>;
    }
    return (
    <td className='calendar-day' onClick={() => {props.onClick(props.day, props.events)}}>
        <span>{props.day}</span>
        <div className='calendar-day__events'>
            {events(props.events)}
        </div>
        {callToAction(props.events)}
    </td>);
};

CalendarDay.propTypes = {
    day: PropTypes.number,
    events: PropTypes.array
}

export default CalendarDay;