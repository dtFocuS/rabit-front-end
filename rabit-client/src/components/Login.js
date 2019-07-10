import React, { Component } from 'react';
import '../index.css';
import SignupForm from '../components/SignupForm';

import { BrowserRouter as Route, withRouter } from 'react-router-dom';

class Login extends Component {
	state = {
		user: null,
		username: null,
		modalShow: false
	}

	constructor() {
		super()
		this.username = React.createRef()
		this.password = React.createRef()

		if (this.getToken()) {
			this.getProfile()
		}

		this.logout = this.logout.bind(this)
	}

	login = (ev) => {
		ev.preventDefault()
		console.log('log in')

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
				this.getProfile()
			}
		})
		.then(() => {
			this.props.history.push('/')
		})
	}

	logout() {
		this.clearToken();
		this.setState({ user: null })
	}

	getProfile = () => {
		let token = this.getToken()
		fetch('http://localhost:3000/api/v1/profile', {
			headers: {
				'Authorization': 'Bearer ' + token
			}
		})
		.then(res => res.json())
		.then(json => {
				console.log('profile:', json)
				this.setState({ user: json.user })
		})
	}

	saveToken(jwt) {
		localStorage.setItem('jwt', jwt)
	}

	clearToken(jwt) {
		localStorage.setItem('jwt', '')
	}

	getToken(jwt) {
		return localStorage.getItem('jwt')
	}

	handleCreate = (newUser) => {
		fetch('http://localhost:3000/api/v1/users', {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ user: {...newUser } })
		})
		.then(resp => resp.json())
		.then(json => {this.setState({ user: json.user })})

	}

	loginForm() {
		let modalClose = () => this.setState({ modalShow: false });
		return <div>
			<form onSubmit={this.login}>
				<input className="border-top-0 border-right-0 border-left-0"id="username-entry" type="text" placeholder="username" ref={this.username} /><br/><br/>
				<input className="border-top-0 border-right-0 border-left-0" id="password-entry" type="password" placeholder="password" ref={this.password} /><br/><br/>
				<input id="submit-button" type="submit" value="log in" /><br/>
			</form><br/>
			<div id="sign-up">
					<p>Don't have an account? <span id="sign-up-button" onClick={() => this.setState({ modalShow: true })}>Sign Up</span></p>
					<SignupForm
						show={this.state.modalShow}
						onHide={modalClose}
						onCreate={this.handleCreate}
					/>
			</div>
		</div>
	}

	logoutArea() {
		return <div>
			<div id="logged-in-username">
				{this.state.user && "@" + this.state.user.username || null}
			</div>

			<br/>
			{this.state.user? <button id="logout-button" type="button" onClick={this.logout}>log out</button> : null}
		</div>
	}

	render(){
  		return (
		 	<div className="App">

				{this.state.user ? this.logoutArea() : this.loginForm()}

			</div>
  		);
  	}
};

export default withRouter(Login)
