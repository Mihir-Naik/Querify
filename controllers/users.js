const User = require('../models/User.js')
const signToken = require('../serverAuth.js').signToken

module.exports = {
	// list all users
	index: (req, res) => {
		User.find({}, (err, users) => {
			res.json(users)
		})
	},

	// get one user
	show: (req, res) => {
		console.log("Current User:")
		console.log(req.user)
		User.findById(req.params.id, (err, user) => {
			res.json(user)
		})
	},

	// create a new user
	create: (req, res) => {
		User.create(req.body, (err, user) => {
			if(err) return res.json({success: false, code: err.code})
			const token = signToken(user)
			res.json({success: true, message: "User created. Token Attached.", token})
		})
	},

	// update an existing user
	update: (req, res) => {
		User.findById(req.params.id, (err, user) => {
			console.log("This is request: ", req.body)
			Object.assign(user, req.body)
			user.save((err, updatedUser) => {
				if (err || !updatedUser) return res.json({success: false, message: "There was a problem while updating the changes."}) 
				const token = signToken(updatedUser)
				res.json({success: true, message: "User updated.", updatedUser, token})
			})
		})
	},

	// delete an existing user
	destroy: (req, res) => {
		User.findByIdAndRemove(req.params.id, (err, user) => {
			if(err || !user) return res.json({success: false, message: "There was a problem."})

			res.json({success: true, message: "User deleted.", user})
		})
  },

	// the login route
	authenticate: (req, res) => {
		// check if the user exists
		User.findOne({email: req.body.email}, (err, user) => {
			// if there's no user or the password is invalid
			if(!user || !user.validPassword(req.body.password)) {
				// deny access
				return res.json({success: false, message: "Invalid credentials."})
			}

			const token = signToken(user)
			res.json({success: true, message: "Token attached.", token})
		})
	}
}