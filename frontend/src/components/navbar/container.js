import React, { Component } from 'react';
import Navbar from './presenter';
import PropTypes from 'prop-types'

class Container extends Component {

    static propTypes ={
        logout : PropTypes.func.isRequired
    };
    
    render() {
        return (
            <Navbar  
            {...this.props}
            onClick = {this._onClick}
            />
        )
    }

    _onClick = () => {
        const { logout } = this.props;
        logout();
    }
}

export default Container;