import React from 'react';

const moment = require('moment');

import dances from '../../../../dances/dances';

import CalendarDay from './CalendarDay';
import CalendarDayModal from './CalendarDayModal';

class HomePage extends React.Component {
    constructor (props, context) {
        super(props, context);

        this.state = {
            currentMonth: Number(moment().format('M')),
            currentYear: Number(moment().format('YYYY')),
            currentMonthString: moment().format('YYYY') + '-' + moment().format('MM') + '-01',
            events: dances,
            modalHidden: true,
            modalDay: 0,
            modalEvents: [],
            modalWeekday: -1
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.goToPreviousMonth = this.goToPreviousMonth.bind(this);
        this.goToNextMonth = this.goToNextMonth.bind(this);
    }

    isAnException(event, day) {
        if (event.recurrence && event.recurrence.exceptions) {
            let dayString = day.toString();
            if (day < 10) {
                dayString = '0' + dayString;
            }
            dayString = '-' + dayString;
            const exceptionString = this.state.currentMonthString.replace('-01', dayString);
            const exceptionFinder = (exception) => {return exception === exceptionString}
            return event.recurrence.exceptions.filter(exceptionFinder).length > 0
        }
        return false;
    }

    renderCalendar () {
        const dayOfTheWeekOfTheFirstDayOfTheMonth = Number(moment(this.state.currentMonthString).format('d'));
        const daysInEachMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const maxDaysInCurrentMonth = daysInEachMonth[this.state.currentMonth - 1];
        let currentDay = 1;

        const eventMap = {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: [],
            10: [],
            11: [],
            12: [],
            13: [],
            14: [],
            15: [],
            16: [],
            17: [],
            18: [],
            19: [],
            20: [],
            21: [],
            22: [],
            23: [],
            24: [],
            25: [],
            26: [],
            27: [],
            28: [],
            29: [],
            30: [],
            31: []
        }

        for (let i = 0; i < this.state.events.length; i++) {
            const event = this.state.events[i];
            if (event.date.year === this.state.currentYear && event.date.month === this.state.currentMonth && (!event.recurrence || !event.recurrence.rule || event.recurrence.rule === 'none')) {
                eventMap[event.date.day].push(event);
            }
            if (event.recurrence) {
                if (event.recurrence.rule === 'dayOfWeek') {
                    let currentDayOfEvent = event.recurrence.dayOfWeek - dayOfTheWeekOfTheFirstDayOfTheMonth + 1;
                    if (currentDayOfEvent > 0 && !this.isAnException(event, currentDayOfEvent)) {
                        eventMap[(event.recurrence.dayOfWeek - dayOfTheWeekOfTheFirstDayOfTheMonth + 1)].push(event);
                    }
                    currentDayOfEvent+=7;
                    if (!this.isAnException(event, currentDayOfEvent)) {
                        eventMap[currentDayOfEvent].push(event);
                    }
                    currentDayOfEvent+=7;
                    if (!this.isAnException(event, currentDayOfEvent)) {
                        eventMap[currentDayOfEvent].push(event);
                    }
                    currentDayOfEvent+=7;
                    if (!this.isAnException(event, currentDayOfEvent)) {
                        eventMap[currentDayOfEvent].push(event);
                    }
                    currentDayOfEvent+=7;
                    if (currentDayOfEvent <= maxDaysInCurrentMonth && !this.isAnException(event, currentDayOfEvent)) {
                        eventMap[currentDayOfEvent].push(event);
                    }
                    currentDayOfEvent+=7;
                    if (currentDayOfEvent <= maxDaysInCurrentMonth && !this.isAnException(event, currentDayOfEvent)) {
                        eventMap[currentDayOfEvent].push(event);
                    }
                } else if (event.recurrence.rule === 'dayOfMonth' && !this.isAnException(event, event.recurrence.dayOfMonth)) {
                    eventMap[event.recurrence.dayOfMonth].push(event);
                } else if (event.recurrence.rule === 'dayOfWeekOfMonth') {
                    let dayOfEvent = event.recurrence.dayOfWeek - dayOfTheWeekOfTheFirstDayOfTheMonth + 1;
                    if (dayOfEvent <= 0) {
                        dayOfEvent += 7;
                    }

                    if (event.recurrence.weekOfMonth === -1) {
                        while (dayOfEvent + 7 <= maxDaysInCurrentMonth) {
                            dayOfEvent += 7;
                        }
                    } else {
                        dayOfEvent += (7 * event.recurrence.weekOfMonth);
                    }

                    if (!this.isAnException(event, dayOfEvent)) {
                        eventMap[dayOfEvent].push(event);
                    }
                }
            }

            const startTimestamp = moment(event.timezone.startTimestamp, 'YYYYMMDDTHHmmss');
            const endTimestamp = moment(event.timezone.endTimestamp, 'YYYYMMDDTHHmmss');
            if (startTimestamp.format('YYYYMMDD') !== endTimestamp.format('YYYYMMDD') && endTimestamp.from(startTimestamp).indexOf('days') !== -1 && event.date.month === this.state.currentMonth) {
                for (let i = 1; i <= Number(endTimestamp.from(startTimestamp).substr(3, 1)); i++) {
                    eventMap[event.date.day + i].push(event);
                }
            }
        }

        const firstWeek = <tr key={1} className='event-calendar__week-one'>
            <CalendarDay
                events={dayOfTheWeekOfTheFirstDayOfTheMonth === 0 ? eventMap[currentDay] : null}
                onClick={this.openModal}
                day={dayOfTheWeekOfTheFirstDayOfTheMonth === 0 ? currentDay++ : null}
                month={this.state.currentMonth}/>
            <CalendarDay
                events={dayOfTheWeekOfTheFirstDayOfTheMonth <= 1 ? eventMap[currentDay] : null}
                onClick={this.openModal}
                day={dayOfTheWeekOfTheFirstDayOfTheMonth <= 1 ? currentDay++ : null}
                month={this.state.currentMonth}/>
            <CalendarDay
                events={dayOfTheWeekOfTheFirstDayOfTheMonth <= 2 ? eventMap[currentDay] : null}
                onClick={this.openModal}
                day={dayOfTheWeekOfTheFirstDayOfTheMonth <= 2 ? currentDay++ : null}
                month={this.state.currentMonth}/>
            <CalendarDay
                events={dayOfTheWeekOfTheFirstDayOfTheMonth <= 3 ? eventMap[currentDay] : null}
                onClick={this.openModal}
                day={dayOfTheWeekOfTheFirstDayOfTheMonth <= 3 ? currentDay++ : null}
                month={this.state.currentMonth}/>
            <CalendarDay
                events={dayOfTheWeekOfTheFirstDayOfTheMonth <= 4 ? eventMap[currentDay] : null}
                onClick={this.openModal}
                day={dayOfTheWeekOfTheFirstDayOfTheMonth <= 4 ? currentDay++ : null}
                month={this.state.currentMonth}/>
            <CalendarDay
                events={dayOfTheWeekOfTheFirstDayOfTheMonth <= 5 ? eventMap[currentDay] : null}
                onClick={this.openModal}
                day={dayOfTheWeekOfTheFirstDayOfTheMonth <= 5 ? currentDay++ : null}
                month={this.state.currentMonth}/>
            <CalendarDay
                events={dayOfTheWeekOfTheFirstDayOfTheMonth <= 6 ? eventMap[currentDay] : null}
                onClick={this.openModal}
                day={dayOfTheWeekOfTheFirstDayOfTheMonth <= 6 ? currentDay++ : null}
                month={this.state.currentMonth}/>
        </tr>;

        const secondWeek = <tr key={2}>
                <CalendarDay events={eventMap[currentDay]} onClick={this.openModal} day={currentDay++} month={this.state.currentMonth}/>
                <CalendarDay events={eventMap[currentDay]} onClick={this.openModal} day={currentDay++} month={this.state.currentMonth}/>
                <CalendarDay events={eventMap[currentDay]} onClick={this.openModal} day={currentDay++} month={this.state.currentMonth}/>
                <CalendarDay events={eventMap[currentDay]} onClick={this.openModal} day={currentDay++} month={this.state.currentMonth}/>
                <CalendarDay events={eventMap[currentDay]} onClick={this.openModal} day={currentDay++} month={this.state.currentMonth}/>
                <CalendarDay events={eventMap[currentDay]} onClick={this.openModal} day={currentDay++} month={this.state.currentMonth}/>
                <CalendarDay events={eventMap[currentDay]} onClick={this.openModal} day={currentDay++} month={this.state.currentMonth}/>
            </tr>;

        const thirdWeek = <tr key={3}>
                <CalendarDay events={eventMap[currentDay]} onClick={this.openModal} day={currentDay++} month={this.state.currentMonth}/>
                <CalendarDay events={eventMap[currentDay]} onClick={this.openModal} day={currentDay++} month={this.state.currentMonth}/>
                <CalendarDay events={eventMap[currentDay]} onClick={this.openModal} day={currentDay++} month={this.state.currentMonth}/>
                <CalendarDay events={eventMap[currentDay]} onClick={this.openModal} day={currentDay++} month={this.state.currentMonth}/>
                <CalendarDay events={eventMap[currentDay]} onClick={this.openModal} day={currentDay++} month={this.state.currentMonth}/>
                <CalendarDay events={eventMap[currentDay]} onClick={this.openModal} day={currentDay++} month={this.state.currentMonth}/>
                <CalendarDay events={eventMap[currentDay]} onClick={this.openModal} day={currentDay++} month={this.state.currentMonth}/>
            </tr>;

        const fourthWeek = <tr key={4}>
                <CalendarDay events={eventMap[currentDay]} onClick={this.openModal} day={currentDay++} month={this.state.currentMonth}/>
                <CalendarDay events={eventMap[currentDay]} onClick={this.openModal} day={currentDay++} month={this.state.currentMonth}/>
                <CalendarDay events={eventMap[currentDay]} onClick={this.openModal} day={currentDay++} month={this.state.currentMonth}/>
                <CalendarDay events={eventMap[currentDay]} onClick={this.openModal} day={currentDay++} month={this.state.currentMonth}/>
                <CalendarDay events={eventMap[currentDay]} onClick={this.openModal} day={currentDay++} month={this.state.currentMonth}/>
                <CalendarDay events={eventMap[currentDay]} onClick={this.openModal} day={currentDay++} month={this.state.currentMonth}/>
                <CalendarDay events={eventMap[currentDay]} onClick={this.openModal} day={currentDay++} month={this.state.currentMonth}/>
            </tr>;

        let fifthWeek;
        if (maxDaysInCurrentMonth === 28 && dayOfTheWeekOfTheFirstDayOfTheMonth === 0) {
            fifthWeek = null;
        } else {
            fifthWeek = <tr key={5}>
                <CalendarDay
                    events={currentDay <= maxDaysInCurrentMonth ? eventMap[currentDay] : null}
                    onClick={this.openModal}
                    day={currentDay <= maxDaysInCurrentMonth ? currentDay++ : null}
                    month={this.state.currentMonth}/>
                <CalendarDay
                    events={currentDay <= maxDaysInCurrentMonth ? eventMap[currentDay] : null}
                    onClick={this.openModal}
                    day={currentDay <= maxDaysInCurrentMonth ? currentDay++ : null}
                    month={this.state.currentMonth}/>
                <CalendarDay
                    events={currentDay <= maxDaysInCurrentMonth ? eventMap[currentDay] : null}
                    onClick={this.openModal}
                    day={currentDay <= maxDaysInCurrentMonth ? currentDay++ : null}
                    month={this.state.currentMonth}/>
                <CalendarDay
                    events={currentDay <= maxDaysInCurrentMonth ? eventMap[currentDay] : null}
                    onClick={this.openModal}
                    day={currentDay <= maxDaysInCurrentMonth ? currentDay++ : null}
                    month={this.state.currentMonth}/>
                <CalendarDay
                    events={currentDay <= maxDaysInCurrentMonth ? eventMap[currentDay] : null}
                    onClick={this.openModal}
                    day={currentDay <= maxDaysInCurrentMonth ? currentDay++ : null}
                    month={this.state.currentMonth}/>
                <CalendarDay
                    events={currentDay <= maxDaysInCurrentMonth ? eventMap[currentDay] : null}
                    onClick={this.openModal}
                    day={currentDay <= maxDaysInCurrentMonth ? currentDay++ : null}
                    month={this.state.currentMonth}/>
                <CalendarDay
                    events={currentDay <= maxDaysInCurrentMonth ? eventMap[currentDay] : null}
                    onClick={this.openModal}
                    day={currentDay <= maxDaysInCurrentMonth ? currentDay++ : null}
                    month={this.state.currentMonth}/>
            </tr>;
        }

        let sixthWeek;
        if (currentDay > maxDaysInCurrentMonth) {
            sixthWeek = null;
        } else {
            sixthWeek = <tr key={6}>
                <CalendarDay
                    events={currentDay <= maxDaysInCurrentMonth ? eventMap[currentDay] : null}
                    onClick={this.openModal}
                    day={currentDay <= maxDaysInCurrentMonth ? currentDay++ : null}
                    month={this.state.currentMonth}/>
                <CalendarDay
                    events={currentDay <= maxDaysInCurrentMonth ? eventMap[currentDay] : null}
                    onClick={this.openModal}
                    day={currentDay <= maxDaysInCurrentMonth ? currentDay++ : null}
                    month={this.state.currentMonth}/>
                <CalendarDay
                    events={currentDay <= maxDaysInCurrentMonth ? eventMap[currentDay] : null}
                    onClick={this.openModal}
                    day={currentDay <= maxDaysInCurrentMonth ? currentDay++ : null}
                    month={this.state.currentMonth}/>
                <CalendarDay
                    events={currentDay <= maxDaysInCurrentMonth ? eventMap[currentDay] : null}
                    onClick={this.openModal}
                    day={currentDay <= maxDaysInCurrentMonth ? currentDay++ : null}
                    month={this.state.currentMonth}/>
                <CalendarDay
                    events={currentDay <= maxDaysInCurrentMonth ? eventMap[currentDay] : null}
                    onClick={this.openModal}
                    day={currentDay <= maxDaysInCurrentMonth ? currentDay++ : null}
                    month={this.state.currentMonth}/>
                <CalendarDay
                    events={currentDay <= maxDaysInCurrentMonth ? eventMap[currentDay] : null}
                    onClick={this.openModal}
                    day={currentDay <= maxDaysInCurrentMonth ? currentDay++ : null}
                    month={this.state.currentMonth}/>
                <CalendarDay
                    events={currentDay <= maxDaysInCurrentMonth ? eventMap[currentDay] : null}
                    onClick={this.openModal}
                    day={currentDay <= maxDaysInCurrentMonth ? currentDay++ : null}
                    month={this.state.currentMonth}/>
            </tr>;
        }
        return [firstWeek, secondWeek, thirdWeek, fourthWeek, fifthWeek, sixthWeek];
    }

    openModal (day, events) {
        let dayString = day.toString();
        if (day < 10) {
            dayString = '0' + dayString;
        }
        dayString = '-' + dayString;

        const weekday = moment(this.state.currentMonthString.replace('-01', dayString), 'YYYY-MM-DD').day();

        this.setState({
            modalHidden: false,
            modalDay: day,
            modalEvents: events,
            modalWeekday: weekday
        });
    }

    closeModal () {
        this.setState({
            modalHidden: true,
            modalDay: 0,
            modalEvents: []
        });
    }

    goToPreviousMonth () {
        let previousMonth = this.state.currentMonth - 1;
        let previousYear = this.state.currentYear;

        if (previousMonth === 0) {
            previousMonth = 12;
            previousYear--;
        }

        this.setState({
            currentMonth: previousMonth,
            currentYear: previousYear,
            currentMonthString: previousYear.toString() + '-' + (previousMonth < 10 ? '0' : '') + previousMonth.toString() + '-01'
        });
    }

    goToNextMonth () {
        let nextMonth = this.state.currentMonth + 1;
        let nextYear = this.state.currentYear;

        if (nextMonth === 13) {
            nextMonth = 1;
            nextYear++;
        }

        this.setState({
            currentMonth: nextMonth,
            currentYear: nextYear,
            currentMonthString: nextYear.toString() + '-' + (nextMonth < 10 ? '0' : '') + nextMonth.toString() + '-01'
        });
    }

    render () {
        document.title = 'Windy City Swing';
        return (
            <div className='windy-city-home'>
                <table className='event-calendar'>
                    <tbody>
                        <tr>
                            <td className='event-calendar__navigator' colSpan='2' onClick={this.goToPreviousMonth}>{'< Previous'}</td>
                            <td className='event-calendar__month' colSpan='3'>{moment(this.state.currentMonthString).format('MMMM YYYY')}</td>
                            <td className='event-calendar__navigator' colSpan='2' onClick={this.goToNextMonth}>{'Next >'}</td>
                        </tr>
                        <tr className='event-calendar__weekdays'>
                            <td className='event-calendar__weekday-name'>SUN</td>
                            <td className='event-calendar__weekday-name'>MON</td>
                            <td className='event-calendar__weekday-name'>TUE</td>
                            <td className='event-calendar__weekday-name'>WED</td>
                            <td className='event-calendar__weekday-name'>THU</td>
                            <td className='event-calendar__weekday-name'>FRI</td>
                            <td className='event-calendar__weekday-name'>SAT</td>
                        </tr>
                        {this.renderCalendar()}
                    </tbody>
                </table>
                <span className='event-calendar__instructions'>Select one of the days above to see the events happening on that day</span>
                <CalendarDayModal
                    hidden={this.state.modalHidden}
                    day={this.state.modalDay}
                    events={this.state.modalEvents}
                    closeModal={this.closeModal}
                    month={this.state.currentMonth}
                    weekday={this.state.modalWeekday}/>
            </div>
        );
    }
}

export default HomePage;