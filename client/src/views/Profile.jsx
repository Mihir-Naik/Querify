import React from 'react'

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state= this.props.currentUser
  }
    onEditClick(){
      console.log('Edit button clicked')
    }
  
    render() {
      console.log("I am on profile page", this.state._id)
      return(
        <div className="Profile">
          <h1>Welcome {this.state.firstName + " " + this.state.lastName} !</h1>
          <p>Current User's Id: {this.state._id}</p>
          
          <button onClick={this.onEditClick.bind(this)}>Edit Profile</button>
        </div>
      )
    }
}

export default Profile