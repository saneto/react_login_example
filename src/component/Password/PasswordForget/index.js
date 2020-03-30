import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withBackaccessContext } from '../../BackEnd';
import * as ROUTES from '../../../const/routes';

const PasswordForgetPage = () => (
	<section id="user-profile">
		<div className="container">
			<div className="row">
					<div className="section-title line-style">	
						<h3 className="title">Password Forget</h3>
					</div>
					<PasswordForgetForm />
			</div>
		</div>
	</section>
);

const INITIAL_STATE = {
	email: '',
	error: null,
};

class PasswordForgetFormBase extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
	}

	onSubmit = event => {
		const { email } = this.state;

		this.props.firebase
			.doPasswordReset(email)
			.then(() => {
				this.setState({ ...INITIAL_STATE });
			})
			.catch(error => {
				this.setState({ error });
			});

		event.preventDefault();
	};

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const { email, error } = this.state;
		return (
			<form onSubmit={this.onSubmit} className="grey-box">
				<span className="text">
					Password Forget				
				</span>
				<input value={email} onChange={this.onChange} type="password" className="form-control" id="email" name="email" placeholder="Email Address"/>
				<button type="submit" className="btn btn-default">Reset My Password</button>	
				{error && <p>{error.message}</p>}							
			</form>
		);
	}
}

const PasswordForgetLink = () => (
	<p>
		<Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
	</p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withBackaccessContext(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };