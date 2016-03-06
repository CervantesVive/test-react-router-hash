import React, { PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';

export default React.createClass({
    render() {
        return (
            <div>
                <div onClick={ this.onRegister }>Reg Button</div>
                <Link to='/register' >
                    Register Link
                </Link>
            </div>
        )
    },

    onRegister() {
        console.log('register button');
        browserHistory.push('/register');
    }
});
