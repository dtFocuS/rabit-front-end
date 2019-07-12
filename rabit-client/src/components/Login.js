import React, { Component } from 'react';
import '../index.css';
import SignupForm from './modals/SignupForm';

import { BrowserRouter as Route, withRouter } from 'react-router-dom';

class Login extends Component {

	state = {
		signupModalShow: false
	}

	constructor(props) {
		super(props)
		this.username = React.createRef()
		this.password = React.createRef()
	}


	login = (ev) => {
		ev.preventDefault()

		let username = this.username.current.value
		let password = this.password.current.value

		fetch('http://localhost:3000/api/v1/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ user: { username, password } })
		})
		.then(res => res.json())
		.then(json => {
			console.log('login:', json)
			if (json && json.jwt) {
				this.saveToken(json.jwt)
				this.props.getUser()
			}
		})
		.then(() => {
			this.props.history.push('/')
		})
	}

	logout = () => {
		this.clearToken();
		window.location.reload();
	}



	saveToken(jwt) {
		localStorage.setItem('jwt', jwt)
	}

	clearToken(jwt) {
		localStorage.setItem('jwt', '')
	}



	loginForm() {
		let signupModalClose = () => this.setState({ signupModalShow: false });
		return <div>

			<form onSubmit={this.login}>
				<input className="border-top-0 border-right-0 border-left-0"id="username-entry" type="text" placeholder="username" ref={this.username} /><br/><br/>
				<input className="border-top-0 border-right-0 border-left-0" id="password-entry" type="password" placeholder="password" ref={this.password} /><br/><br/>
				<input id="submit-button" type="submit" value="log in" /><br/>
			</form><br/>

			<div id="sign-up">
					<p>Don't have an account? <span id="sign-up-button" onClick={() => this.setState({ signupModalShow: true })}>Sign Up</span></p>
					<SignupForm
						show={this.state.signupModalShow}
						onHide={signupModalClose}
						getUser={this.props.getUser}
					/>
			</div>
		</div>
	}

	logoutArea() {
		return (
			<div>
				<div id="logged-in-username">
					{this.props.user && "@" + this.props.user.username || null}
				</div>

				<br/>
				{this.props.user ? <button id="logout-button" type="button" onClick={this.logout}>log out</button> : null}
			</div>
		);
	}

	render(){
		return (
		 	<div className="App">
				{this.props.user ? this.logoutArea() : this.loginForm()}
			</div>
		);
	}
};

export default withRouter(Login);
