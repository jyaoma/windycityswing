import React from 'react';
import PropTypes from 'prop-types';

const CalendarDay = (props) => {
    if (!props || !props.day) {
        return <td></td>;
    }
    return <td className='calendar-day'>{props.day}</td>
};

CalendarDay.propTypes = {
    day: PropTypes.number
}

export default CalendarDay;