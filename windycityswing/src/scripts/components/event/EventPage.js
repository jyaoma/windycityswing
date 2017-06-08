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

const eventTimeline = (event) => {
    if (!event.schedule || event.schedule.length === 0) {
        return null;
    }
    const schedule = event.schedule;
    const scheduleKeys = Object.keys(schedule);
    const result = [];
    for (let i = 0; i < scheduleKeys.length; i++) {
        const scheduleEvent = schedule[scheduleKeys[i]];
        let eventHour = scheduleEvent.hour;
        let eventAMPM = ' AM';
        let timeText;
        if (eventHour === 24 || eventHour === 0) {
            eventHour = 12;
            timeText = "Midnight";
        } else if (eventHour === 12) {
            timeText = "Noon";
        } else {
            if (eventHour > 12) {
                eventHour -= 12
                eventAMPM = ' PM'
            }
            timeText = eventHour + ':' + (scheduleEvent.minute < 10 ? '0' : '') + scheduleEvent.minute + eventAMPM;
        }
        result.push(
        <tr key={i*2-1}>
            <td className='event-details__schedule__time'>{timeText}</td>
            <td className='event-details__schedule__event'>{scheduleEvent.event}</td>
        </tr>);
        if (i < scheduleKeys.length - 1) {
            const nextEvent = schedule[scheduleKeys[i+1]];

            let hoursUntilNextEvent = nextEvent.hour - scheduleEvent.hour;
            if (hoursUntilNextEvent < 0) {
                hoursUntilNextEvent += 24;
            }

            let minutesUntilNextEvent = nextEvent.minute - scheduleEvent.minute;
            if (minutesUntilNextEvent < 0) {
                hoursUntilNextEvent--;
                minutesUntilNextEvent+=60;
            }

            let durationText = hoursUntilNextEvent + ' hr, ' + minutesUntilNextEvent + ' min';
            if (hoursUntilNextEvent === 0) {
                durationText = minutesUntilNextEvent + ' min';
            } else if (minutesUntilNextEvent === 0) {
                durationText = hoursUntilNextEvent + ' hr';
            }

            let heightIndicator = hoursUntilNextEvent;
            if (minutesUntilNextEvent >= 30) {
                heightIndicator++;
            }

            if (heightIndicator > 5) {
                heightIndicator = 5;
            }

            const durationCellHeights = ["one", "one", "two", "three", "four", "five"];
            const durationCellHeight = durationCellHeights[hoursUntilNextEvent];

            result.push(
            <tr key={i*2}>
                <td/>
                <td className={'event-details__schedule__duration event-details__schedule__duration-'+durationCellHeight}>{durationText}</td>
            </tr>
            );
        }
    }
    return result;
}

const EventPage = ({match}) => {
    const eventFinder = event => event.className === match.params.eventName;
    const event = dances.find(eventFinder);

    return (
    <div className='event-details'>
        <span className='event-details__title'>{event.title}</span>
        <span className='event-details__header'>DESCRIPTION</span>
        {eventDescription(event)}
        <span className='event-details__header'>SCHEDULE</span>
        <table>
            <tbody>
                {eventTimeline(event)}
            </tbody>
        </table>
    </div>);
}

export default EventPage;