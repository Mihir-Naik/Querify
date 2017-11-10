import React, {Component} from 'react'
import axios from 'axios'
import Answer from './Answer.jsx'


class SingleQuestion extends Component {

  state = {
    question: {},
    answers: []
  }

  componentDidMount() {
    axios.get(`/api/questions/${this.props.match.params._id}`)
    .then(res => res.data.question)
    .then(question => {
      question.answers.sort(function (a, b) {
        return b.voteCount - a.voteCount
      })
      this.setState({
        ...this.state,
        question,
        answers: question.answers
      })
    })
  }

  onFormSubmit(evt){
    evt.preventDefault()
    const id = this.props.match.params._id
    const body = {
      content: evt.target.content.value,
      responder: this.props.currentUser
    }
    axios({method: "post", url: `/api/questions/${id}/answers`, data: body})
      .then((res) => {
        if (res.data.success) {
          let question = res.data.question
          this.setState({
            ...this.state,
            question: question,
            answers: question.answers
          })
        }
      })
      .then(evt.target.content.value= "")
  }


  render() {
    const q = this.state.question
    const ans = this.state.answers
    
    return (
      <div className="SingleQuestion row">
      <div className="col-1"></div>
      <div className="col-10">
        {
          q
          ? (
            <div>
              <h2 className="text-center mt-3">{q.content}</h2>
              <div className="answerInput">
                <form onSubmit={this.onFormSubmit.bind(this)}>
                  <div className="form-group">
                    <label >Your Answer:</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Provide your answer here" name="content" ></textarea>
                  </div>
                  <button className="btn btn-success" >Submit</button>
                </form>
              </div>
              <ul>
                {ans.map((ans) => {
                  return (
                    <Answer key={ans._id} answer={ans} question={q} currentUser={this.props.currentUser} />
                  )
                })}
              </ul>
            </div>
          )
          : <div>Loading....</div>
        }
      
      </div>
      <div className="col-1"></div>
      </div>
    )
  }
}

export default SingleQuestion