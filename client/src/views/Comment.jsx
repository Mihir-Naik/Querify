import React from 'react'
import axios from 'axios'
import moment from 'moment'

class Comment extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      comment: this.props.comment,
      commenter: {}
    }
  }

  componentDidMount(){
    const bId = this.props.blog._id
    const cId = this.props.comment
    axios({method: "get", url: `/api/blogs/${bId}/comments/${cId}` })
    .then(res => {
      let comment = res.data
      let commenterId = res.data.commenter
      axios({method: 'get', url: `/api/users/${commenterId}`})
      .then(res => {
        let commenter = res.data
        this.setState({
          ...this.state,
          comment: comment,
          commenter: commenter
        })
      })
    })
  }

  render() {
    return (
      <div key={this.props.comment._id} >
        <h4>{this.state.comment.content}</h4>
        <p>By: {this.state.commenter.firstName + " " +this.state.commenter.lastName} </p>
        <p>- {this.state.commenter.credential}</p>
        <p>- {moment(this.state.comment.updatedAt).fromNow()}</p>
      </div>
    )
  }
}

export default Comment