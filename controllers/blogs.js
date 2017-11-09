const Blog = require('../models/Blog.js')

module.exports = {
  index: (req,res) => {
    Blog.find({}).populate('author').exec((err, blogs) => {
      if (err) return console.log(err)
      
      res.json(blogs)
    })
  },
  show: (req, res) => {
		console.log(req.user)
		Blog.findById(req.params.id).populate('author').exec((err, blog) => {
			res.json(blog)
		})
	},
	create: (req, res) => {
    var newBlog = new Blog(req.body)

		newBlog.save((err, blog) => {
			if(err) return res.json({success: false, code: err.code})
			res.json({success: true, message: "Blog created.", blog})
		})
  },
  update: (req,res) => {
    Blog.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedBlog) => {
      if (err || !updatedBlog) {
        console.log(err)
        return res.json({success: false, message: "There was a problem updating the blog"})
      }
      res.json({success: true, message: "Blog updated", updatedBlog})
    })
  },
  destroy: (req,res) => {
    Blog.findByIdAndRemove(req.params.id, (err, blog) => {
      if (err) return console.log(err)
      res.json({success: true, message: "Blog deleted.", blog: blog })
    })
  }
}