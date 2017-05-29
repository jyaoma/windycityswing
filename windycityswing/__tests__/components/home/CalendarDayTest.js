import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

import CalendarDay from '..\\..\\..\\src\\scripts\\components\\home\\CalendarDay';

describe('CalendarDay', () => {
    const testEvent = {
        "title": "Test Event",
        "className": "test-event",
        "date": {
            "year": 2017,
            "month": 5,
            "day": 1,
            "weekday": 3
        }
    };
    let tree;

    beforeEach(() => {
        tree = shallow(<CalendarDay day={1} events={[testEvent]}/>);
    });

    it('renders correctly', () => {
        expect(renderer.create(<CalendarDay day={1} events={[testEvent]}/>).toJSON()).toMatchSnapshot();
    });

    describe('rendering logic', () => {
        describe('when day is not undefined', () => {
            const tree = shallow(<CalendarDay day={1}/>);

            it('has className calendar-day', () => {
                expect(tree.props().className).toEqual('calendar-day');
            });

            it('shows what day it is', () => {
                expect(tree.text()).toEqual('1');
            });
        });

        describe('when day is invalid', () => {
            it('does not render when prop is not specified', () => {
                const tree = shallow(<CalendarDay/>);
                expect(tree.text()).toEqual('');
            });

            it('does not render when day is undefined', () => {
                const tree = shallow(<CalendarDay day={undefined}/>);
                expect(tree.text()).toEqual('');
            });
        });

        describe('when event is undefined', () => {
            it('does not render anything event related', () => {
                tree = shallow(<CalendarDay day={1}/>);
                expect(tree.find('.calendar-day__event').length).toEqual(0);
            });
        });

        describe('when event is specified', () => {
            it('renders the event', () => {
                expect(tree.find('.calendar-day__event').length).not.toEqual(0);
            });

            it('should have the className specified', () => {
                expect(tree.find('.calendar-day__event').at(0).props().className.indexOf(testEvent.className)).not.toEqual(-1);
            });
        })
    });
});