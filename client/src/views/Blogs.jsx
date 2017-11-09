import React from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
// import ShowBlog from './ShowBlog'
 
class Blogs extends React.Component {
  constructor(props){
		super(props);
		this.state= {
			blogs: [],
			redirect: false,
			blogId: {}
		}
	}
	
	componentDidMount(){
		axios({method: "get", url: '/api/blogs'})
			.then(res => {
				console.log(res)
				this.setState({
					...this.state, blogs: res.data, 
				})
			})
	}

	onShowClick(id){
		console.log("Show button clicked",id , this.props.currentUser, )
		this.setState({
			...this.state,
			redirect: true,
			blogId: id 
		})
	}
	
	render() {
		const { redirect } = this.state
		if (redirect) {
			return < Redirect to= {`/blogs/${this.state.blogId}`} />
		}
		return(
			<div className='Blogs'>
				<h1>Welcome to the Blogs Page!</h1>
				<ul className="blogs">
					{this.state.blogs.map((b) => {
						return (
						<li className="blog" key={b._id}>
							<img src={b.imageURL} alt=""/>
							<br/>
							< Link to={`/blogs/${b._id}`} ><h3> {b.title} </h3></Link>
							<br/> 
              <p> {b.content} </p>
              <br/> 
              - Author: {b.author.firstName + " " + b.author.lastName}
              <br/>
							- Posted: {b.updatedAt}
							<br/>
							{(b.author._id === this.props.currentUser._id) 
								? 
								<div>
									<p>- Likes: {b.likes}</p> 
									<button onClick={this.onShowClick.bind(this, b._id)}>Show</button>
								</div> 
								: 
								<div>
									<p>- Likes: (Add) {b.likes} (Subtract) </p>
								</div>
							}
							
							<hr/>
							<h4>Comments: {b.comments.length}</h4>

						</li>
					)}
					)}
				</ul>
			</div>
		)
	}
}


export default Blogs