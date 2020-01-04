import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { withBackaccessContext } from '../../BackEnd';
import * as ROUTES from '../../../const/routes';
import { PasswordForgetLink } from '../../Password/PasswordForget';

	const SignInPage = () => (
			<div >
				<h1>SignIn</h1>
				<SignInForm />
				<PasswordForgetLink />
				<SignUpLink />
			</div>
	);

const INITIAL_STATE = {
	email: '',
	password: '',
	error: null,
};

class SignInFormBase extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
	}

	onSubmit = event => {
		const { email, password } = this.state;
		this.props.backaccess
			.dosignWithEmailAndPassword({email : email, password : password})
			.then(() => {
				this.setState({ ...INITIAL_STATE });
				this.props.history.push(ROUTES.HOME);
				console.log("ok")
			})
			.catch(error => {
				console.log("ok")
				this.setState({ error });
			});

		event.preventDefault();
	};

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const { email, password, error } = this.state;

		const isInvalid = password === '' || email === '';

		return (
			<form onSubmit={this.onSubmit}>
				<label htmlFor="email"><b>Email</b>
				<input
					name="email"
					value={email}
					onChange={this.onChange}
					type="text"
					placeholder="Email Address"
				/></label>
				<label htmlFor="password"><b>Password</b>
				<input
					name="password"
					value={password}
					onChange={this.onChange}
					type="password"
					placeholder="Password"
				/></label>
				<button className="registerbtn" disabled={isInvalid} type="submit">
					Sign In
				</button>

				{error && <p>{error.message}</p>}
			</form>
		);
	}
}

const SignInForm = compose(
	withRouter,
	withBackaccessContext,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };