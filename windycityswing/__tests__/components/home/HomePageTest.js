jest.unmock('..\\..\\src\\scripts\\components\\home\\HomePage');

import React from 'react';
import { mount, shallow } from 'enzyme';
import moment from 'moment';

import HomePage from '..\\..\\src\\scripts\\components\\home\\HomePage';

let tree;

const testEvent = {
    "title": "Test Event",
    "date": {
        "year": 2017,
        "month": 5,
        "day": 30,
        "weekday": 3
    }
};

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
        tree.instance().setState({
            events: []
        });

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

    describe('handling event placement', () => {
        beforeEach(() => {
            tree = shallow(<HomePage/>);
        });

        it('sends an event to the correct day', () => {
            tree.instance().setState({
                currentYear: 2017,
                currentMonth: 5,
                currentMonthString: '2017-05-01',
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

            tree.instance().setState({
                currentYear: 2017,
                currentMonth: 5,
                currentMonthString: '2017-05-01',
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

            tree.instance().setState({
                currentYear: 2017,
                currentMonth: 5,
                currentMonthString: '2017-05-01',
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

            tree.instance().setState({
                currentYear: 2017,
                currentMonth: 5,
                currentMonthString: '2017-05-01',
                events: [testEvent]
            });

            const aDayThatThisEventShouldNotBeOn = tree.find('CalendarDay').at(0);

            expect(aDayThatThisEventShouldNotBeOn.props().events).toBeNull();
        });

        it('should have an onClick handler', () => {
            tree.instance().setState({
                currentYear: 2017,
                currentMonth: 5,
                currentMonthString: '2017-05-01',
                events: [testEvent]
            });

            expect(tree.find('CalendarDay').at(30).props().onClick).toEqual(tree.instance().openModal);
        });
    });

    describe('handing recurring events', () => {
        it('places a weekly event multiple times on the calendar', () => {
            const testEvent = {
                "title": "Test Event",
                "date": {
                    "year": 2017,
                    "month": 5,
                    "day": 2,
                    "weekday": 2
                },
                "recurrence": {
                    "rule": "dayOfWeek",
                    "dayOfWeek": 2
                }
            }

            tree.instance().setState({
                currentYear: 2017,
                currentMonth: 5,
                currentMonthString: '2017-05-01',
                events: [testEvent]
            });

            const days = tree.find('CalendarDay');

            expect(days.at(2).props().events).toContainEqual(testEvent);
            expect(days.at(9).props().events).toContainEqual(testEvent);
            expect(days.at(16).props().events).toContainEqual(testEvent);
            expect(days.at(23).props().events).toContainEqual(testEvent);
            expect(days.at(30).props().events).toContainEqual(testEvent);
        });

        it('does not place an event where there is an exception', () => {
            const testEvent = {
                "title": "Test Event",
                "date": {
                    "year": 2017,
                    "month": 5,
                    "day": 2,
                    "weekday": 2
                },
                "recurrence": {
                    "rule": "dayOfWeek",
                    "dayOfWeek": 2,
                    "exceptions": ["2017-05-23"]
                }
            }

            tree.instance().setState({
                currentYear: 2017,
                currentMonth: 5,
                currentMonthString: '2017-05-01',
                events: [testEvent]
            });

            const days = tree.find('CalendarDay');

            expect(days.at(2).props().events).toContainEqual(testEvent);
            expect(days.at(9).props().events).toContainEqual(testEvent);
            expect(days.at(16).props().events).toContainEqual(testEvent);
            expect(days.at(23).props().events).not.toContainEqual(testEvent);
            expect(days.at(30).props().events).toContainEqual(testEvent);
        });

        it('places a monthly event by day of month', () => {
            const testEvent = {
                "title": "Test Event",
                "date": {
                    "year": 2017,
                    "month": 5,
                    "day": 2,
                    "weekday": 2
                },
                "recurrence": {
                    "rule": "dayOfMonth",
                    "dayOfMonth": 2
                }
            }

            tree.instance().setState({
                currentYear: 2017,
                currentMonth: 5,
                currentMonthString: '2017-05-01',
                events: [testEvent]
            });

            expect(tree.find('CalendarDay').at(2).props().events).toContainEqual(testEvent);
        });

        it('does not place an monthly event by day of month if it is an exception', () => {
            const testEvent = {
                "title": "Test Event",
                "date": {
                    "year": 2017,
                    "month": 5,
                    "day": 2,
                    "weekday": 2
                },
                "recurrence": {
                    "rule": "dayOfMonth",
                    "dayOfMonth": 2,
                    "exceptions": ["2017-05-02"]
                }
            }

            tree.instance().setState({
                currentYear: 2017,
                currentMonth: 5,
                currentMonthString: '2017-05-01',
                events: [testEvent]
            });

            expect(tree.find('CalendarDay').at(2).props().events).not.toContainEqual(testEvent);
        });

        it('places a monthly event by day of week and week of month', () => {
            const testEvent = {
                "title": "Test Event",
                "date": {
                    "year": 2017,
                    "month": 5,
                    "day": 2,
                    "weekday": 2
                },
                "recurrence": {
                    "rule": "dayOfWeekOfMonth",
                    "dayOfWeek": 2,
                    "weekOfMonth": 2
                }
            }

            tree.instance().setState({
                currentYear: 2017,
                currentMonth: 5,
                currentMonthString: '2017-05-01',
                events: [testEvent]
            });

            expect(tree.find('CalendarDay').at(16).props().events).toContainEqual(testEvent);
        });

        it('does not place an monthly event by day of week of month if it is an exception', () => {
            const testEvent = {
                "title": "Test Event",
                "date": {
                    "year": 2017,
                    "month": 5,
                    "day": 2,
                    "weekday": 2
                },
                "recurrence": {
                    "rule": "dayOfWeekOfMonth",
                    "dayOfWeek": 2,
                    "weekOfMonth": 2,
                    "exceptions": ["2017-05-16"]
                }
            }

            tree.instance().setState({
                currentYear: 2017,
                currentMonth: 5,
                events: [testEvent]
            });

            expect(tree.find('CalendarDay').at(16).props().events).not.toContainEqual(testEvent);
        });
    });
});

describe('handling the modal', () => {
    beforeEach(() => {
        tree = shallow(<HomePage/>);
    });

    it('should be hidden by default', () => {
        expect(tree.find('CalendarDayModal').props().hidden).toBe(true);
    });

    it('should display with the event day and events', () => {
        const state = {
            modalHidden: false,
            modalDay: 31,
            modalEvents: [testEvent]
        };

        tree.instance().setState(state);

        const modalProps = tree.find('CalendarDayModal').props();

        expect(modalProps.hidden).toBe(state.modalHidden);
        expect(modalProps.day).toBe(state.modalDay);
        expect(modalProps.events).toEqual(state.modalEvents);
    });

    it('should display the day\'s weekday', () => {
        tree.instance().setState({
            currentMonthString: '2017-05-01'
        });

        tree.instance().openModal(31, [testEvent]);

        expect(tree.find('CalendarDayModal').props().weekday).toEqual(3);
    });

    it('should show the current month', () => {
        const state = {
            currentMonth: 5
        };
        tree.instance().setState(state);

        tree.instance().openModal(31, [testEvent]);

        expect(tree.find('CalendarDayModal').props().month).toEqual(state.currentMonth);
    });

    it('can close the modal', () => {
        const state = {
            modalHidden: false,
            modalDay: 31,
            modalEvents: [testEvent]
        };

        tree.instance().setState(state);

        expect(tree.find('CalendarDayModal').props().closeModal).not.toBeUndefined();
        expect(tree.find('CalendarDayModal').props().closeModal).toEqual(tree.instance().closeModal);
    });
});