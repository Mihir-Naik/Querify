import React from 'react'
import axios from 'axios'

class Blogs extends React.Component {
  constructor(props){
		super(props);
		this.state= {
			blogs: []
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
	
	render() {
		return(
			<div className='Blogs'>
				<h1>Welcome to the Blogs Page!</h1>
				<ul className="blogs">
					{this.state.blogs.map((b) => {
						return (
						<li key={b._id}> <strong> {b.title} </strong>
							<br/> 
              <p> {b.content} </p>
              <br/> 
              - Author: {b.author}
							<hr/>
						</li>
					)}
					)}
				</ul>
			</div>
		)
	}
}


export default Blogs