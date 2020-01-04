import React, { Component } from 'react';
import { withBackaccessContext } from '../BackEnd';
import {Link } from 'react-router-dom';
import * as ROUTES from '../../const/routes';

class UserCard extends Component {
	
	constructor(props) {
		super(props);		
		console.log(this.props)
		this.state = {
			user: this.props,
		};   
	}

	render() {
		const { user } = this.state ||  [];
		let  listPhoto = (user.listPhoto) ?  Object.values(user.listPhoto)  : [] ;
		const userRoute = ROUTES.PATHUSERTWEET+"/"+user.username;
		return (
			<div className="card">

				<Link to={userRoute}>
					<img src={user.src} alt="singe" style={{ width:'100%' }}/>  
				</Link>
				<h1>
					<Link to={userRoute}>
						{user.name}
					</Link>
				</h1>
				<p className="title">
					<Link to={userRoute}>
						@{user.username}
					</Link>
				</p>
				<p>{user.bio}</p>
				<div class="container">
					{listPhoto.map(message => (
						<div class="row" key={message.url}>
							<img src={message.url} alt="User_card_P" className="user_card_P" />   
						</div>
					))}			
				</div>
			</div>			
		);
	}
}

export default withBackaccessContext(UserCard);