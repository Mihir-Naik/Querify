import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Profile extends React.Component {
  state = {
   user: this.props.currentUser
  }
    

  componentWillMount(){
    axios({method: 'get', url: `/api/users/${this.props.currentUser._id}`})
    .then(res=>{
      this.setState({
         ...this.state,
         user: res.data
      })
    })
  }
    
  render() {
    return(
      <div className="Profile">
        <img src={this.state.user.profileImageUrl}  alt="" width="100px;" />
        <h1>Welcome {this.state.user.firstName + " " + this.state.user.lastName} !</h1>
        <h3>What would you like to do today ?</h3>
        <Link to="/questionsIndex/ask">Ask a question</Link>
        <Link to="/questionsIndex">Answer and share my knowledge</Link>
        <Link to="/newBlog">Write a Blog</Link>
        <Link to="/blogs">Read a blog and may be write a comment</Link>
        
        <button>< Link to="/profile/edit"> Edit Profile </Link></button>
        <button onClick={this.componentWillMount.bind(this)}>user</button>
      </div>
    )
  }
}

export default Profile