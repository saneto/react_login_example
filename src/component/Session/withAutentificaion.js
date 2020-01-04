import React from 'react';
import { withBackaccessContext } from '../BackEnd';
import AuthUserContext from './context';
const withAuthentification = Component => {
	class withAuthentification extends React.Component {
		constructor(props) {
			super(props);

			this.state = {
				authUser: JSON.parse(localStorage.getItem('authUser')),
			};
		}

		render() {
			return (
				<AuthUserContext.Provider value={this.state.authUser}>
					<Component {...this.props} />
				</AuthUserContext.Provider>
			);
		}
	}

	return withBackaccessContext(withAuthentification);
};

export default withAuthentification;
