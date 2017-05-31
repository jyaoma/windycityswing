import React from 'react';
import PropTypes from 'prop-types';

const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const weekdayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const events = (eventList) => {
    if (!eventList || eventList.length === 0) {
        return <span className='calendar-day-modal__no-events'>Sorry, no events are listed for this day.</span>;
    }
    const result = [];

    for (let i = 0; i < eventList.length; i++) {
        const event = eventList[i];
        result.push(
            <a href={'/#/WindyCitySwing/event/'+event.className} className={'calendar-day-modal__event event--'+event.className} key={i}>
                <span className='calendar-day-modal__event-title'>{event.title}</span>
                <span className='calendar-day-modal__event-address'>{event.location.addressName + ', ' + event.location.addressOne + ', ' + event.location.city + ', ' + event.location.state}</span>
            </a>);
    }

    return result;
}

const CalendarDayModal = (props) => {
    if (!props || props.hidden || !props.day) {
        return null;
    } else {
        return (
            <div className='calendar-day-modal__container'>
                <div className='calendar-day-modal'>
                    <span className='calendar-day-modal__day'>{weekdayNames[props.weekday] + ', ' + monthNames[(props.month - 1)] + ' ' + props.day.toString()}</span>
                    <div className='calendar-day-modal__close-container' onClick={props.closeModal}>
                        <svg className='calendar-day-modal__close' viewBox='0 0 9 9'>
                            <path d='M2 2 L7 7'/>
                            <path d='M2 7 L7 2'/>
                        </svg>
                    </div>
                    {events(props.events)}
                </div>
            </div>
        );
    }
}

CalendarDayModal.propTypes = {
    day: PropTypes.number,
    events: PropTypes.array
}

export default CalendarDayModal;