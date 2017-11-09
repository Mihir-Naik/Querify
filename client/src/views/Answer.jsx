import React from 'react'
import axios from 'axios'

class Answer extends React.Component {
  state = {
    user: {
      firstName: '',
      lastName: ''
    },
    answer: this.props.answer
  }

  componentDidMount() {
    axios.get(`/api/users/${this.props.answer.responder}`)
    .then(res => res.data)
    .then(user => this.setState({ user }))
  }

  onAddClick(evt){
    let qId = this.props.question._id
    let aId = this.props.answer._id
    let body = {
      voteCount: this.state.answer.voteCount + 1
    }
    axios({method: 'patch', url: `/api/questions/${qId}/answers/${aId}`, data: body})
    .then(res => {
      this.setState({
        ...this.state,
        answer: res.data.answer
      })
    })
  }

  onSubtractClick(evt){
    let qId = this.props.question._id
    let aId = this.props.answer._id
    let body = {
      voteCount: this.state.answer.voteCount - 1
    }
    axios({method: 'patch', url: `/api/questions/${qId}/answers/${aId}`, data: body})
    .then(res => {
      this.setState({
        ...this.state,
        answer: res.data.answer
      })
    })
  }

  onDeleteClick(){
    console.log("delete button clicked")
  }

  render() {
    return(
      <li key={this.state.answer._id}>
        {this.state.answer.content} 
        <br/>- By {this.state.user.firstName}  {this.state.user.lastName}
        <br/> {this.state.user.credential}
        <br/> Answered: {this.state.answer.createdAt}
        <div>
          { (this.props.currentUser._id === this.state.user._id)
            ? 
            <div>
              <h4> Votes: {this.state.answer.voteCount} </h4>
              <button onClick={this.onDeleteClick.bind(this)}>Delete</button>
            </div> 
            : 
            <h4>Votes: 
              <button onClick={this.onAddClick.bind(this)}> + </button>
              {this.state.answer.voteCount} 
              <button onClick={this.onSubtractClick.bind(this)}> - </button>
            </h4>
          }
        </div>
        <hr/>
      </li>
    )
  }
}

export default Answer