const
  mongoose = require('mongoose'),
  BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, default: "Uncategorized" },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true},
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
  },{ timestamps: true})

module.exports = mongoose.model('Blog', BlogSchema)