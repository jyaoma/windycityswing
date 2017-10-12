import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

import EventPage from '..\\..\\..\\src\\scripts\\components\\event\\EventPage';

it('renders correctly', () => {
    expect(renderer.create(<EventPage match={{params: {eventName: 'fizz', date: '2017-07-03'}}}/>).toJSON()).toMatchSnapshot();
});

it('has the correct Google Calendar link', () => {
    const tree = shallow(<EventPage match={{params: {eventName: 'fizz', date: '2017-07-03'}}}/>);

    tree.setState({
        event: {
            "title": "Fizz",
            "className": "fizz",
            "siteTitle": "Fizz",
            "date": {
                "year": 2017,
                "month": 5,
                "day": 1,
                "weekday": 1
            },
            "timezone": {
                "tzid": "America/Chicago",
                "startTimestamp": "20170502T200000",
                "endTimestamp": "20170503T000000"
            },
            "recurrence": {
                "rule": "dayOfWeek",
                "dayOfWeek": 1,
                "exceptions": ["2017-05-29"]
            },
            "facebookUrl": "https://www.facebook.com/Fizz-Swing-Dancing-73706742234/",
            "organizer": "Fizz Staff",
            "instructor": "Fizz Staff",
            "schedule": [
                {
                    "hour": 20,
                    "minute": 0,
                    "event": "Swing lesson"
                },
                {
                    "hour": 21,
                    "minute": 0,
                    "event": "Dancing"
                },
                {
                    "hour": 0,
                    "minute": 0,
                    "event": "End"
                }
            ],
            "info": [
                "Occurs every Monday.",
                "All ages event."
            ],
            "infoUrl": "",
            "attendance": "50-100",
            "music": {
                "type": "DJ",
                "url": "",
                "by": "Fizz Staff"
            },
            "floorSize": "Medium",
            "location": {
                "addressName": "Lion Head Pub",
                "addressOne": "2251 N Lincoln Ave",
                "addressTwo": "2nd Floor",
                "city": "Chicago",
                "state": "IL",
                "zip": "60614"
            },
            "dressCode": "Casual",
            "danceStyles": [
                "East coast swing",
                "Lindy hop",
                "Charleston",
                "Balboa"
            ],
            "parking": "Street parking",
            "price": "$7/person for general public, $5/person for students",
            "colors": {
                "bg": "#654639",
                "text": "white"
            }
        }
    })

    const googleCalendarLink = tree.find('.event-details__link--gcal');

    expect(googleCalendarLink.props().href).toEqual(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Fizz&dates=20170704T010000Z/20170704T050000Z&details=Occurs every Monday.%0D%0AAll ages event.&location=Lion Head Pub, 2251 N Lincoln Ave 2nd Floor,+Chicago,+IL 60614#eventpage_6`);
});