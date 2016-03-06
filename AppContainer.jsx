/**
 * Root level application component
 * @module components/App/AppComponent
 */

import React, { PropTypes } from 'react';

export default React.createClass({
    propTypes: {
        children: PropTypes.node
    },

    render() {
        return (
            <div className='App'>
                { this.props.children }
            </div>
        );
    }
});
