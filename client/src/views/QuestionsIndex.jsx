import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class QuestionsIndex extends React.Component {
  constructor(props){
		super(props);
		this.state= {
			questions: [],
			answers: []
		}
	}
	
	componentDidMount(){
		axios({method: "get", url: '/api/questions'})
			.then(res => {
				console.log(res)
				this.setState({
					...this.state, 
					questions: res.data
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

		console.log("Form submitted",body)
		axios({method:'post', url: '/api/questions', data:body})
			.then(res => {
				console.log(res.data)
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
	
	render() {
		// console.log(this.state.answers)
		return(
			<div className='QuestionsIndex'>
				<h1>Checkout all the Questions !!</h1>
				<div className="questionInput">
					<h3>Ask something today:</h3>
					<form onSubmit={this.onFormSubmit.bind(this)}>
						<input type="text" name="content" placeholder="Type your question here"/>
						<input type="text" name="category" placeholder="Category here"/>
						<button>Submit</button>
					</form>
				</div>
				<ul className="questions">
					{this.state.questions.map((que) => {
						return (
							<div key={que._id} className="questionBox">
								<Link to={`/questionIndex/${que._id}`}>
									<h3>{que.content}</h3> 
									<br/>
									<p>Question By: {que.questioner}</p> 
									<p>Posted @ {que.createdAt}</p>
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
						// <li key={q._id}> <strong> {q.content} </strong>
						// 	<br/> # Answers:
						// 		<ul> {q.answers.map((ans) => {
						// 			return (
						// 			<li key={ans._id}> {ans.content} --> By: {ans.responder} @ {ans.updatedAt}</li>
						// 			)
						// 			})} 
						// 		</ul>
						// 	<hr/>
						// </li>
					)}
					)}
				</ul>
			</div>
		)
	}
}


export default QuestionsIndex