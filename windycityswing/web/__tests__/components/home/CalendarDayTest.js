import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

import { Router } from 'react-router';
import createHistory from 'history/createBrowserHistory';

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
        },
        "timezone": {
            "startTimestamp": "20170501T210000",
            "endTimestamp": "20170501T220000"
        },
        "colors": {
            "bg": "#AAAAAA",
            "text": "black"
        }
    };
    let tree;

    beforeEach(() => {
        tree = shallow(<CalendarDay day={1} events={[testEvent]} month={5}/>);
    });

    it('renders correctly', () => {
        expect(renderer.create(<Router history={createHistory()}><CalendarDay day={1} events={[testEvent]} month={5}/></Router>).toJSON()).toMatchSnapshot();
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
        })
    });
});