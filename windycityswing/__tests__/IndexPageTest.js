jest.unmock('../src/scripts/IndexPage');

import React from 'react';
import { mount } from 'enzyme';

import IndexPage from '../src/scripts/IndexPage';

describe('Index Page', () => {
    let tree;

    beforeEach(() => {
        tree = mount(<IndexPage/>);
    });

    it('renders the headers correctly', () => {
        expect(tree.find('span').at(0).text()).toEqual('Welcome to Jeremy\'s Web Host!');
        expect(tree.find('span').at(1).text()).toEqual('Pick one of the sites below:');
    });

    describe('links', () => {
        it('has a link to Windy City Swing', () => {
            expect(tree.find('Link').at(0).text()).toEqual('Windy City Swing');
        });

        it('has a link to the 2017 valentines day website', () => {
            expect(tree.find('Link').at(1).text()).toEqual('Valentines Day 2017');
        });
    });
});