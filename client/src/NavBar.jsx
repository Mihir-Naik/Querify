import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = (props) => {
	return (
		<div className='NavBar'>
			<Link to="/">Home</Link>
			{props.currentUser
				? (
					<span>
						<p>Hi {props.currentUser.firstName} ! </p>
						<p><Link to="/questionsIndex">Questions</Link></p>
						<p><Link to="/blogs">Blogs</Link></p>
						<p><Link to="/profile">Profile</Link></p>
						<p><Link to="/logout">Log Out</Link></p>
					</span>
				) : (
					<span>
						<p><Link to="/login">Log In</Link></p>
						<p><Link to="/signup">Sign Up</Link></p>
					</span>
				)
			}
		</div>
	)
}

export default NavBar