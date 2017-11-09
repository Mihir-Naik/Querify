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
import NewBlog from './views/NewBlog'
import ShowBlog from './views/ShowBlog'
import EditBlog from './views/EditBlog'
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

					<Route path="/questionsIndex" render={(props) => {
						return currentUser
						? <QuestionsIndex {...props} currentUser={currentUser}/>
						: <Redirect to="/login" />
					}} />

					<Route path='/questionIndex/:_id' render={(props) => {
						return <SingleQuestion {...props} currentUser={currentUser} />
					}} />

					<Route path="/profile" render={() => {
						return currentUser
						? <Profile currentUser={currentUser} />
						: <Redirect to="/login" />
					}} />

					<Route path="/editProfile" render={(props) => {
						return currentUser
						? <EditProfile {...props} currentUser={currentUser} onUpdateSuccess={this.onUpdateSuccess.bind(this)} onUserDelete={this.logOut.bind(this)} />
						: <Redirect to="/login" />
					}} />

					<Route path='/blogs/:id' render={(props) => {
						return currentUser
						? <ShowBlog {...props} currentUser={currentUser} />
						: <Redirect to="/login" />
					}} />

					<Route path="/blogs" render={() => {
						return currentUser
						? <Blogs currentUser={currentUser} />
						: <Redirect to="/login" />
					}} />

					<Route path="/newBlog" render={() => {
						return currentUser
						? <NewBlog currentUser={currentUser} />
						: <Redirect to="/login" />
					}} />

					<Route path="/blogs/:id/editBlog" render={() => {
						return currentUser
						? <EditBlog currentUser={currentUser} />
						: <Redirect to="/login" />
					}} />

					<Route path="/" component={Home} />
				</Switch>
			</div>
		)
	}
}

export default App
