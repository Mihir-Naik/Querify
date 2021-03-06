const
  mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    credential: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    profileImageUrl: { type: String, default: "Image Unavailable"},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
//    questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
//    answers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Answer'}],
//    blogs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Blog'}],
//    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
  }, { timestamps: true })

// adds a method to a user document object to create a hashed password
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

// adds a method to a user document object to check if provided password is correct
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

// middleware: before saving, check if password was changed,
// and if so, encrypt new password before saving:
userSchema.pre('save', function(next) {
  if(this.isModified('password')) {
    this.password = this.generateHash(this.password)
  }
  next()
})

const User = mongoose.model('User', userSchema)
module.exports = User