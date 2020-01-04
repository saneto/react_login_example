import React from 'react';
import { compose } from 'recompose';
import { AuthUserContext } from '../Session';
import { withAuthorization } from '../Session';
import  UserCard  from './UserCard';
const HomePage = () => (
	<div>
		<AuthUserContext.Consumer>
			{authUser => (
				<div className="row">
					<div className="leftcolumn">
					 	<UserCard {...authUser}/>
					</div>				
				</div>
			)}
		</AuthUserContext.Consumer>
			
	</div>
);

const condition = authUser => !!authUser;

export default compose(
	withAuthorization(condition),
)(HomePage);

export {UserCard};

