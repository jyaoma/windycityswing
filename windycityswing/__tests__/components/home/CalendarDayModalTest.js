jest.mock('..\\..\\..\\src\\scripts\\history');

import React from 'react';
import renderer from 'react-test-renderer';
import { Router } from 'react-router';
import history from '..\\..\\..\\src\\scripts\\history'
import { shallow } from 'enzyme';

import CalendarDayModal from '..\\..\\..\\src\\scripts\\components\\home\\CalendarDayModal';

let tree;

const testEvent = {
    "title": "Test Event",
    "className": "test-event",
    "date": {
        "year": 2017,
        "month": 5,
        "day": 1,
        "weekday": 3
    },
    "location": {
        "addressName": "Test Locaiton"
    }
};

const testEventTwo = {
    "title": "Another test event",
    "className": "test-event-two",
    "date": {
        "year": 2017,
        "month": 5,
        "day": 1,
        "weekday": 3
    },
    "location": {
        "addressName": "Test Locaiton"
    }
};

const passedInEvents = [testEvent, testEventTwo];
const closeModal = jest.fn();

beforeEach(() => {
    tree = shallow(<CalendarDayModal
                        day={1}
                        events={passedInEvents}
                        hidden={false}
                        closeModal={closeModal}
                        month={5}
                        weekday={3}/>);
});

it('should render correctly', () => {
    expect(renderer.create(<Router history={history}><CalendarDayModal
                                day={1}
                                events={[testEvent]}
                                hidden={false}
                                closeModal={closeModal}
                                month={5}
                                weekday={3}/></Router>).toJSON()).toMatchSnapshot();
});

it('should hide', () => {
    tree = shallow(<CalendarDayModal day={1} events={passedInEvents} hidden={true}/>)
    expect(tree.find('.calendar-day-modal__event').length).toEqual(0);
});

it('should render the same number of events as passed into the modal', () => {
    expect(tree.find('.calendar-day-modal__event').length).toEqual(passedInEvents.length);
});

it('can be closed', () => {
    expect(tree.find('.calendar-day-modal__close-container').props().onClick).toEqual(closeModal);
});

describe('instructions', () => {
    it('shows', () => {
        expect(tree.find('.calendar-day-modal__instructions').length).toEqual(1);
    });

    it('hides when there are no events', () => {
        tree = shallow(<CalendarDayModal
                        day={1}
                        events={[]}
                        hidden={false}
                        closeModal={closeModal}
                        month={5}
                        weekday={3}/>);
        expect(tree.find('.calendar-day-modal__instructions').length).toEqual(0);
    });
});

describe('events', () => {
    it('leads to the event detail page', () => {
        history.push = jest.fn();
        tree.find('.calendar-day-modal__event').at(0).props().onClick();
        expect(history.push).toBeCalledWith('/WindyCitySwing__test-event--2017-05-01');
    });
});