const express = require('express');
const fs = require('fs');
const path = require('path');
const { title } = require('process');

const app = express();

//Middleware to parse the JSON data in the req body
app.use(express.json());


const todoFilePath = path.join(__dirname, "todosData.json");

const readTodosfromFile = () => {
    try{
        const data = fs.readFileSync(todoFilePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading todos from file:", error);
        return [];
    }
};

const writeTodostoFile = (todos) => {
    fs.writeFileSync(todoFilePath, JSON.stringify(todos, null, 2), "utf-8");
};

/**
 * create a route handler for POST request
 *
 * Create a new todo object and add it to the todos array
 *
 * URL: localhost:3000/todos/create
 */

app.post('/todos/create', (req, res) => {
    const { todo } = req.body;
    const id = parseInt(req.body.id);

    if(!id){
        return res.send("Id can not be empty");
    }
    let todos = readTodosfromFile();
    for(let i = 0; i <  todos.legth; i++){
        if(todos[i].id === id){
            return res.send("Todo already exist with id " + id);
        }
    }

    if(!todo || todo.trim() === ""){
        return res.send("Todo can not be empty");
    }
    const newTodo = {
        id: id,
        title: todo,
    };

    todos.push(newTodo);
    writeTodostoFile(todos);
    res.send("Todo created successfully");
});

app.delete('/todos/delete/:id', (req, res) => {
    const todoId = parseInt(req.body.id);
    let todos = readTodosfromFile();
    let deleted =  false;
    const tempTodo = [];

    for(let i =0; i < todos.length; i++) {
        if(todos[i].id === todoId){
            deleted = true;
            continue;
        }
        tempTodo.push(todos[i]);
    }
    if(!deleted){
        return res.send("Todo with id " + todoId + " does not exist");
    }
    writeTodostoFile(temptodo);
    res.send("Todo deleted succesfully with id " + todoId);

});

app.put('/todos/update/:id',(req, res) => {
    const { todo } = req.body;
    const todoId = parseInt(req.body.id);
    
    if(!todo || todo.trim() === ""){
        res.send("Todo can not be empty");
    }
    let todos = readTodosfromFile();
    let updated = false;

    for(let i = 0; i < todos.length; i++){
        if(todos[i].id === todoId){
            todos[i].title =  title;
            updated = true;
        }
    }
    if(!updated){
        return res.send("Todo not found with id " + todoId);
    }
    writeTodostoFile(todos);
    res.send("Todo updated successfully with id " + todoId);
});
// to read all the todos.
app.get('/todos/read/all', (req, res) => {
    let todos = readTodosfromFile();
    if(todos.legth === 0){
        return res.send("No todos found");
    }
    res.send(todos);
});

app.get('/todos/read/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    let todos = readTodosfromFile();

    const todo = todos.find((todo) => todo.id === todoId);
    if(!todo){
        return res.send("Todo not found with id " + todoId);
    }
    res.send(todo);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});