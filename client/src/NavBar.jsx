import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = (props) => {
	return (
		<div>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/">🤔 QUERIFY</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#"><Link to="/">Home</Link> <span class="sr-only"></span></a>
      </li>
			{props.currentUser
				? (
			<div>
      <li class="nav-item">
        <a class="nav-link" href="#"><Link to="/questionsIndex">Questions</Link></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"><Link to="/blogs">Blogs</Link></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"><Link to="/profile">Profile</Link></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"><Link to="/logout">Log Out</Link></a>
      </li>
			</div>
			) : (
			<div>
			<li class="nav-item">
				<a class="nav-link" href="#"><Link to="/login">Log In</Link></a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#"><Link to="/signup">Sign Up</Link></a>
			</li>
			</div>
				)
			}
    </ul>
  	</div>
	</nav>
		</div>
	)
}

export default NavBar