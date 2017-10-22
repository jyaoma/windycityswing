jest.unmock('../../../src/scripts/components/home/HomePage');
jest.mock('../../../src/scripts/history');

import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import moxios from 'moxios';

import HomePage from '../../../src/scripts/components/home/HomePage';
import history from '../../../src/scripts/history';

let tree;

const testEvent = {
    "title": "Test Event",
    "date": {
        "year": 2017,
        "month": 5,
        "day": 30,
        "weekday": 3
    },
    "timezone": {
        "startTimestamp": "20170530T210000",
        "endTimestamp": "20170530T220000"
    }
};

const monthFromMoment = Number(moment().format('M'));
const mockPushHistory = jest.fn();

beforeEach(() => {
    history.push = mockPushHistory;
    tree = shallow(<HomePage/>);
    moxios.install();
});

afterEach(() => {
    moxios.uninstall();
})

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

        expect(previousMonth.at(0).text()).toEqual('< Previous');
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

        eventTable = tree.find('.event-calendar');

        const firstWeek = eventTable.find('.event-calendar__week-one');
        const dayOfTheWeekOfTheFirstDayOfTheMonth = moment(moment().format('YYYY') + '-' + moment().format('MM') + '-01').format('d');

        expect(firstWeek.children().at(dayOfTheWeekOfTheFirstDayOfTheMonth).props().day).toEqual(1);
    });

    it('has at least four weeks rendered with the headers', () => {
        expect(eventTable.find('tr').length).toBeGreaterThan(5);
    });

    it('can go to the previous month', (done) => {
        let previousMonth = monthFromMoment - 1;
        let year = Number(moment().format('YYYY'));

        if (previousMonth === 0) {
            previousMonth = 12;
            year--;
        }

        tree.find('.event-calendar__navigator').at(0).props().onClick();

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: [{
                    title: "previous month's dances"
                }]
            }).then(() => {
                expect(tree.instance().state.currentMonth).toEqual(previousMonth);
                expect(tree.instance().state.currentYear).toEqual(year);
                expect(tree.instance().state.events[0].title).toEqual("previous month's dances");
                done();
            }, () => {
                fail();
            });
        });
    });

    it('changes the url when going to the previous month', (done) => {
        let previousMonth = monthFromMoment - 1;
        let year = Number(moment().format('YYYY'));

        if (previousMonth === 0) {
            previousMonth = 12;
            year--;
        }

        tree.find('.event-calendar__navigator').at(0).props().onClick();

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: [{
                    title: "previous month's dances"
                }]
            }).then(() => {
                expect(mockPushHistory).toBeCalledWith(`/WindyCitySwing-${year.toString()}-${previousMonth.toString()}`)
                done();
            }, () => {
                fail();
            });
        });
    });

    it('can go to the next month', (done) => {
        let nextMonth = monthFromMoment + 1;
        let year = Number(moment().format('YYYY'));

        if (nextMonth === 13) {
            nextMonth = 1;
            year++;
        }

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: [{
                    title: "next month's dances"
                }]
            }).then(() => {
                expect(tree.instance().state.currentMonth).toEqual(nextMonth);
                expect(tree.instance().state.currentYear).toEqual(year);
                expect(tree.instance().state.events[0].title).toEqual("next month's dances");
                done();
            }, () => {
                fail();
            });
        });

        tree.find('.event-calendar__navigator').at(1).props().onClick();
    });

    it('changes the url when going to the next month', (done) => {
        let nextMonth = monthFromMoment + 1;
        let year = Number(moment().format('YYYY'));

        if (nextMonth === 13) {
            nextMonth = 1;
            year++;
        }

        tree.find('.event-calendar__navigator').at(0).props().onClick();

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: [{
                    title: "previous month's dances"
                }]
            }).then(() => {
                expect(mockPushHistory).toBeCalledWith(`/WindyCitySwing-${year.toString()}-${nextMonth.toString()}`)
                done();
            }, () => {
                fail();
            });
        });
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
                },
                "timezone": {
                    "startTimestamp": "20170502T210000",
                    "endTimestamp": "20170502T220000"
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
                },
                "timezone": {
                    "startTimestamp": "20170502T210000",
                    "endTimestamp": "20170502T220000"
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
                },
                "timezone": {
                    "startTimestamp": "20170502T210000",
                    "endTimestamp": "20170502T220000"
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
                },
                "timezone": {
                    "startTimestamp": "20170502T210000",
                    "endTimestamp": "20170502T220000"
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
                },
                "timezone": {
                    "startTimestamp": "20170502T210000",
                    "endTimestamp": "20170502T220000"
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
                },
                "timezone": {
                    "startTimestamp": "20170502T210000",
                    "endTimestamp": "20170502T220000"
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
                },
                "timezone": {
                    "startTimestamp": "20170502T210000",
                    "endTimestamp": "20170502T220000"
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
                },
                "timezone": {
                    "startTimestamp": "20170502T210000",
                    "endTimestamp": "20170502T220000"
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
                },
                "timezone": {
                    "startTimestamp": "20170502T210000",
                    "endTimestamp": "20170502T220000"
                }
            }

            tree.instance().setState({
                currentYear: 2017,
                currentMonth: 5,
                currentMonthString: '2017-05-01',
                events: [testEvent]
            });

            expect(tree.find('CalendarDay').at(16).props().events).not.toContainEqual(testEvent);
        });

        it('places an event on the last day of week of month', () => {
            const testEvent = {
                "title": "Test Event",
                "date": {
                    "year": 2017,
                    "month": 4,
                    "day": 29,
                    "weekday": 6
                },
                "recurrence": {
                    "rule": "dayOfWeekOfMonth",
                    "dayOfWeek": 6,
                    "weekOfMonth": -1,
                    "exceptions": ["2017-05-16"]
                },
                "timezone": {
                    "startTimestamp": "20170429T210000",
                    "endTimestamp": "20170429T220000"
                }
            }

            tree.instance().setState({
                currentYear: 2017,
                currentMonth: 5,
                currentMonthString: '2017-05-01',
                events: [testEvent]
            });

            expect(tree.find('CalendarDay').at(27).props().events).toContainEqual(testEvent);
        });

        it('places an event on multiple days if it is a multiple day event', () => {
            const testEvent = {
                "title": "Test Event",
                "date": {
                    "year": 2017,
                    "month": 5,
                    "day": 2,
                    "weekday": 2
                },
                "recurrence": {
                    "rule": "none"
                },
                "timezone": {
                    "startTimestamp": "20170502T210000",
                    "endTimestamp": "20170504T220000"
                }
            }

            tree.instance().setState({
                currentYear: 2017,
                currentMonth: 5,
                currentMonthString: '2017-05-01',
                events: [testEvent]
            });

            expect(tree.find('CalendarDay').at(2).props().events).toContain(testEvent);
            expect(tree.find('CalendarDay').at(3).props().events).toContain(testEvent);
            expect(tree.find('CalendarDay').at(4).props().events).toContain(testEvent);
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