import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Comment from './Comment'
import EditBlog from './EditBlog'

class ShowBlog extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentUser: this.props,
      blog: {},
      author: {},
      editing: false,
      loading: true
    }
  }
  
  componentDidMount(){
    console.log("this is props",this.props)
    let id = this.props.match.params.id
    axios({method: "get", url: `/api/blogs/${id}`})
    .then(res => {
      console.log("this is response", res.data)
      this.setState({
        ...this.state,
        blog: res.data,
        author: res.data.author,
        loading: false
      })
    })
  }

  toggleEditingStatus(){
    let id = this.props.match.params.id
    axios({method: 'get', url: `/api/blogs/${id}`})
    .then(res => {
      this.setState({
        ...this.state,
        blog: res.data,
        editing: (!this.state.editing),
        loading: false
      })
    })
  }

  onCommentClick(evt){
    evt.preventDefault()
    const id = this.props.match.params.id
    const body = {
      content : evt.target.content.value,
      commenter : this.props.currentUser
    }
    console.log("Comment submitted", id, body)
    axios({method: 'post', url: `/api/blogs/${id}/comments`, data: body})
    .then(res => {
      this.setState({
        ...this.state,
        blog: res.data.blog
      })
    })
    evt.target.content.value = ""
  }

  render() {
    const { editing, loading } = this.state
    if (editing) {
      return < EditBlog toggle={this.toggleEditingStatus.bind(this)} blog={this.state.blog} currentUser={this.props.currentUser} />
    }
    if( !loading ) {
    return(
      <div className="ShowBlog" >
        <h1>Show page for Blog</h1>
        <h2>{this.state.blog.title}</h2>
        <p>{this.state.blog.content}</p>
        <div>
          <h4>By: {this.state.author.firstName + " " + this.state.author.lastName }</h4>
        </div>
        {(this.state.author._id === this.props.currentUser._id)
          ?
          <button onClick={this.toggleEditingStatus.bind(this)} >Edit</button>
          :
          null 
        }
        <div className="comments" >
          <h4>Comments: </h4>
          <form onSubmit={this.onCommentClick.bind(this)} >
            <textarea type="text" placeholder="comment here" name="content" />
            <button>Comment</button>
          </form>
          <ul>
          {this.state.blog.comments.map( cmnt => {
            return (
              <li className="commentsLi"  key={cmnt._id}>
                < Comment 
                  blog={this.state.blog} 
                  comment={cmnt._id} 
                  currentUser={this.props.currentUser} 
                />
              </li>
            )
          })}            
          </ul>
        </div>
      </div>
    )}
    return ( <h1>Loading...</h1> )
  }
}

export default ShowBlog