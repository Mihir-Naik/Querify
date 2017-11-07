const
  dotenv = require('dotenv').load(),
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/querify',
  PORT = process.env.PORT || 3001,
  usersRoutes = require('./routes/users.js'),
  questionsRoutes = require('./routes/questions.js'),
  blogsRoutes = require('./routes/blogs.js')

mongoose.connect(MONGODB_URI, (err) => {
  console.log(err || `Connected to MongoDB @ ${MONGODB_URI}`)
})

app.use(express.static(`${__dirname}/client/build`))
app.use(logger('dev'))
app.use(bodyParser.json())

app.get('/api', (req, res) => {
  res.json({message: "This is the API root !!"})
})

app.use('/api/users', usersRoutes)
app.use('/api/questions', questionsRoutes)
app.use('/api/blogs', blogsRoutes)

app.use('*', (req, res) => {
	res.sendFile(`${__dirname}/client/build/index.html`)
})

app.listen(PORT, (err) => {
  console.log(err || `Server running on port ${PORT}.`)
})