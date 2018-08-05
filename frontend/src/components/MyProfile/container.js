import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MyProfile from './presenter';

class Container extends Component {
    state = {
        loggedIn : false
    };

    static propTypes ={
        getProfile : PropTypes.func.isRequired,
        logout : PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getProfile();
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.loggedInUser !== this.props.loggedInUser) {
          this.setState({
            loggedIn: true
          });
        }
      }

    render() {
        return(
            <MyProfile
             {...this.props}
             {...this.state}
            />
        )
    };
}

export default Container;