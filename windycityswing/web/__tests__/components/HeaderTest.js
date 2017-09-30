import React from 'react';
import renderer from 'react-test-renderer';

import Header from '..\\..\\..\\src\\scripts\\components\\Header';

it('renders correctly', () => {
    expect(renderer.create(<Header/>).toJSON()).toMatchSnapshot();
});