jest.unmock('..\\..\\src\\scripts\\components\\home\\HomePage');

import React from 'react';
import { mount, shallow } from 'enzyme';
import moment from 'moment';

import HomePage from '..\\..\\src\\scripts\\components\\home\\HomePage';

describe('Home Page', () => {
    let tree;

    const daysInEachMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthFromMoment = Number(moment().format('M'));

    beforeEach(() => {
        tree = mount(<HomePage/>);
    });

    describe('event table', () => {
        let eventTable;
        beforeEach(() => {
            eventTable = tree.find('.event-calendar');
        });

        it('has the current month shown in the first row', () => {
            const currentMonth = moment().format('MMMM YYYY');

            const eventTableMonth = eventTable.find('tr').at(0).find('td').at(1);
            expect(eventTableMonth.props().colSpan).toEqual('3');
            expect(eventTableMonth.props().children).toEqual(currentMonth);
        });

        it('has a link to the previous month', () => {
            const previousMonth = eventTable.find('.event-calendar__navigator');

            expect(previousMonth.at(0).text()).toEqual('Previous');
        });

        it('has the weekdays listed in the second row', () => {
            const weekdays = eventTable.find('.event-calendar__weekdays');

            expect(weekdays.children().at(0).text()).toEqual('SUN');
            expect(weekdays.children().at(1).text()).toEqual('MON');
            expect(weekdays.children().at(2).text()).toEqual('TUE');
            expect(weekdays.children().at(3).text()).toEqual('WED');
            expect(weekdays.children().at(4).text()).toEqual('THU');
            expect(weekdays.children().at(5).text()).toEqual('FRI');
            expect(weekdays.children().at(6).text()).toEqual('SAT');
        });

        it('has the first day of the month in the correct column of the first week in the calendar', () => {
            const firstWeek = eventTable.find('.event-calendar__week-one');
            const dayOfTheWeekOfTheFirstDayOfTheMonth = moment(moment().format('YYYY') + '-' + moment().format('MM') + '-01').format('d');

            expect(firstWeek.children().at(dayOfTheWeekOfTheFirstDayOfTheMonth).text()).toEqual('1');
        });

        it('has at least four weeks rendered with the headers', () => {
            expect(eventTable.find('tr').length).toBeGreaterThan(5);
        });

        it('has the exact number of days shown', () => {
            const numberOfDaysInCurrentMonth = daysInEachMonth[monthFromMoment - 1];
            expect(eventTable.find('.calendar-day').length).toEqual(numberOfDaysInCurrentMonth);
        });

        it('can go to the previous month', () => {
            let previousMonth = monthFromMoment - 1;
            let year = Number(moment().format('YYYY'));

            if (previousMonth === 0) {
                previousMonth = 12;
                year--;
            }
            const previousMonthName = monthNames[previousMonth - 1];
            const numberOfDaysInPreviousMonth = daysInEachMonth[previousMonth - 1];

            tree.find('.event-calendar__navigator').at(0).props().onClick();

            expect(tree.instance().state.currentMonth).toEqual(previousMonth);
            expect(tree.find('.event-calendar__month').text()).toEqual(previousMonthName + ' ' + year.toString());
            expect(tree.find('.calendar-day').length).toEqual(numberOfDaysInPreviousMonth);
        });

        it('can go to the next month', () => {
            let nextMonth = monthFromMoment + 1;
            let year = Number(moment().format('YYYY'));

            if (nextMonth === 13) {
                nextMonth = 1;
                year++;
            }
            const nextMonthName = monthNames[nextMonth - 1];
            const numberOfDaysInNextMonth = daysInEachMonth[nextMonth - 1];

            tree.find('.event-calendar__navigator').at(1).props().onClick();

            expect(tree.instance().state.currentMonth).toEqual(nextMonth);
            expect(tree.find('.event-calendar__month').text()).toEqual(nextMonthName + ' ' + year.toString());
            expect(tree.find('.calendar-day').length).toEqual(numberOfDaysInNextMonth);
        });

        it('sends an event to the correct day', () => {
            const testEvent = {
                "title": "Test Event",
                "date": {
                    "year": 2017,
                    "month": 5,
                    "day": 30,
                    "weekday": 3
                }
            };
            tree = shallow(<HomePage/>);
            tree.instance().setState({
                currentYear: 2017,
                currentMonth: 5,
                events: [testEvent]
            });

            const theDayThatThisEventShouldBeOn = tree.find('CalendarDay').at(30);

            expect(theDayThatThisEventShouldBeOn.props().events).toContainEqual(testEvent);
        });

        it('sends an event on the first day of the month', () => {
            const testEvent = {
                "title": "Test Event",
                "date": {
                    "year": 2017,
                    "month": 5,
                    "day": 1,
                    "weekday": 3
                }
            };
            tree = shallow(<HomePage/>);
            tree.instance().setState({
                currentYear: 2017,
                currentMonth: 5,
                events: [testEvent]
            });

            const theDayThatThisEventShouldBeOn = tree.find('CalendarDay').at(1);

            expect(theDayThatThisEventShouldBeOn.props().events).toContainEqual(testEvent);
        });

        it('sends an event on the last day of the month', () => {
            const testEvent = {
                "title": "Test Event",
                "date": {
                    "year": 2017,
                    "month": 5,
                    "day": 31,
                    "weekday": 3
                }
            };
            tree = shallow(<HomePage/>);
            tree.instance().setState({
                currentYear: 2017,
                currentMonth: 5,
                events: [testEvent]
            });

            const theDayThatThisEventShouldBeOn = tree.find('CalendarDay').at(31);

            expect(theDayThatThisEventShouldBeOn.props().events).toContainEqual(testEvent);
        });

        it('does not send an event to days that are not part of this month', () => {
            const testEvent = {
                "title": "Test Event",
                "date": {
                    "year": 2017,
                    "month": 5,
                    "day": 1,
                    "weekday": 3
                }
            };
            tree = shallow(<HomePage/>);
            tree.instance().setState({
                currentYear: 2017,
                currentMonth: 5,
                events: [testEvent]
            });

            const aDayThatThisEventShouldNotBeOn = tree.find('CalendarDay').at(0);

            expect(aDayThatThisEventShouldNotBeOn.props().events).toBeUndefined();
        });
    });
});