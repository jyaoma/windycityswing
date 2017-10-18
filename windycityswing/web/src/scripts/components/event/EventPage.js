import React from 'react';
import axios from 'axios';

import moment from 'moment-timezone';

class EventPage extends React.Component {
    constructor (props, context) {
        super(props, context);

        this.state = {
            event: null
        };
    }

    componentWillMount() {
        const dateParts = this.props.match.params.date.split('-');
        const year = Number(dateParts[0]);
        const month = Number(dateParts[1]);
        const day = Number(dateParts[2])
        axios.get(`http://${window.location.hostname}:8080/dances?year=${year.toString()}&month=${month.toString()}&day=${day.toString()}&id=${this.props.match.params.eventName}`).then((response) => {
            this.setState({
                event: response.data
            });
        });
    }

    eventDescription (event) {
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

    eventTimeline (event) {
        if (!event.schedule || event.schedule.length === 0) {
            return null;
        }
        const schedule = event.schedule;
        const result = [];
        for (let i = 0; i < schedule.length; i++) {
            const scheduleEvent = schedule[i];
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
            if (i < schedule.length - 1) {
                const nextEvent = schedule[i+1];

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
                const durationCellHeight = durationCellHeights[heightIndicator];

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

    eventLinks (event, date) {
        const results = [];
        if (!!event.infoUrl) {
            results.push(<a key='event' href={event.infoUrl} target='_blank' className='event-details__link'>
                <span className='event-details__link-text'>Home Page</span>
                <svg viewBox='0 0 16 16' stroke='white' fill='transparent' className='event-details__link-icon'>
                    <path d='M8 3 L1 3 L1 15 L13 15 L13 8'/>
                    <path d='M10 1 L15 1 L15 6'/>
                    <line x1='7' y1='9' x2='15' y2='1'/>
                </svg>
            </a>);
        }

        if (!!event.music.url && event.music.type === 'Live') {
            results.push(<a key='event' href={event.music.url} target='_blank' className='event-details__link'>
                <span className='event-details__link-text'>Band Info</span>
                <svg viewBox='0 0 16 16' stroke='white' fill='transparent' className='event-details__link-icon'>
                    <path d='M8 3 L1 3 L1 15 L13 15 L13 8'/>
                    <path d='M10 1 L15 1 L15 6'/>
                    <line x1='7' y1='9' x2='15' y2='1'/>
                </svg>
            </a>);
        }

        if (!!event.facebookUrl) {
            results.push(<a key='facebook' href={event.facebookUrl} target='_blank' className='event-details__link event-details__link--facebook'>
                <span className='event-details__link-text'>Facebook</span>
                <svg viewBox='0 0 16 16' stroke='white' fill='transparent' className='event-details__link-icon'>
                    <path d='M8 3 L1 3 L1 15 L13 15 L13 8'/>
                    <path d='M10 1 L15 1 L15 6'/>
                    <line x1='7' y1='9' x2='15' y2='1'/>
                </svg>
            </a>);
        }

        let description = event.info[0];

        for (let i = 1; i < event.info.length; i++) {
            description += '%0D%0A' + event.info[i];
        }

        const dateObject = moment(date, 'YYYY-MM-DD').hour(event.schedule[0].hour).minute(event.schedule[0].minute).second(0).tz('America/Chicago');

        const genericStart = event.timezone.startTimestamp;
        const genericStartYear = parseInt(genericStart.substr(0, 4));
        const genericStartMonth = parseInt(genericStart.substr(4, 2));
        const genericStartDay = parseInt(genericStart.substr(6, 2));

        const genericEnd = event.timezone.endTimestamp;
        const genericEndYear = parseInt(genericEnd.substr(0, 4));
        const genericEndMonth = parseInt(genericEnd.substr(4, 2));
        const genericEndDay = parseInt(genericEnd.substr(6, 2));

        const yearDifference = genericEndYear - genericStartYear;
        const monthDifference = genericEndMonth - genericStartMonth;
        const dayDifference = genericEndDay - genericStartDay;

        const lastScheduleEvent = event.schedule[event.schedule.length - 1];
        const endDateObject = moment(dateObject).add(yearDifference, 'years').add(monthDifference, 'months').add(dayDifference, 'days').hour(lastScheduleEvent.hour).minute(lastScheduleEvent.minute).second(0).tz('America/Chicago');

        description.replace(' ', '+');

        results.push(<a key='gcal' href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${event.title}&dates=${dateObject.tz('Greenwich').format('YYYYMMDDTHHmmss')}Z/${endDateObject.tz('Greenwich').format('YYYYMMDDTHHmmss')}Z&details=${description}&location=${event.location.addressName}, ${event.location.addressOne} ${event.location.addressTwo ? event.location.addressTwo : ''},+${event.location.city},+${event.location.state} ${event.location.zip}#eventpage_6`} target='_blank' className='event-details__link event-details__link--gcal'>
            <span className='event-details__link-text'>Google Calendar</span>
            <svg viewBox='0 0 16 16' stroke='white' fill='transparent' className='event-details__link-icon'>
                <path d='M8 3 L1 3 L1 15 L13 15 L13 8'/>
                <path d='M10 1 L15 1 L15 6'/>
                <line x1='7' y1='9' x2='15' y2='1'/>
            </svg>
        </a>);

        return results;
    }

    eventDate (date) {
        const today = moment();
        const dateObject = moment(date, 'YYYY-MM-DD');

        let relativeDateIndicator = '';

        if (today.month() === dateObject.month() && today.year() === dateObject.year()) {
            if (today.date() === dateObject.date()) {
                relativeDateIndicator = '(Tonight)';
            } else if ((today.date() - 1) === dateObject.date()) {
                relativeDateIndicator = '(Yesterday)';
            } else if ((today.date() + 1) === dateObject.date()) {
                relativeDateIndicator = '(Tomorrow)';
            }
        }

        return (<div className='event-details__date--container'>
        <span className='event-details__date'>{dateObject.format('dddd, MMMM Do')}</span>
        <span className='event-details__date--relative'>{relativeDateIndicator}</span>
        </div>);
    }

    eventMap (event) {
        let gmapsLocation = event.location.addressName + ', ' + event.location.addressOne + ', ' + event.location.city + ', ' + event.location.state;
        gmapsLocation = gmapsLocation.replace(/\s/g, '%20');
        gmapsLocation = gmapsLocation.replace(/,/g, '%2C');
        return <iframe className='event-details__map' src={'https://maps.google.com/maps?q=' + gmapsLocation + '&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=&output=embed'}/>;
    }

    render () {
        const event = this.state.event;

        if (event) {
            return (
            <div className='event-details'>
                <span className='event-details__title'>{event.title}</span>

                <div className='event-details__content'>
                    <div className='event-details__text-content'>
                        <span className='event-details__header'>LINKS</span>
                        <div className='event-details__links'>
                            {this.eventLinks(event, this.props.match.params.date)}
                        </div>

                        <span className='event-details__header'>DESCRIPTION</span>
                        {this.eventDescription(event)}

                        <span className='event-details__header'>LOCATION</span>
                        <span className='event-details__address-name'>{event.location.addressName}</span>
                        <span className='event-details__address-street'>{event.location.addressOne + (event.location.addressTwo ? ', ' + event.location.addressTwo : '')}</span>
                        <span className='event-details__address-city'>{event.location.city + ', ' + event.location.state + ' ' + event.location.zip}</span>

                        <span className='event-details__header'>PRICE</span>
                        <span className='event-details__price'>{event.price}</span>

                        <span className='event-details__header'>SCHEDULE</span>
                        {this.eventDate(this.props.match.params.date)}
                        <table>
                            <tbody>
                                {this.eventTimeline(event)}
                            </tbody>
                        </table>

                        <span className='event-details__header'>DRESS CODE</span>
                        <span className='event-details__dress-code'>{event.dressCode}</span>
                    </div>
                    <div className='event-details__map-container'>
                        <span className='event-details__header'>MAP</span>
                        {this.eventMap(event)}
                    </div>
                </div>
            </div>);
        } else {
            return <div className='event-details'/>;
        }
    }
}
export default EventPage;