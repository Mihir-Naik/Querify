import React from 'react'
import axios from 'axios'

class Answer extends React.Component {
  state = {
    user: {
      firstName: '',
      lastName: ''
    }
  }

  componentDidMount() {
    axios.get(`/api/users/${this.props.answer.responder}`)
    .then(res => res.data)
    .then(user => this.setState({ user }))
  }

  onUpClick(evt){
    console.log("Up button clicked")
  }

  onDownClick(evt){
    console.log("Down button clicked")
  }

  onDeleteClick(){
    console.log("delete button clicked")
  }

  render() {
    return(
      <li key={this.props.answer._id}>
        {this.props.answer.content} 
        <br/>- By {this.state.user.firstName}  {this.state.user.lastName}
        <br/> {this.state.user.credential}
        <br/> Answered: {this.props.answer.createdAt}
        <div>
          { (this.props.currentUser._id === this.state.user._id)
            ? 
            <div>
              <h4> Votes: {this.props.answer.voteCount} </h4>
              <button onClick={this.onDeleteClick.bind(this)}>Delete</button>
            </div> 
            : 
            <h4>Votes: 
              <button onClick={this.onUpClick.bind(this)}>👍</button>
              {this.props.answer.voteCount} 
              <button onClick={this.onDownClick.bind(this)}>👎</button>
            </h4>
          }
        </div>
        <hr/>
      </li>
    )
  }
}

export default Answer