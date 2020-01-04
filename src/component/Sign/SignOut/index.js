import React from 'react';

import { withFirebase } from '../../Firebase';

const SignOutButton = ({ firebase }) => (
	<button className="signoutbutton" type="button" onClick={firebase.doSignOut}>
		<span className='fa fa-sign-out'></span> Sign Out
	</button>
);

export default withFirebase(SignOutButton);