import React from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import moment from 'moment'
 
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
				this.setState({
					...this.state,
					blogs: res.data,
					searchResultBlogs: res.data 
				})
			})
	}

	onShowClick(id){
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
			return  < Redirect to= {`/blogs/${this.state.blogId}`} />
		}
		return(
			<div className='Blogs row'>
				<div className="col-2"></div>
				<div className="col-8 mt-5 text-center">
					<form className="form-group" onSubmit={this.onSearchSubmit.bind(this)}>
						<input className="form-control" onChange={this.onInputChange.bind(this)} type="text" placeholder="search by category" name="searchInput" value={searchInput} />
						<button className="btn btn-success mt-3">Search</button>
					</form>
					<ul className="blogs">
						{this.state.searchResultBlogs.map((b) => {
							return (
							<div className="blog mt-5 text-center" key={b._id}>
								< Link to={`/blogs/${b._id}`} >
									<img src={b.imageURL} alt="" width="160px;" height="120px;" />
									<h3> {b.title} </h3>
								</Link>
								<p>Category: {b.category} </p>
								<br/> 
								- Author: {b.author.firstName + " " + b.author.lastName}
								<br/>
								- Posted: {moment(b.updatedAt).fromNow()}
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
								<hr/>
							</div>
						)}
						)}
					</ul>
				</div>
				<div className="col-2"></div>
			</div>
		)
	}
}


export default Blogs