//Load env variables
if(process.env.NODE_ENV != 'production'){
require('dotenv').config();
}

//import dependencies
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDb = require('./config/connectToDb');
const notesController = require('./controllers/notesController');
const usersController = require('./controllers/usersController');
const requireAuth = require('./middleware/requireAuth');

//create an express app
const app = express();

//Configure express app
app.use(express.json());
app.use(
    cors({
    origin: true,
    credentials: true,
})
);
app.use(cookieParser());

//connect to the database
connectToDb();

//routing
//  For signup
app.post('/signup', usersController.signup);
//  For login
app.post('/login', usersController.login);
//  For logout
app.get('/logout', usersController.logout);
// Check Auth
app.get('/check-auth', requireAuth, usersController.checkAuth);
//  Get all notes
app.get('/todos-getall', notesController.fetchTodos);
//  Get note by id
app.get('/todo-get/:id', notesController.fetchTodo);
// Create a note
app.post('/todo-createnew', notesController.createTodo);
//  Update a note
app.put('/todo-update/:id', notesController.updateTodo);
//  Delete a note
app.delete('/todo-delete/:id', notesController.deleteTodo);

//start our server
app.listen(process.env.PORT);