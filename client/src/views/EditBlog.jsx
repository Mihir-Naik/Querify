import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class EditBlog extends React.Component {
  state = {
    blog: this.props.blog,
    editing: true
  }

  onFormSubmit(evt){
    evt.preventDefault()
    const body = {
      title: evt.target.title.value,
      content: evt.target.content.value,
      category: evt.target.category.value,
      imageURL: evt.target.imageURL.value,
    }
    axios({method: "patch", url: `/api/blogs/${this.state.blog._id}`, data: body})
    .then(() => {
      this.props.toggle()
    })
  }

  render(){
    console.log(this.props)
    return(
      <div>
        <h1>Edit blog</h1>
        <p>{this.props.currentUser.firstName}</p>
        <p>{console.log("this is the state", this.state.blog)}</p>

        <form onSubmit={this.onFormSubmit.bind(this)} >
          <input type="text" defaultValue={this.state.blog.title} name="title" />
          <input type="text" defaultValue={this.state.blog.content} name="content" />
          <input type="text" defaultValue={this.state.blog.category} name="category" />
          <input type="text" defaultValue={this.state.blog.imageURL} name="imageURL" />
          <button>Save changes</button>
        </form>
      </div>
    )
  }
}
export default EditBlog