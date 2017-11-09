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
          <h3>What would you like to do today ?</h3>
          <Link to="/questionsIndex/ask">Ask a question</Link>
          <Link to="/questionsIndex">Answer and share my knowledge</Link>
          <Link to="/newBlog">Write a Blog</Link>
          <Link to="/blogs">Read a blog and may be write a comment</Link>
          
          <button onClick={this.onEditClick.bind(this)}>< Link to="/editProfile"> Edit Profile </Link></button>
        
        </div>
      )
    }
}

export default Profile