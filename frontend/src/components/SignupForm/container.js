import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SignupForm from './presenter';

class Container extends Component {
    state = {
        email :"",//로그인 이메일
        password1 : "",//비밀번호,
        password2 : "",
        username: "",//닉네임
        name: ""//실제 이름
    };

    static propTypes ={
        createAccount : PropTypes.func.isRequired
    };

    render() {
        const { username, email, name,password1, password2} = this.state;
        return (
            <SignupForm 
                usernameValue = {username}
                emailValue = {email}
                nameValue = {name}
                password1Value= {password1}
                password2Value= {password2}
                handleInputChange = {this._handleInputChange}
                handleSubmit={this._handleSubmit}
            />
        )
    };

    _handleInputChange = event => {
        const { target : { value, name}} = event;
        this.setState({
            [name] : value//name은 뭐든 가능!
        });
    }
    _handleSubmit = event => {
        const { createAccount } = this.props;
        const { username, email, name,password1, password2} = this.state;
        event.preventDefault();
        // redux will be here
        createAccount(username, email, name, password1, password2);
    }
}

export default Container;
