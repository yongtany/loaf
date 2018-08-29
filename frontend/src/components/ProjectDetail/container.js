import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ProjectDetail from './presenter';


class Container extends Component {

    static propTypes ={
        getProject : PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getProject(this.props.match.params.id);
    };

    render() {
        return(       
            <ProjectDetail
            {...this.props}
            />
        )
    };
}

export default Container;