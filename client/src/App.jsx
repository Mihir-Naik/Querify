import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import clientAuth from './clientAuth'

import NavBar from './NavBar'
import LogIn from './views/LogIn'
import LogOut from './views/LogOut'
import SignUp from './views/SignUp'
import QuestionsIndex from './views/QuestionsIndex'
import Home from './views/Home'
import Profile from './views/Profile'
import EditProfile from './views/EditProfile'
import Blogs from './views/Blogs'
import SingleQuestion from './views/SingleQuestion'

class App extends React.Component {
	state = { currentUser: clientAuth.getCurrentUser() }

	componentDidMount() {
		this.setState({ currentUser: clientAuth.getCurrentUser() })
	}
	
	onLoginSuccess(user) {
		this.setState({ currentUser: clientAuth.getCurrentUser() })
	}

	logOut() {
		clientAuth.logOut()
		this.setState({ currentUser: null })
	}

	onUpdateSuccess(user, token) {
		console.log("User recieved: ", user, "Token Recieved: ", token)
		this.setState({ currentUser: clientAuth.getCurrentUser() })
		clientAuth.setToken(token)
	}

	render() {
		const { currentUser } = this.state
		console.log("Main App.js in render()", this.state)
		return (
			<div className='App'>
				<NavBar currentUser={currentUser} />
				<Switch>
					<Route path="/login" render={(props) => {
						return <LogIn {...props} onLoginSuccess={this.onLoginSuccess.bind(this)} />
					}} />
					<Route path="/logout" render={(props) => {
						return <LogOut onLogOut={this.logOut.bind(this)} />
					}} />
					<Route path="/signup" render={(props) => {
						return <SignUp {...props} onSignUpSuccess={this.onLoginSuccess.bind(this)} />
					}} />

					<Route path="/questionsIndex" render={() => {
						return currentUser
						? <QuestionsIndex currentUser={currentUser}/>
						: <Redirect to="/login" />
					}} />

					<Route path='/questionIndex/:_id' render={(props) => {
						return <SingleQuestion {...props} />
					}} />

					<Route path="/profile" render={() => {
						return currentUser
						? <Profile currentUser={currentUser} />
						: <Redirect to="/login" />
					}} />

					<Route path="/editProfile" render={() => {
						return currentUser
						? <EditProfile currentUser={currentUser} onUpdateSuccess={this.onUpdateSuccess.bind(this)} onUserDelete={this.logOut.bind(this)} />
						: <Redirect to="/login" />
					}} />

					<Route path="/blogs" render={() => {
						return currentUser
						? <Blogs currentUser={currentUser} />
						: <Redirect to="/login" />
					}} />

					<Route path="/" component={Home} />
				</Switch>
			</div>
		)
	}
}

export default App
