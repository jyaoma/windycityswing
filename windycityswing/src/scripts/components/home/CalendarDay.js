import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

import history from '../../history';

const events = (eventList, componentProps) => {
    if (!eventList || eventList.length === 0) {
        return null;
    } else {
        const renderedEventList = [];
        for (let i = 0; i < eventList.length; i++) {
            const event = eventList[i];

            let date = moment(event.timezone.startTimestamp, 'YYYYMMDDTHHmmss').format('YYYY-MM-DD');
            if (event.recurrence && event.recurrence.rule !== 'None') {
                date = event.date.year.toString();
                let monthString = componentProps.month.toString();
                if (componentProps.month < 10) {
                    monthString = '0' + monthString;
                }

                date = date + '-' + monthString;

                let dayString = componentProps.day.toString();
                if (componentProps.day < 10) {
                    dayString = '0' + dayString;
                }

                date = date + '-' + dayString;
            }

            renderedEventList.push(<div className={'mdHidden calendar-day__event event--'+event.className} key={i*2}/>);
            renderedEventList.push(<span onClick={() => {history.push('/WindyCitySwing__'+event.className+'--'+date)}} className={'xsHidden calendar-day__event event--'+event.className} key={i*2+1}>{event.title}</span>);
        }
        return renderedEventList;
    }
};

const CalendarDay = (props) => {
    if (!props || !props.day) {
        return <td></td>;
    }
    return (
    <td className='calendar-day' onClick={() => {props.onClick(props.day, props.events)}}>
        <span>{props.day}</span>
        <div className='calendar-day__events'>
            {events(props.events, props)}
        </div>
    </td>);
};

CalendarDay.propTypes = {
    day: PropTypes.number,
    events: PropTypes.array,
    onClick: PropTypes.func,
    month: PropTypes.number
}

export default CalendarDay;