import React from 'react'
import clientAuth from '../clientAuth'

class SignUp extends React.Component {
	state = {
		fields: {
      firstName: "",
      lastName: "",
      credential: "",
      city: "",
			state: "",
			profileImageUrl: "",
			email: "",
			password: ""
		}
	}

	onInputChange(evt){
		this.setState({
			fields: {
				...this.state.fields, 
				[evt.target.name]: evt.target.value
			}
		})
	}

	onFormSubmit(evt) {
		evt.preventDefault()
		clientAuth.signUp(this.state.fields)
			.then(user => {
				this.setState({ fields: { firstName: "", lastName: "", credential: "", city: "", state: "", profileImageUrl: "", email: "", password: "" } })
				if(user) {
					this.props.onSignUpSuccess(user)
					console.log("This is the new user", user)
					this.props.history.push('/profile')
				}
		})
	}
	
	render() {
		const { firstName, lastName, credential, city, state, profileImageUrl, email, password } = this.state.fields
		return (
			<div className='SignUp'>
				<h1>Sign Up</h1>
				<form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)} >

				<div className="form-group">
				<label>First Name*</label>
				<input type="text" className="form-control" id="exampleInputPassword1" placeholder="First Name" name="firstName" value={firstName}/>
				</div>

				<div className="form-group">
				<label>last Name*</label>
				<input type="text" className="form-control" id="exampleInputPassword1" placeholder="Last Name" name="lastName" value={lastName}/>
				</div>

				<div className="form-group">
				<label>Credential*</label>
				<input type="text" className="form-control" id="exampleInputPassword1" placeholder="Your credentials" name="credential" value={credential}/>
				</div>

				<div className="form-group">
				<label>City*</label>
				<input type="text" className="form-control" id="exampleInputPassword1" placeholder="City you live in" name="city" value={city}/>
				</div>

				<div className="form-group">
				<label>State*</label>
				<input type="text" className="form-control" id="exampleInputPassword1" placeholder="State you live in" name="state" value={state}/>
				</div>

				<div className="form-group">
				<label>Profile Image</label>
				<input type="text" className="form-control" id="exampleInputPassword1" placeholder="Paste image link here" name="profileImageUrl" value={profileImageUrl}/>
				</div>

				<div className="form-group">
				<label>Email address*</label>
				<input type="text" className="form-control" id="exampleInputPassword1" placeholder="your email address" name="email" value={email}/>
				</div>

				<div className="form-group">
					<label>Password*</label>
					<input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="password" value={password} />
				</div>

				<button className="btn btn-primary">Sign Up</button>

				</form>

					{/* :<input type="text" placeholder="First Name" name="firstName" value={firstName} />
          Last Name*:<input type="text" placeholder="Last Name" name="lastName" value={lastName} />
          Credential*:<input type="text" placeholder="Credential" name="credential" value={credential} />
          City*:<input type="text" placeholder="City" name="city" value={city} />
          State*:<input type="text" placeholder="State" name="state" value={state} />
          Profile Image*:<input type="text" placeholder="Image URL" name="profileImageUrl" value={profileImageUrl} />
					Email*:<input type="text" placeholder="Email" name="email" value={email} />
					Password*:<input type="password" placeholder="Password" name="password" value={password} />
					<button>Sign Up</button>
				 */}

				{/* <form>
				<div className="form-group">
				<label for="exampleInputEmail1">Email address</label>
				<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
				<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
				</div>
				<div className="form-group">
				<label for="exampleInputPassword1">Password</label>
				<input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password">
				</div>
				<div className="form-check">
				<label className="form-check-label">
				<input type="checkbox" className="form-check-input">
				Check me out
				</label>
				</div>
				
				</form> */}
			</div>
		)
	}
}

export default SignUp