const
  express = require('express'),
  questionsRouter = new express.Router(),
  questionsCtrl = require('../controllers/questions.js')

questionsRouter.route('/')
  .get(questionsCtrl.index)
  .post(questionsCtrl.create)

questionsRouter.route('/:id')
  .get(questionsCtrl.show)
  .delete(questionsCtrl.destroy)

module.exports = questionsRouter