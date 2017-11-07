const
  express = require('express'),
  blogsRouter = new express.Router(),
  blogsCtrl = require('../controllers/blogs.js')
//  commentsCtrl = require('../controllers/comments.js')

blogsRouter.route('/')
  .get(blogsCtrl.index)
  .post(blogsCtrl.create)

blogsRouter.route('/:id')
  .get(blogsCtrl.show)
  .patch(blogsCtrl.update)
  .delete(blogsCtrl.destroy)

blogsRouter.route('/:id/comments')
  //  .get(commentsCtrl.index)

module.exports = blogsRouter