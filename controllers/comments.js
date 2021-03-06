const Blog = require('../models/Blog.js')

module.exports = {
  index: (req,res) => {
    Blog.find({}, (err, blogs) => {
      if (err) return console.log(err)
      res.json(blogs)
    })
  },
  show: (req, res) => {
		Blog.findById(req.params.id, (err, blog) => {
      var comment = blog.comments.id(req.params.cId)
			res.json(comment)
		})
	},
	create: (req, res) => {
    Blog.findById(req.params.id, (err, blog) => {
      if (err) return console.log(err)
      var nueBlog = blog
      nueBlog.comments.push(req.body)
      nueBlog.save((err, blog) => {
        if (err) console.log("Saving error", err)
        res.json({success: true, message: "Comment added.", blog})
      })
    })
  },
  update: (req,res) => {},
  destroy: (req,res) => {}
}