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
        expect(tree.find('h1').text()).toEqual('Welcome to Jeremy\'s Web Host!');
        expect(tree.find('h2').text()).toEqual('Pick one of the sites below:');
    });

    describe('links', () => {
        it('has a link to Windy City Swing', () => {
            expect(tree.find('Link').text()).toEqual('Windy City Swing');
        });
    });
});