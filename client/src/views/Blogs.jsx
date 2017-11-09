import React from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
// import ShowBlog from './ShowBlog'
 
class Blogs extends React.Component {
  constructor(props){
		super(props);
		this.state= {
			blogs: [],
			searchResultBlogs: [],
			redirect: false,
			blogId: {},
			searchInput: ""
		}
	}
	
	componentDidMount(){
		axios({method: "get", url: '/api/blogs'})
			.then(res => {
				console.log(res)
				this.setState({
					...this.state,
					blogs: res.data,
					searchResultBlogs: res.data 
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

	onInputChange(evt){
		this.setState({
			...this.state,
			searchInput: evt.target.value,
			searchResultBlogs: this.state.blogs.filter((blog) => {
				return(blog.category.toLowerCase().includes(evt.target.value.toLowerCase()) || evt.target.value === "")
		}) 
		})
	}

	onSearchSubmit(evt){
		evt.preventDefault()
		let searchResult = this.state.blogs.filter((blog) => {
				return(blog.category.toLowerCase().includes(this.state.searchInput) || this.state.searchInput === "")
		})
		this.setState({
			...this.state,
			searchResultBlogs: searchResult
		})
	}
	
	render() {
		const { redirect, searchInput } = this.state
		if (redirect) {
			return < Redirect to= {`/blogs/${this.state.blogId}`} />
		}
		return(
			<div className='Blogs'>
				<h1>Welcome to the Blogs Page!</h1>
				<form onSubmit={this.onSearchSubmit.bind(this)}>
					<input onChange={this.onInputChange.bind(this)} type="text" placeholder="search by category" name="searchInput" value={searchInput} />
					<button>Search</button>
				</form>
				<ul className="blogs">
					{this.state.searchResultBlogs.map((b) => {
						return (
						<li className="blog" key={b._id}>
							< Link to={`/blogs/${b._id}`} >
								<img src={b.imageURL} alt="" width="160px;" height="120px;" />
								<h3> {b.title} </h3>
							</Link>
							<p>Category: {b.category} </p>
              <br/> 
              - Author: {b.author.firstName + " " + b.author.lastName}
              <br/>
							- Posted: {b.updatedAt}
							<br/>
							{(b.author._id === this.props.currentUser._id) 
								? 
								<div>
									<p> Likes # {b.likes}</p> 
								</div> 
								: 
								<div>
									<p> Likes # {b.likes} </p>
								</div>
							}
							<h4># of Comments: {b.comments.length}</h4>
						</li>
					)}
					)}
				</ul>
			</div>
		)
	}
}


export default Blogs