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
    var newQuestion = new Question(req.body)

		newQuestion.save((err, question) => {
			if(err) return res.json({success: false, code: err.code})
			res.json({success: true, message: "Question created.", question})
		})
  },
  update: (req,res) => {
    Question.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedQuestion) => {
      if (err || !updatedQuestion) {
        console.log(err)
        return res.json({success: false, message: "There was a problem updating the question"})
      }
      res.json({success: true, message: "Question updated", updatedQuestion})
    })
  },
  destroy: (req,res) => {
    Question.findByIdAndRemove(req.params.id, (err, question) => {
      if (err) return console.log(err)
      res.json({success: true, message: "Question deleted.", question: question })
    })
  }
}