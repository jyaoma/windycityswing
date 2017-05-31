import React from 'react';
import renderer from 'react-test-renderer';

import EventPage from '..\\..\\..\\src\\scripts\\components\\event\\EventPage';

it('renders correctly', () => {
    expect(renderer.create(<EventPage match={{params: {eventName: 'test-event-name'}}}/>))
});