const
  express = require('express'),
  questionsRouter = new express.Router(),
  questionsCtrl = require('../controllers/questions.js'),
  answersCtrl = require('../controllers/answers.js')

questionsRouter.route('/')
  .get(questionsCtrl.index)
  .post(questionsCtrl.create)

questionsRouter.route('/:id')
  .get(questionsCtrl.show)
  .patch(questionsCtrl.update)
  .delete(questionsCtrl.destroy)

questionsRouter.route('/:id/answers')
  .get(answersCtrl.index)
  .post(answersCtrl.create)

module.exports = questionsRouter