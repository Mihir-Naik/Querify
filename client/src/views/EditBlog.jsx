import React from 'react'
import axios from 'axios'

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
    return(
      <div className="row text-center">
        <div className="col-2"></div>
        <div className="col-8">
          <h1>Edit your blog {this.props.currentUser.firstName}</h1>
          <form className="form-group" onSubmit={this.onFormSubmit.bind(this)} >
            <input className="form-control mb-3" type="text" defaultValue={this.state.blog.title} name="title" />
            <textarea className="form-control mb-3" type="text" defaultValue={this.state.blog.content} name="content"></textarea>
            <input className="form-control mb-3" type="text" defaultValue={this.state.blog.category} name="category" />
            <input className="form-control mb-3" type="text" defaultValue={this.state.blog.imageURL} name="imageURL" />
            <button className="btn btn-warning">Save changes</button>
          </form>
        </div>
        <div className="col-2"></div>
      </div>
    )
  }
}
export default EditBlog