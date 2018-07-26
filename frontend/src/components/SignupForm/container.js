import React, {Component} from 'react';
import PropTpyes from 'prop-types';
import SignupForm from './presenter';

class Container extends Component {
    state = {
        email: "",
        name : "",
        username: "",
        password : ""
    };

    render() {
        const { email, name, username, password} = this.state;
        return (
            <SignupForm />
        )
    };
}

export default Container;
