import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import guests from '../guests.json';

const resultList = (guests) => {
    const rows = [];

    for (let i = 0; i < guests.length; i++) {
        const guest = guests[i];

        rows.push(<Link key={i} className='search-results__result' to={`/jerissatothemoon-rsvp-${guest.groupNumber}`}>{guest.name}</Link>);
    }

    return rows;
}

const SearchResults = (props) => {
    if (props.query.length < 3) {
        return <span className='search-results__invalid-query'>Please enter at least three characters to search</span>;
    }

    const results = [];

    for (let groupNumber = 0; groupNumber < guests.length; groupNumber++) {
        const group = guests[groupNumber];
        for (let i = 0; i < group.length; i++) {
            const guestName = group[i];
            if (guestName.indexOf(props.query) !== -1) {
                results.push({name: guestName, groupNumber})
            }
        }
    }

    return <div className='search-results'>
            {resultList(results)}
        </div>;
}

SearchResults.propTypes = {
    query: PropTypes.string
}

export default SearchResults;