import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Projects from './presenter';

class Container extends Component {
    state= {
        loading: true
    };

    static propTypes ={ 
        getProjects: PropTypes.func.isRequired
    };

    componentWillReceiveProps = nextProps => {
        if(nextProps.feed){
            this.setState({
                loading: false
            })
        }
    }
    
    componentDidMount(){
        const { getProjects } = this.props;
        if(!this.props.feed){
            getProjects();
        } else {
            this.setState({
                loading:false
            })
        }
    }

    render() {
        const { feed } = this.props;
        return <Projects {...this.state}  feed={feed} />
    }
}

export default Container;