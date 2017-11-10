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
					First Name*:<input type="text" placeholder="First Name" name="firstName" value={firstName} />
          Last Name*:<input type="text" placeholder="Last Name" name="lastName" value={lastName} />
          Credential*:<input type="text" placeholder="Credential" name="credential" value={credential} />
          City*:<input type="text" placeholder="City" name="city" value={city} />
          State*:<input type="text" placeholder="State" name="state" value={state} />
          Profile Image*:<input type="text" placeholder="Image URL" name="profileImageUrl" value={profileImageUrl} />
					Email*:<input type="text" placeholder="Email" name="email" value={email} />
					Password*:<input type="password" placeholder="Password" name="password" value={password} />
					<button>Sign Up</button>
				</form>
			</div>
		)
	}
}

export default SignUp