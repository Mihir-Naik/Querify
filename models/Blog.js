const
  mongoose = require('mongoose'),
  commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    commenter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true }
  }, { timestamps: true }),
  blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageURL: { type: String },
    category: { type: String, default: "Uncategorized" },
    likes: { type: Number, default: 0},
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true},
    comments: [commentSchema]
  }, { timestamps: true})

module.exports = mongoose.model('Blog', blogSchema)