import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { PasswordForgetLink } from '../../Password/PasswordForget';

import { withBackaccessContext } from '../../BackEnd';
import * as ROUTES from '../../../const/routes';
import {store} from "react-notifications-component";

const SignUpPage = () => (
    <section id="user-profile">    
        <SignUpForm />
    </section>
);

const INITIAL_STATE = {
    username: '',
    name: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    isAdmin: false,
    formErrors: {username: '', name: '', email: '', passwordOne: '', passwordTwo: ''},
    usernameValid: false,
    nameValid: false,
    emailValid: false,
    passwordOneValid: false,
    passwordTwoValid: false,
    formValid: false,
    error: null
};

const ERROR_CODE_ACCOUNT_EXISTS = 'le compte existe deja';

const ERROR_MSG_ACCOUNT_EXISTS = ` error`;

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

     onSubmit = event => {
        const { username,name, email, passwordOne } = this.state;
        this.props.backaccess
            .doCreateUserWithEmailAndPassword({firstname: username, lastname: name, email : email, password : passwordOne})
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.ACCOUNT);
                store.addNotification({
                    title: 'Signup success',
                    message: 'Welcome aboard',
                    type: 'default',                         // 'default', 'success', 'info', 'warning'
                    container: 'bottom-right',                // where to position the notifications
                    animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                    animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                    dismiss: {
                        duration: 3000
                    }
                })
                console.log("ok")
            })
            .catch(error => {
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                error.message = ERROR_MSG_ACCOUNT_EXISTS;
                }
                this.setState({ error });
            });

        event.preventDefault();
  };

  onChange = event => {
      const name = event.target.name;
      const value = event.target.value;
      this.setState({ [event.target.name]: event.target.value },
          () => { this.validateField(name, value) });
  };

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let usernameValid = this.state.usernameValid;
        let nameValid = this.state.nameValid;
        let emailValid = this.state.emailValid;
        let passwordOneValid = this.state.passwordOneValid;
        let passwordTwoValid = this.state.passwordTwoValid;


        switch(fieldName) {
            case 'username':
                usernameValid = value.length >= 0;
                fieldValidationErrors.username = usernameValid ? '': ' must be superior to 6 characters';
                break;
            case 'name':
                nameValid = value.length >= 0;
                fieldValidationErrors.name = nameValid ? '': ' must be superior to 6 characters';
                break;
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'passwordOne':
                passwordOneValid = value.length >= 6;
                fieldValidationErrors.passwordOne = passwordOneValid ? '': ' must be superior to 6 characters';
                break;
            case 'passwordTwo':
                passwordTwoValid = value.length >= 6;
                fieldValidationErrors.passwordTwo = passwordTwoValid ? '': ' must be superior to 6 characters';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            usernameValid: usernameValid,
            nameValid: nameValid,
            emailValid: emailValid,
            passwordOneValid: passwordOneValid,
            passwordTwoValid: passwordTwoValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.usernameValid && this.state.nameValid && this.state.emailValid && this.state.passwordOneValid && this.state.passwordTwoValid});
    }

  onChangeCheckbox = event => {
        this.setState({ [event.target.name]: event.target.checked });
  };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
            name,
        } = this.state;


        return (
            <div class="container">
                <div class="row">
                    <div class="col-sm-9 col-md-7">
                        <div class="section-title line-style no-margin">
                            <h3 class="title">Create Account</h3>
                        </div>
                        <form onSubmit={this.onSubmit}>
                            <ul class="profile create">
                                <li>
                                    <span>User Name</span>
                                    <input  placeholder="Full Name"  value={username} onChange={this.onChange} type="text" class="form-control" name="username" id="username" />
                                </li>
                                { !this.state.usernameValid ? (
                                    <small className="color-red">{ "cant be blank" }</small>
                                ) : (
                                    ""
                                )}
                                <li>
                                    <span>Name</span>
                                    <input value={name}  onChange={this.onChange} type="text"  placeholder=" Name" class="form-control" name="name" id="name" />
                                </li>
                                { !this.state.nameValid ? (
                                    <small className="color-red">{ "cant be blank" }</small>
                                ) : (
                                    ""
                                )}
                                <li>
                                    <span>Email Address</span>
                                    <input type="text"  value={email}  onChange={this.onChange} placeholder="Email Address"  class="form-control" name="email" id="email" />
                                </li>
                                { !this.state.emailValid ? (
                                    <small className="color-red">{ "invalid email syntax" }</small>
                                ) : (
                                    ""
                                )}
                                <li>
                                    <span>Password</span>
                                    <input type="password" class="form-control" value={passwordOne} onChange={this.onChange} name="passwordOne" id="passwordOne" />
                                </li>
                                { !this.state.passwordOneValid ? (
                                    <small className="color-red">{ "password must have more than 6 character" }</small>
                                ) : (
                                    ""
                                )}
                                <li>
                                    <span>Pepeat Password</span>
                                    <input type="password" class="form-control" value={passwordTwo} onChange={this.onChange} name="passwordTwo" id="passwordTwo" />
                                </li>
                                { !this.state.passwordTwoValid ? (
                                    <small className="color-red">{ "password must have more than 6 character" }</small>
                                ) : (
                                    ""
                                )}
                            </ul>
                            <div class="text-right">
                                <button class="btn btn-default signin-button" type="submit" disabled={!this.state.formValid}><i class="fa fa-sign-in"></i> Sign up</button>
                                {error && <p>{error.message}</p>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

    const SignUpLink = () => (
        <p>
            Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
        </p>
    );

const SignUpForm = compose(
  withRouter,
  withBackaccessContext,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };