import React from 'react';
import { connect } from 'react-redux';

class Container extends React.Component {
    render () {
        return (
            <div id="root">
                {this.props.children}
            </div>
        );
    }
}

export default Container;