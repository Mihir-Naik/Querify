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

  render() {
    return(
      <li>
        {this.props.answer.content} by {this.state.user.firstName}  {this.state.user.lastName}
        <h4>Votes: <button onClick={this.onUpClick.bind(this)}>👍</button> {this.props.answer.voteCount} <button onClick={this.onDownClick.bind(this)}>👎</button> </h4>
        <hr/>
      </li>
    )
  }
}

export default Answer