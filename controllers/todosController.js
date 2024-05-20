//import dependencies
const Todo = require('../models/todo');

const fetchTodos = async (req, res) => {
    //find the todos
    const todos = await Todo.find();
    //respond with them
    return res.json({ todos });
};

const fetchTodo = async (req, res) => {
    // Get the id from the url
    const todoId = req.params.id;
    // find the todo using that id
    const todo = await Todo.findById(todoId);
    // Respond with the todo
    return res.json({todo});
};

const createTodo = async (req, res) => {
    //Get the sent in data of request body
    const {title, description} = req.body;

    //Create a todo with it
    const todo = await Todo.create({
        title,
        description,
    });
    //respond with the new note
    res.json({ todo });
};

const updateTodo = async (req, res) => {
    //  Get the id from the url 
    const todoId = req.params.id;
    
    //  Get the data of the request body
    const {title, description} = req.body;

    //  Find and update the todo by id
    await Todo.findByIdAndUpdate(todoId, {
        title,
        description,
    })

    //Find the updated todo
    const todo = await Todo.findById(todoId);

    //Respond with it
    return res.json({todo});
};

const deleteNote = async (req, res) => {
    //  Get the id from the url
    const todoId = req.params.id;

    //  Find and delete todo by id
    const {success} = await Todo.deleteOne({id: todoId});

    //  Respond with it
    return res.json({success});
};

module.exports = {
    fetchTodos,
    fetchTodo,
    createTodo,
    updateTodo,
    deleteTodo,
};