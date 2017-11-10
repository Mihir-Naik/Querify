import React from 'react'
import axios from 'axios'
import moment from 'moment'

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
    console.log("delete button clicked", this.state.user)
  }

  render() {
    return(
      <div key={this.state.answer._id} class="card card-body mt-3 mb-3">
        <div class="media">
          <img class="align-self-center mr-3" src={this.state.user.profileImageUrl} alt="Generic placeholder image" width="75px;"/>
          <div class="media-body">
          <h5 class="mt-0">{this.state.user.firstName +" "+this.state.user.lastName} || <span class="font-italic">{this.state.user.credential}</span> </h5>
          <p>{moment(this.state.answer.createdAt).fromNow()}</p>
          <p class="mb-0">{this.state.answer.content}</p>
          </div>
        </div>
            { (this.props.currentUser._id === this.state.user._id)
              ? 
              <div className="col-2 text-center">
                <h5>{this.state.answer.voteCount} <br/>Votes </h5>
                <button className="badge badge-danger" onClick={this.onDeleteClick.bind(this)}>Delete</button>
              </div> 
              : 
              <h5 className="text-left">
                <button className="badge badge-primary mr-2" onClick={this.onAddClick.bind(this)}> + </button> 
                <span class="mb-1"> {this.state.answer.voteCount}  </span>
                <button className="badge badge-primary ml-2" onClick={this.onSubtractClick.bind(this)}> - </button>
                <br/>  Votes
              </h5>
            }
      </div>
    )
  }
}

export default Answer