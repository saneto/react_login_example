import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withBackaccessContext } from '../../BackEnd';
import * as ROUTES from '../../../const/routes';

const SignUpPage = () => (
  <div>
    <h1>Register</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  name: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = 'le compte existe deja';

const ERROR_MSG_ACCOUNT_EXISTS = ` error`;

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

     onSubmit = event => {
         console.log(this.state)
        const { username,name, email, passwordOne } = this.state;
        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                let uid=authUser.user.uid;
                let src = "https://firebasestorage.googleapis.com/v0/b/superp2-8a0d2.appspot.com/o/images%2Fdefault_photo%2F250px-Ouisticram-Pt.png?alt=media&token=c48c3326-e329-4faa-838c-40454802b632";
               this.setState({uid : uid})
                return this.props.firebase.user(authUser.user.uid).set({
                    username,
                    name,
                    email,
                    uid,
                    src,
                });
            })
            .then(() => {
                let notifId = this.props.firebase.notifications().push().key;
                this.props.firebase.user(this.state.uid).update({
                    notifId: notifId
                });
                return this.props.firebase.doSendEmailVerification();
            })
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.ACCOUNT);
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
    this.setState({ [event.target.name]: event.target.value });
  };

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

        const   isInvalid =
                passwordOne !== passwordTwo ||
                passwordOne === '' ||
                email === '' ||
                name === '' ||
                username === '';

        return (
            <form onSubmit={this.onSubmit}>
                <div >
                    <label htmlFor="username"><b>User Name</b>
                    <input name="username"  value={username}  onChange={this.onChange} type="text"  placeholder="Full Name"   />
                    </label>

                    <label htmlFor="name"><b>Name</b>
                    <input name="name"  value={name}  onChange={this.onChange} type="text"  placeholder=" Name"   />
                    </label>

                    <label htmlFor="email"><b>Email Address</b>
                    <input name="email" value={email} onChange={this.onChange} type="text" placeholder="Email Address"  />
                    </label>

                    <label htmlFor="passwordOne"><b>Password</b>
                    <input name="passwordOne" value={passwordOne} onChange={this.onChange} type="password" placeholder="Password"  />
                    </label>

                    <label htmlFor="passwordTwo"><b>Confirm Password</b>
                    <input name="passwordTwo"  value={passwordTwo} onChange={this.onChange}  type="password" placeholder="Confirm Password"  />
                    </label>

                    <button  className="registerbtn" disabled={isInvalid} type="submit">
                        Sign Up
                    </button>
                    {error && <p>{error.message}</p>}
                </div>
            </form>
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
