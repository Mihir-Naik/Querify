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
				<h1>Checkout all the Questions !!</h1>
				{/* conditional rendering based on request of questions */}
				<Route path="/questionsIndex/ask" render={() => {
					return (
						<div className="questionInput">
							<h3>Ask something today:</h3>
							<form onSubmit={this.onFormSubmit.bind(this)}>
								<input type="text" name="content" placeholder="Type your question here"/>
								<input type="text" name="category" placeholder="Category here"/>
								<button>Submit</button>
							</form>
						</div>
					)
				}}/>
				{/* Question search view */}
				<Route path="/questionsIndex" exact render={() => {
					return (
						<div className="questionSearch" >
							<form>
								<input onChange={this.onInputChange.bind(this)} type="text" placeholder="Search a question" name="searchInput" value={searchInput} />
								<button>Search</button>
							</form>
						</div>
					)
				}} />
				<ul className="questions">
					{this.state.searchResultQuestions.map((que) => {
						return (
							<div key={que._id} className="questionBox">
								<Link to={`/questionIndex/${que._id}`}>
									<h3>{que.content}</h3> 
									<br/>
									<p>Question By: {que.questioner.firstName + " " + que.questioner.lastName}</p> 
									<p>Posted {moment(que.createdAt).fromNow()}</p>
									<p>Answers: {que.answers.length}</p>
								</Link>
								{
									(que.questioner !== this.props.currentUser._id)
									? 
									(null)
									:
									(<button onClick={this.onDeleteClick.bind(this, que._id)}>Delete</button>)
								}
							</div>
					)})}
				</ul>
			</div>
		)
	}
}


export default QuestionsIndex