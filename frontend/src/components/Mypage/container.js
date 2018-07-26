import React, { Component } from 'react';
import Mypage from './presenter';

class Container extends Component {
    render() {
        return (
            <Mypage {...this.props} />
        )
    }
}



export default Container;
