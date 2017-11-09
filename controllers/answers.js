const Question = require('../models/Question.js')

module.exports = {
  index: (req,res) => {
    Question.find({}, (err, questions) => {
      if (err) return console.log(err)
      res.json(questions)
    })
  },
  show: (req, res) => {
		console.log(req.user)
		Question.findById(req.params.id, (err, question) => {
			res.json(question)
		})
	},
	create: (req, res) => {
    Question.findById(req.params.id, (err, question) => {
      if (err) return console.log(err)
      var nueQuestion = question
      nueQuestion.answers.push(req.body)
      nueQuestion.save((err, question) => {
        if (err) console.log("Saving error", err)
        res.json({success: true, message: "Answer added.", question})
      })
    })
  },
  update: (req,res) => {
    Question.findById(req.params.id, (err, question) => {
      if (err) return console.log(err)
      if (question) {
        var answer = question.answers.id(req.params.aId)
        answer.voteCount = req.body.voteCount
        answer.save()
        question.save((err, updatedQuestion) => {
          if (err || !updatedQuestion) {
            res.json({message: "Didn't update the answer", success: false, error: err})
          }
          answer = updatedQuestion.answers.id(req.params.aId)
          res.json({success: true, message: "Answer updated", answer: answer})
        })
      } else {return console.log(err)}  
    })
  },
  destroy: (req,res) => {}
}