import React from 'react'

class NewBlog extends React.Component{

  render(){
    return(
      <div className="NewBlog">
        <h1>Let's write something interesting today !!</h1>
        <form>
          <input type="text" placeholder="Blog Title" name="title"/>
          <input type="text" placeholder="Category" name="category"/>
          <input type="text" placeholder="Content" name="content"/>
          <input type="text" placeholder="Image URL" name="imageURL"/>
          <button>Post</button>
        </form>
      </div>
    )
  }
}

export default NewBlog