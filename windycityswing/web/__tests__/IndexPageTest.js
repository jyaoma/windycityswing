jest.unmock('../src/scripts/IndexPage');

import React from 'react';
import { shallow } from 'enzyme';

import IndexPage from '../src/scripts/IndexPage';

describe('Index Page', () => {
    let tree;

    beforeEach(() => {
        tree = shallow(<IndexPage/>);
    });

    it('renders the headers correctly', () => {
        expect(tree.find('span').at(0).text()).toEqual('Welcome to Jeremy\'s Web Host!');
        expect(tree.find('span').at(1).text()).toEqual('Pick one of the sites below:');
    });

    describe('links', () => {
        it('has a link to Windy City Swing', () => {
            expect(tree.find('a').at(0).props().children).toEqual('Windy City Swing');
        });

        it('has a link to the 2017 valentines day website', () => {
            expect(tree.find('a').at(1).props().children).toEqual('Valentines Day 2017');
        });
    });
});