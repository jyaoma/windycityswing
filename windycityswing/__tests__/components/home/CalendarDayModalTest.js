import React from 'react';
import renderer from 'react-test-renderer';
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
    expect(renderer.create(<CalendarDayModal
                                day={1}
                                events={[testEvent]}
                                hidden={false}
                                closeModal={closeModal}
                                month={5}
                                weekday={3}/>).toJSON()).toMatchSnapshot();
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