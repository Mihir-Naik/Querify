import React from 'react'
import { Link, Route } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

class QuestionsIndex extends React.Component {
  constructor(props){
		super(props);
		this.state= {
			questions: [],
			answers: [],
			searchInput: "",
			searchResultQuestions: [],
		}
	}
	
	componentDidMount(){
		axios({method: "get", url: '/api/questions'})
			.then(res => {
				this.setState({
					...this.state, 
					questions: res.data,
					searchResultQuestions: res.data
				})
			})
	}

	onFormSubmit(evt){
		evt.preventDefault()
		const body = {
			content: evt.target.content.value,
			category: evt.target.category.value,
			questioner: this.props.currentUser
		}
		axios({method:'post', url: '/api/questions', data:body})
			.then(res => {
				this.state.questions.push(res.data.question)
				this.setState({
					...this.state,
					questions: this.state.questions
				})
			})
			.then(evt.target.content.value= "", evt.target.category.value= "")
	}

	onDeleteClick(id){
		axios({method: "delete", url: `/api/questions/${id}` })
		.then((res) => {
				let question = res.data.question
				let updatedQuestions = this.state.questions.filter(function(que) {return que._id !== question._id})
				this.setState({
					...this.state,
					questions: updatedQuestions
				})
		})
	}

	onInputChange(evt){
		this.setState({
			...this.state,
			searchInput: evt.target.value,
			searchResultQuestions: this.state.questions.filter((que) => {
				return(que.content.toLowerCase().includes(evt.target.value.toLowerCase()) || evt.target.value === "")
		}) 
		})
	}
	
	onSearchClick(evt){
		evt.preventDefault()
		let searchResult = this.state.questions.filter((que) => {
			return(que.content.toLowerCase().includes(this.state.searchInput) || this.state.searchInput === "")
		})
		this.setState({
			...this.state,
			searchResultQuestions: searchResult
		})
	}

	render() {
		const { searchInput } = this.state
		return(
			<div className='QuestionsIndex'>
				
				{/* conditional rendering based on request of questions */}
				<Route path="/questionsIndex/ask" render={() => {
					return (
						<div className="row text-center">
							<div className="col-2"></div>
							<div className="col-8">
								<div className="questionInput">
									<h3>Post your Question </h3>
									<form onSubmit={this.onFormSubmit.bind(this)}>
										<div className="form-group">
										<textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="content" placeholder="Type your question here"></textarea>
										</div>

										<div className="form-group">
										<label>Category:</label>
										<input type="text" className="form-control" id="exampleFormControlInput1" name="category" placeholder="Category" />
										</div>

										<button className="btn btn-primary">Submit</button>
									</form>
								</div>
							</div>
							<div className="col-2"></div>
						</div>
					)
				}}/>
				{/* Question search view */}
				<Route path="/questionsIndex" exact render={() => {
					return (
						<div className="questionSearch row" >
							<div className="col-3"></div>
							<div className="col-6 text-center">
								<form>
									<div className="form-group">
									<input className="form-control" id="exampleFormControlInput1" onChange={this.onInputChange.bind(this)} type="text" placeholder="Search by word in question" name="searchInput" value={searchInput} />
									</div>
									<button className="btn btn-success">Search</button>
								</form>
							</div>
							<div className="col-3"></div>
						</div>
					)
				}} />
				<div className="text-center">
				<h1>Checkout all the Questions !!</h1>
				</div>
				<ul className="questions">
					{this.state.searchResultQuestions.map((que) => {
						return (
							<div key={que._id} className="questionBox">
								<div class="card">
									<h4 class="card-header">Category: {que.category}</h4>
									<div class="card-body">
										<h4 class="card-title"><Link to={`/questionIndex/${que._id}`}>{que.content}</Link></h4>
										<p class="card-text">Posted By: {que.questioner.firstName + " " + que.questioner.lastName}, <span className="font-italic">{que.questioner.credential}</span> </p>
										<p class="card-text">@ {moment(que.createdAt).fromNow()}</p>
										<button type="button" class="btn btn-outline-secondary">
											<Link to={`/questionIndex/${que._id}`}>Answers <span class="badge badge-light">{que.answers.length}</span>
											</Link>
										</button>
						
										{
											(que.questioner._id !== this.props.currentUser._id)
											? 
											(null)
											:
											(<button type="button" class="btn btn-outline-danger" onClick={this.onDeleteClick.bind(this, que._id)}>Delete</button>)
										}
								</div>
								</div>
							</div>
					)})}
				</ul>
			</div>
		)
	}
}


export default QuestionsIndex