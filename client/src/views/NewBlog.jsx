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
          <input type="text" placeholder="Blog Title" name="title"/>
          <input type="text" placeholder="Category" name="category"/>
          <input type="text" placeholder="Content" name="content" />
          <input type="text" placeholder="Image URL" name="imageURL" />
          <button>Post</button>
        </form>
      </div>
    )
  }
}

export default NewBlog