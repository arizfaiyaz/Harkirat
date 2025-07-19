const express =  require('express');

const app = express();

app.use(express.json());
let todos = [];

/*
* create  a route handler for the POST request 
* create a new todo object and add it to the todos array
*/

app.post('/todos/create', (req,res) => {
    const { todo } = req.body;
    if(!id){
        return res.send("Id cannot be empty");
    }
    for (let i = 0; i < todos.length; i++){
        if(todos[i].id === todo.id){
            return res.send(" Todo already exist with id " + id);
        }
    }
    if(!todo || todo.trim() === ""){
        return res.send("Todo cannot be empty");
    }
    const newTodo = {
        title: todo,
        id: id,
    };
    todos.push(newTodo);
    res.send("todo added succesfully");
});

app.delete('/todos/delete/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    let deleted = false;
    // create a temptodo array to hold the todos after the todo with the given id is removed
    const tempTodos = [];

    for(let i =0; i < todos.length; i++){
        if(todos[i].id === todoId){
            deleted = true;
            continue; // skip adding this todo to the temptodos
        }
        tempTodos.push(todos[i]);
    }
    if(!deleted){
        return res.send("Todo with id " + todoId + "not found");
    }
    // update the todos array with the tempTodos
    todos = tempTodos;
    res.send("Todo deleted succesfully with id" + id);

});

// route to delete all the todos
app.delete('/todos/delete/all', (req, res) => {
    todos = [];
    res.send("All todos deleted succesfully");
});


