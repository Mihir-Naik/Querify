const
  mongoose = require('mongoose'),
  answerSchema = new mongoose.Schema({
    content: {type: String, required: true, default: "Untitled"},
    voteCount: {type: Number, default: 0},
    responder: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  }, {timestamps: true}),
  questionSchema = new mongoose.Schema({
    content: {type: String, required: true},
    category: {type: String, default: "Uncategorized"},
    questioner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    answers: [answerSchema]
  }, {timestamps: true})

module.exports = mongoose.model('Question', questionSchema)