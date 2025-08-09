const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "myjwtsecretisthisokay"
const { UserModel, TodoModel } = require('./db.js');
const mongoose = require('mongoose');
const app = express();
mongoose.connect("mongodb+srv://arizfaiyazwork:ariz2001@cluster0.yxdy6ci.mongodb.net/Todo-db");

app.use(express.json());

app.post('/signup', (req, res) => {
    const { email, password, name } = req.body;

    UserModel.create({
        email: email,
        password: password,
        name: name
    })

    res.json({
        message: "you are signed up"
    })
});

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({
        email: email,
        password: password
    })
    console.log(user);
    if(user) {
        const token = jwt.sign({ 
            id: user._id
        }, JWT_SECRET)
        res.json({
            message: "User signed in",
            token: token
        })
    } else {
        res.status(403).json({
            message: "User not found"
        })
    }
});

function auth(req, res, next) {
    const token = req.headers.authorization;

    const decodeData = jwt.verify(token, JWT_SECRET);
    if(decodeData) {
        req.userId = decodeData.id;
        next();
    } else {
        res.status(403).json({
            message: "User not authenticated"
        });
    }
}

app.post('/todo', auth, async (req,res) => {
    const userId = req.userId;

    const title = req.body.title;
    const done = req.body.done;

    // Create a new todo
    await TodoModel.create({
        userId,
        title,
        done,
    });

    res.json({
        message: "todo created"
    })
});

app.get('/todos', auth, async (req,res) => {
    const userId = req.userId;
    const todos = await TodoModel.find({
        userId,
    });
    res.json({
        todos,
    })
});


app.listen(3000);