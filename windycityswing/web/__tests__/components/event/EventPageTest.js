import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

import EventPage from '..\\..\\..\\src\\scripts\\components\\event\\EventPage';

it('renders correctly', () => {
    expect(renderer.create(<EventPage match={{params: {eventName: 'fizz', date: '2017-07-03'}}}/>).toJSON()).toMatchSnapshot();
});

it('has the correct Google Calendar link', () => {
    const tree = shallow(<EventPage match={{params: {eventName: 'fizz', date: '2017-07-03'}}}/>);

    const googleCalendarLink = tree.find('.event-details__link--gcal');

    expect(googleCalendarLink.props().href).toEqual(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Fizz&dates=20170704T010000Z/20170704T050000Z&details=Occurs every Monday.%0D%0AAll ages event.&location=Lion Head Pub, 2251 N Lincoln Ave 2nd Floor,+Chicago,+IL 60614#eventpage_6`);
});