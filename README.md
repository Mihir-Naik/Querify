# 🤔 Querify

### Q&amp;A application to share the knowledge along with blog posts as bonus.


Querify is an application that is like a collaboration between Questions & Answers app and platform for your Blogs. User can share knowledge by asking questions, responding to others' questions, reading and writting some blogs as well as commenting on others' blogs. And as a user, you can vote the answers and like or dislike the blogs. You can also edit your user profile, delete account or even delete you content(which probably you don't wanna do on such an app).
 
Check out:  [🤔 QUERIFY] (https://querify.herokuapp.com/) 

## Technologies Used:

#### || 	MERN STACK  ||
 
	- Mongo DataBase
	- Express
	- Node.js
	- React 

#### Dependencies:
	# CLIENT (Front-End)
	
	- React-dom
	- React-router-dom
	- jwt-decode
	- Axios
	- Moment
	- BootStrap 4.0
	
	# SERVER (Back-End)
	
	- bcrypt-nodejs
	- body-parser
	- dotenv
	- jsonwebtoken
	- morgan
	

#### Git & GitHub for Version Control
#### Heroku for Deployment

[#### Models / ERD](https://i.imgur.com/VYL6okE.png)

#### [TRELLO BOARD](https://trello.com/b/0XVSVIts/querify-project-4)

## Installation instructions for Developers
- Fork the project from here: [https://github.com/Mihir-Naik/Querify] (https://github.com/Mihir-Naik/Querify)
- From your terminal, go to your working directory and run `git clone (forked repo's link goes here)`
- From within the cloned directory, run `npm install`, that will install all the dependecies for server side application.
- Further down in the directory you will find a directory called `client`, `cd` into the client directory and again run `npm install` which will install all your client side dependecies.
- For Development mode: Client server is set on `PORT: 3000` and Backend/API server is set on `PORT: 3001`.
- Make sure to add your `secret key` for jsonwebtoken in your `.env` file.
- Run `mongod` & `nodemon` from your project root directory.
- Run `npm start` from `client` directory.
- `HAPPY CODING`

 
## Hurdles / Difficulties during the project

- Couple of routing issues and updating the state upon hitting the routes.
- `Materialize-css` for designing
- Overall understanding of the REACT concepts and how it works.( **`console.log()` was definately the best teacher/helper** )

## Future Features / Unsolved Issues

- Better design and user friendly interface.
- Search result tabs for different attributes of blogs and questions. 
- Sharing functionality for content on facebook, email &/or twitter.

## Credits

- Special thanks to Philippe, Jimmy, Yanny and Tim for helping out through out the course.
- Thanks to all the friends for helping me out when I was hitting the wall during this project. 
