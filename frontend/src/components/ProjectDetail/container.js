import React, { Component } from 'react';
import ProjectDetail from './presenter';

class Container extends Component {
    render(){
        return (
            <ProjectDetail
                {...this.props}
            />
        )
    }
}

export default Container;