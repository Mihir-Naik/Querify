import React from 'react'
import { Link } from 'react-router-dom'

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state= this.props.currentUser
  }
    onEditClick(){
      console.log('Edit button clicked')
    }
    
    render() {
      return(
        <div className="Profile">
          <h1>Welcome {this.state.firstName + " " + this.state.lastName} !</h1>
          <p>Current User's Id: {this.state._id}</p>
          
          <button onClick={this.onEditClick.bind(this)}>< Link to="/editProfile"> Edit Profile </Link></button>
        
        </div>
      )
    }
}

export default Profile