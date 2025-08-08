const express = require('express');
const jwt = require('jsonwebtoken');

const path = require('path');
const app = express();

app.use(express.json());

const users = [];
const todos = [];

const JWT_SECRET = "iamarizfaiyazlearningwebdev";

// Serve static files from the "public directory"
app.use(express.static(path.join(__dirname, "public")));

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    
    if(!username || !password){
        return res.json({
            message: "Username and password are required"
        })
    }
    if (username.length < 5){
        return res.json({
            message: "username must have at least 5 characters"
        });
    }
    if(users.find(u => username === u.username)){
        return res.json({
            message: "Username already taken"
        });
    }
    users.push({  
        username: username,
        password: password});

    res.json({
        message: "Signed up succesfully"
    });
});

// signin route to auth a user
app.post('signin', (req, res) => {
    const { username, password} = req.body;

    if(!username || !password){
        return res.json({
            message: "Username and password required"
        });
    }

    const foundUser = users.find(u => u.username === username && u.password === password)

    if(!foundUser){
        return res.json({
            message: " username not found"
        })
    }

    if(foundUser){
        const token = jwt.sign({
            username
        }, JWT_SECRET, {
            expiresIn: '1h'
        });
        return res.json({
            token, message: "Signed in successfully"
        });
    } 
});

// Middleware func to authenticate the user based on the token
 function auth(req, res, next){
    const token = req.headers.authorization;
    if(!token){
        return res.json({
            message: "Token is missing"
        });
    }
    try {
        const decodeData = jwt.verify(token, JWT_SECRET);
        req.username = decodeData.username;
        next();
    } catch(error){
        return res.json({
            message: "Invalid token"
        });
    }
 }

 // route to get all To=dos for the auth user

 app.get('/todos', auth, (req, res) => {
    // Get the username from the req obj
    const currentUser = req.username;
    const userTodos = todos.filter((todo) =>  todo.username === currentUser);
    
    // send the filtered To-dos in the response

    res.json(userTodos)
 
});

// Route to create a new To-Do

app.post('/todos', auth, (req, res) => {
    const title = req.body.title;

    const currentUser = req.username;

    if(!title){
        return res.json({
            message: "Tittle can not be empty"
        });
    }

    const newTodo = {
        id: todos.length + 1, // generate a unique id
        username: currentUser,
        title: title,
        done: false //  default to undone
    }
    // Add the newTodo to the todos array(global array)
    todos.push(newTodo);
    res.json({
        message: "Todo created successfully"
    });
});

// Route to update a todo
app.put('/todos/:id', auth, (req, res) => {
    const { id } =req.params;
    const { title } = req.body;
    const currentUser = req.username;
    const todo = todos.find(t => t.id === parseInt(id) && todo.username === currentUser);
    
    // check if the todo is not found
    if(!todo){
        return res.json({
            message: "Todo not found"
        });
    }
    if(!title){
        return res.json({
            message: "title not found"
        });
    }
    todo.title = title; // update the title of the todo
    res.json({
        message: "Todo updated succesfully"
    });
});

// Route to delete a to-do
app.delete('/todos/:id', auth, (req, res) => {
    const { id} = req.params;
    const currentUser = req.username;
    const todoIndex = todos.findIndex(t => t.id === parseInt(id) && todos.username === currentUser);

    // Check if the todo is not found
    if(todoIndex === -1){
        return res.json({
            message: "todos not found"
        });
    }
    todos.splice(todoIndex, 1);
    res.json({
        message: "todo deleted successfully"
    });
});

// Route to make a todo as done/undone using put
app.put('/todos/:id/done', auth, (req, res) =>{
    const { id } = req.params;
    const currentUser = req.username;
    const todo = todos.find(t => t.id === parseInt(id) && t.username === currentUser);

    if(!todo){
        return res.json({
            message: "Todo not found"
        });
    }
    todo.done = !todo.done; // toggle the done status

    res.json({
        message: `To-do marked as ${todo.done ?  "done" : "undone"}`, 
        todo
    });
});

app.listen(3000);
