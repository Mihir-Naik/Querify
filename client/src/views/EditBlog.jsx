import React from 'react'
import axios from 'axios'

class EditBlog extends React.Component {
  state = {
    title: "",
    category: "",
    content: "",
    imageURL: ""
  }
  componentDidMount(){
    const id = this.props.blogId
    console.log(this.props)
    axios({method: "get", url: `/api/blogs/${id}`})
    .then(res => {
      console.log(res.data)
    })
    this.setState({
      ...this.state
    })
  }

  onFormSubmit(){
    console.log("form submitted")
  }
  render(){
    return(
      <h1>Edit blog</h1>
      
    )
  }
}
export default EditBlog