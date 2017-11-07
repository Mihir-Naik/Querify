const
  express = require('express'),
  questionsRouter = new express.Router(),
  questionsCtrl = require('../controllers/questions.js')

questionsRouter.route('/')
  .get(questionsCtrl.index)
  .post(questionsCtrl.create)

questionsRouter.route('/:id')
  .get(questionsCtrl.show)
  .patch(questionsCtrl.update)
  .delete(questionsCtrl.destroy)

module.exports = questionsRouter