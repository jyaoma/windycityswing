import React from 'react';
const moment = require('moment');

import dances from '../../../../dances/dances';

import CalendarDay from './CalendarDay';

class HomePage extends React.Component {
    constructor (props, context) {
        super(props, context);

        this.state = {
            currentMonth: Number(moment().format('M')),
            currentYear: Number(moment().format('YYYY')),
            currentMonthString: moment().format('YYYY') + '-' + moment().format('MM') + '-01',
            events: dances
        };

        this.goToPreviousMonth = this.goToPreviousMonth.bind(this);
        this.goToNextMonth = this.goToNextMonth.bind(this);
    }

    renderCalendar () {
        const dayOfTheWeekOfTheFirstDayOfTheMonth = moment(this.state.currentMonthString).format('d');
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
            if (event.date.year === this.state.currentYear && event.date.month === this.state.currentMonth) {
                eventMap[event.date.day].push(event);
            }
        }

        const firstWeek = <tr key={1} className='event-calendar__week-one'>
            <CalendarDay
                events={dayOfTheWeekOfTheFirstDayOfTheMonth === 0 ? eventMap[currentDay] : undefined}
                day={dayOfTheWeekOfTheFirstDayOfTheMonth === 0 ? currentDay++ : undefined}/>
            <CalendarDay
                events={dayOfTheWeekOfTheFirstDayOfTheMonth <= 1 ? eventMap[currentDay] : undefined}
                day={dayOfTheWeekOfTheFirstDayOfTheMonth <= 1 ? currentDay++ : undefined}/>
            <CalendarDay
                events={dayOfTheWeekOfTheFirstDayOfTheMonth <= 2 ? eventMap[currentDay] : undefined}
                day={dayOfTheWeekOfTheFirstDayOfTheMonth <= 2 ? currentDay++ : undefined}/>
            <CalendarDay
                events={dayOfTheWeekOfTheFirstDayOfTheMonth <= 3 ? eventMap[currentDay] : undefined}
                day={dayOfTheWeekOfTheFirstDayOfTheMonth <= 3 ? currentDay++ : undefined}/>
            <CalendarDay
                events={dayOfTheWeekOfTheFirstDayOfTheMonth <= 4 ? eventMap[currentDay] : undefined}
                day={dayOfTheWeekOfTheFirstDayOfTheMonth <= 4 ? currentDay++ : undefined}/>
            <CalendarDay
                events={dayOfTheWeekOfTheFirstDayOfTheMonth <= 5 ? eventMap[currentDay] : undefined}
                day={dayOfTheWeekOfTheFirstDayOfTheMonth <= 5 ? currentDay++ : undefined}/>
            <CalendarDay
                events={dayOfTheWeekOfTheFirstDayOfTheMonth <= 6 ? eventMap[currentDay] : undefined}
                day={dayOfTheWeekOfTheFirstDayOfTheMonth <= 6 ? currentDay++ : undefined}/>
        </tr>;

        const secondWeek = <tr key={2}>
                <CalendarDay events={eventMap[currentDay]} day={currentDay++}/>
                <CalendarDay events={eventMap[currentDay]} day={currentDay++}/>
                <CalendarDay events={eventMap[currentDay]} day={currentDay++}/>
                <CalendarDay events={eventMap[currentDay]} day={currentDay++}/>
                <CalendarDay events={eventMap[currentDay]} day={currentDay++}/>
                <CalendarDay events={eventMap[currentDay]} day={currentDay++}/>
                <CalendarDay events={eventMap[currentDay]} day={currentDay++}/>
            </tr>;

        const thirdWeek = <tr key={3}>
                <CalendarDay events={eventMap[currentDay]} day={currentDay++}/>
                <CalendarDay events={eventMap[currentDay]} day={currentDay++}/>
                <CalendarDay events={eventMap[currentDay]} day={currentDay++}/>
                <CalendarDay events={eventMap[currentDay]} day={currentDay++}/>
                <CalendarDay events={eventMap[currentDay]} day={currentDay++}/>
                <CalendarDay events={eventMap[currentDay]} day={currentDay++}/>
                <CalendarDay events={eventMap[currentDay]} day={currentDay++}/>
            </tr>;

