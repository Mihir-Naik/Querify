import React from 'react'
import axios from 'axios'

class QuestionsIndex extends React.Component {
  constructor(props){
		super(props);
		this.state= {
			questions: []
		}
	}
	
	componentDidMount(){
		axios({method: "get", url: '/api/questions'})
			.then(res => {
				console.log(res)
				this.setState({
					...this.state, questions: res.data, 
				})
			})
	}
	onEditClick(){
		console.log('Edit button clicked')
	}
	
	render() {
		return(
			<div className='QuestionsIndex'>
				<h1>Welcome to the Questions Page!</h1>
				<ul className="questions">
					{this.state.questions.map((q) => {
						return (
						<li key={q._id}> <strong> {q.content} </strong>
							<br/> # Answers:
								<ul> {q.answers.map((ans) => {
									return (
									<li key={ans._id}> {ans.content} --> By: {ans.responder} @ {ans.updatedAt}</li>
									)
									})} 
								</ul>
							<hr/>
						</li>
					)}
					)}
				</ul>
			</div>
		)
	}
}


export default QuestionsIndex