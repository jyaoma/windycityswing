import React from 'react';

import SearchResults from './SearchResults';
import backgroundImage from '../images/background.png';
import bunnyPlatypusImage from '../images/rabbit_platypus.png';

class GuestSearch extends React.Component {
    constructor (props, context) {
        super(props, context);

        this.state = {
            query: ''
        };

        this.search = this.search.bind(this);
    }

    search (event) {
        this.setState({
            query: event.target.value
        })
    }

    render () {
        return (
            <div className="guest-search">
                <img className="guest-search-bg" src={backgroundImage}/>
                <div className="guest-search__content-container">
                    <img className="guest-search__bunny-platypus" src={bunnyPlatypusImage}/>
                    <p>Please enter your name as it is written in the invitation and click your name on the list.</p>
                    <input type="text" className="guest-search__input" placeholder=" Search..." onChange={this.search}/><br/>
                    <SearchResults query={this.state.query}/>
                </div>
            </div>
        );
    }
}

export default GuestSearch;