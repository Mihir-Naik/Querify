import React, {Component} from 'react'
import axios from 'axios'
import Answer from './Answer.jsx'

class SingleQuestion extends Component {

  state = {
    question: null,
    answers: [],
    fields: {
      content: "",
      category: ""
    }
  }

  componentDidMount() {
    axios.get(`/api/questions/${this.props.match.params._id}`)
    .then(res => res.data.question)
    .then(question => {
      this.setState({
        ...this.state,
        question,
        answers: question.answers
      })
    })
  }

  onFormSubmit(evt){
    evt.preventDefault()
    console.log("Submit button clicked")
  }


  render() {
    const q = this.state.question
    const ans = this.state.answers
    console.log(this.props)
    
    return (
      <div className="SingleQuestion">
        {
          q
          ? (
            <div>
              <h1>{q.content}</h1>
              <p>Your answer:</p>
              <form onSubmit={this.onFormSubmit.bind(this)}>
                <input type="text" placeholder="your answer here" name="content" />
                <button>Submit</button>
              </form>
              <ul>
                {ans.map((ans) => {
                  return (
                    <Answer key={ans._id} answer={ans} />
                  )
                })}
              </ul>
            </div>
          )
          : <div>Loading....</div>
        }
      </div>
    )
  }
}

export default SingleQuestion