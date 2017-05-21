import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

import CalendarDay from '..\\..\\..\\src\\scripts\\components\\home\\CalendarDay';

describe('CalendarDay', () => {
    it('renders correctly', () => {
        expect(renderer.create(<CalendarDay day={1}/>).toJSON()).toMatchSnapshot();
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
    });
});