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
				this.setState({ fields: { firstName: "", lastName: "", credential: "", city: "", state: "", email: "", password: "" } })
				if(user) {
					this.props.onSignupSuccess(user)
					this.props.history.push('/')
				}
		})
	}
	
	render() {
		const { firstName, lastName, credential, city, state, email, password } = this.state.fields
		return (
			<div className='SignUp'>
				<h1>Sign Up</h1>
				<form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)} >
					<input type="text" placeholder="First Name" name="firstName" value={firstName} />
          <input type="text" placeholder="Last Name" name="lastName" value={lastName} />
          <input type="text" placeholder="Credential" name="credential" value={credential} />
          <input type="text" placeholder="City" name="city" value={city} />
          <input type="text" placeholder="State" name="state" value={state} />
					<input type="text" placeholder="Email" name="email" value={email} />
					<input type="password" placeholder="Password" name="password" value={password} />
					<button>Sign Up</button>
				</form>
			</div>
		)
	}
}

export default SignUp