        const fourthWeek = <tr key={4}>
                <CalendarDay events={eventMap[currentDay]} day={currentDay++}/>
                <CalendarDay events={eventMap[currentDay]} day={currentDay++}/>
                <CalendarDay events={eventMap[currentDay]} day={currentDay++}/>
                <CalendarDay events={eventMap[currentDay]} day={currentDay++}/>
                <CalendarDay events={eventMap[currentDay]} day={currentDay++}/>
                <CalendarDay events={eventMap[currentDay]} day={currentDay++}/>
                <CalendarDay events={eventMap[currentDay]} day={currentDay++}/>
            </tr>;

        let fifthWeek;
        if (maxDaysInCurrentMonth === 28 && dayOfTheWeekOfTheFirstDayOfTheMonth === 0) {
            fifthWeek = null;
        } else {
            fifthWeek = <tr key={5}>
                <CalendarDay events={currentDay <= maxDaysInCurrentMonth ? eventMap[currentDay] : undefined} day={currentDay <= maxDaysInCurrentMonth ? currentDay++ : undefined}/>
                <CalendarDay events={currentDay <= maxDaysInCurrentMonth ? eventMap[currentDay] : undefined} day={currentDay <= maxDaysInCurrentMonth ? currentDay++ : undefined}/>
                <CalendarDay events={currentDay <= maxDaysInCurrentMonth ? eventMap[currentDay] : undefined} day={currentDay <= maxDaysInCurrentMonth ? currentDay++ : undefined}/>
                <CalendarDay events={currentDay <= maxDaysInCurrentMonth ? eventMap[currentDay] : undefined} day={currentDay <= maxDaysInCurrentMonth ? currentDay++ : undefined}/>
                <CalendarDay events={currentDay <= maxDaysInCurrentMonth ? eventMap[currentDay] : undefined} day={currentDay <= maxDaysInCurrentMonth ? currentDay++ : undefined}/>
                <CalendarDay events={currentDay <= maxDaysInCurrentMonth ? eventMap[currentDay] : undefined} day={currentDay <= maxDaysInCurrentMonth ? currentDay++ : undefined}/>
                <CalendarDay events={currentDay <= maxDaysInCurrentMonth ? eventMap[currentDay] : undefined} day={currentDay <= maxDaysInCurrentMonth ? currentDay++ : undefined}/>
            </tr>;
        }

        let sixthWeek;
        if (currentDay > maxDaysInCurrentMonth) {
            sixthWeek = null;
        } else {
            sixthWeek = <tr key={6}>
                <CalendarDay events={currentDay <= maxDaysInCurrentMonth ? eventMap[currentDay] : undefined} day={currentDay <= maxDaysInCurrentMonth ? currentDay++ : undefined}/>
                <CalendarDay events={currentDay <= maxDaysInCurrentMonth ? eventMap[currentDay] : undefined} day={currentDay <= maxDaysInCurrentMonth ? currentDay++ : undefined}/>
                <CalendarDay events={currentDay <= maxDaysInCurrentMonth ? eventMap[currentDay] : undefined} day={currentDay <= maxDaysInCurrentMonth ? currentDay++ : undefined}/>
                <CalendarDay events={currentDay <= maxDaysInCurrentMonth ? eventMap[currentDay] : undefined} day={currentDay <= maxDaysInCurrentMonth ? currentDay++ : undefined}/>
                <CalendarDay events={currentDay <= maxDaysInCurrentMonth ? eventMap[currentDay] : undefined} day={currentDay <= maxDaysInCurrentMonth ? currentDay++ : undefined}/>
                <CalendarDay events={currentDay <= maxDaysInCurrentMonth ? eventMap[currentDay] : undefined} day={currentDay <= maxDaysInCurrentMonth ? currentDay++ : undefined}/>
                <CalendarDay events={currentDay <= maxDaysInCurrentMonth ? eventMap[currentDay] : undefined} day={currentDay <= maxDaysInCurrentMonth ? currentDay++ : undefined}/>
            </tr>;
        }
        return [firstWeek, secondWeek, thirdWeek, fourthWeek, fifthWeek, sixthWeek];
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
                            <td className='event-calendar__navigator' colSpan='2' onClick={this.goToPreviousMonth}>Previous</td>
                            <td className='event-calendar__month' colSpan='3'>{moment(this.state.currentMonthString).format('MMMM YYYY')}</td>
                            <td className='event-calendar__navigator' colSpan='2' onClick={this.goToNextMonth}>Next</td>
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
            </div>
        );
    }
}

export default HomePage;