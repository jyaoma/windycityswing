import React from 'react';
import renderer from 'react-test-renderer';

import WindyCitySwing from '..\\..\\..\\src\\scripts\\components\\WindyCitySwing';

it('renders correctly', () => {
    expect(renderer.create(<WindyCitySwing/>).toJSON()).toMatchSnapshot();
});