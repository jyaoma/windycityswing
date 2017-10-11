import React from 'react';
import PropTypes from 'prop-types';
import history from '../../history';

const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const weekdayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const events = (eventList, props) => {
    if (!eventList || eventList.length === 0) {
        return <span className='calendar-day-modal__no-events'>Sorry, no events are listed for this day.</span>;
    }
    const result = [];

    for (let i = 0; i < eventList.length; i++) {
        const event = eventList[i];

        let date = event.date.year.toString();

        let monthString = props.month.toString();
        if (props.month < 10) {
            monthString = '0' + monthString;
        }

        date = date + '-' + monthString;

        let dayString = props.day.toString();
        if (props.day < 10) {
            dayString = '0' + dayString;
        }

        date = date + '-' + dayString;

        result.push(
            <div onClick={() => {history.push('/WindyCitySwing__'+event.className+'--'+date)}} className='calendar-day-modal__event' key={i} style={{backgroundColor: event.colors.bg, color: event.colors.text}}>
                <span className='calendar-day-modal__event-title'>{event.title}</span>
                <span className='calendar-day-modal__event-address'>{event.location.addressName + ', ' + event.location.addressOne + ', ' + event.location.city + ', ' + event.location.state}</span>

                <div className='calendar-day-modal__event-hover-layer'>
                    <span className='calendar-day-modal__event-title'>{event.title}</span>
                    <span className='calendar-day-modal__event-address'>{event.location.addressName + ', ' + event.location.addressOne + ', ' + event.location.city + ', ' + event.location.state}</span>
                </div>
            </div>);
    }

    return result;
}

const instructions = (eventList) => {
    if (!eventList || eventList.length === 0) {
        return null;
    }
    return (<span className='calendar-day-modal__instructions'>Select an event to see its details</span>);
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
                    {instructions(props.events)}
                    {events(props.events, props)}
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