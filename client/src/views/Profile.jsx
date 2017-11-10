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
      <div className="Profile row">
        <div className="col-2"></div>
        <div className="col-8 text-center mt-5">
          <img src={this.state.user.profileImageUrl}  alt="" width="100px;" />
          <h1>Welcome {this.state.user.firstName + " " + this.state.user.lastName} !</h1>
          <h3 className="mb-5 mt-5">What would you like to do today ?</h3>  
          <div className="list-group">
            <a href="#" className="list-group-item list-group-item-action">
              <Link to="/questionsIndex/ask">Ask A Question</Link>
            </a>
            <a href="#" className="list-group-item list-group-item-action">
              <Link to="/questionsIndex">Explore some Q&As</Link>
            </a>
            <a href="#" className="list-group-item list-group-item-action"><Link to="/newBlog">Write New Blog</Link></a>
            <a href="#" className="list-group-item list-group-item-action"><Link to="/blogs">Explore Blogs & Comments </Link></a>
            <a href="#" className="list-group-item list-group-item-action">< Link to="/profile/edit"> Edit Profile </Link></a>
          </div>
        </div>
      <div className="col-2"></div>

      </div>
    )
  }
}

export default Profile