import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class NewBlog extends React.Component{
  
  state = {
    redirect: false
  }

  onFormSubmit(evt){
    evt.preventDefault()
    let body = {
      title: evt.target.title.value,
      category: evt.target.category.value,
      content: evt.target.content.value,
      imageURL: evt.target.imageURL.value,
      author: this.props.currentUser
    }
    console.log("Form submitted", body)
    axios({method: "post", url: "/api/blogs", data: body})
      .then(() => {
        this.setState({redirect: true})
      });
  }

  render(){
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/blogs"/>;
    }

    return(
      <div className="NewBlog">
        <h1>Let's write something interesting today !!</h1>
        <form onSubmit={this.onFormSubmit.bind(this)}>          
          <div className="form-group">
            <label>Blog Title</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="2" placeholder="Let's start with title" name="title" ></textarea>
          </div>
          <div className="form-group">
            <label>Blog Category</label>
            <input className="form-control" id="exampleFormControlTextarea1" rows="1" placeholder="Want to specify a category for your blog ?" name="category" />
          </div>
          <div className="form-group">
            <label>Blog content</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="10" placeholder="Content for your blog goes here..." name="content" ></textarea>
          </div>
          <div className="form-group">
            <label>Image</label>
            <input className="form-control" id="exampleFormControlTextarea1" rows="1" placeholder="Paste a link for the photo of your blog" name="imageURL" />
          </div>

          <button className="btn btn-primary" >Post</button>
        </form>
      </div>
    )
  }
}

export default NewBlog