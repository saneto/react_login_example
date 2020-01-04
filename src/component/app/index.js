import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import HomePage from '../Home';
import SignUpPage from '../Sign/SignUp';
import SignInPage from '../Sign/SignIn';
import LandingPage from '../Landing';

import * as ROUTES from '../../const/routes';
import { withAuthentification } from '../Session';

const App = () => (
	<Router>
		<div>

			<hr />
			<div  className="container">
        		<Route  exact path={ROUTES.LANDING} component={LandingPage} />
				<Route path={ROUTES.SIGN_UP} component={SignUpPage} />
				<Route path={ROUTES.HOME} component={HomePage} />
				<Route path={ROUTES.SIGN_IN} component={SignInPage} />
			</div>
		</div>
	</Router>
);


export default withAuthentification(App);