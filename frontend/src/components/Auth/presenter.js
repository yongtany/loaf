import React from 'react';
import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';
import './styles.css';

const Auth = (props) => (
    <div className="container">
        {props.action === 'login' && <LoginForm />}
        {props.action === 'signup' && <SignupForm />}
        <div className="auth">
            {props.action === "login" && (
                <p>계정이 없으십니까?{" "}
                    <span onClick={props.changeAction}>
                        Sign up
                    </span>
                </p>
            )}
            {props.action === "signup" && (
                <p>계정이 있으십니까?{" "}
                    <span onClick={props.changeAction}>
                        Log in
                    </span>
                </p>
            )}
        </div>
    </div>
);

export default Auth;