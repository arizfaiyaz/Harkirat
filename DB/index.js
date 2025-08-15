const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "myjwtsecretisthisokay"
const { UserModel, TodoModel } = require('./db.js');
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcrypt');
const { z } = require('zod');

mongoose.connect("mongodb+srv://arizfaiyazwork:ariz2001@cluster0.yxdy6ci.mongodb.net/Todo-db");

app.use(express.json());

app.post('/signup', async (req, res) => {
    const requiredBody = z.object({
        email: z.email(),
        name: z.string().min(1).max(50),
        password: z.string().min(8).max(20)

    })
    /* req.body
    // {
    //   email: string
    //   password: string
    //  }
    // input validation using zod
    */
   // parsing data by using .safeParse(req.body)
   // 1. how to show errors to the user
   const parsedData = requiredBody.safeParse(req.body);
   if(!parsedData.success){
     return res.json({
        message: "Invalid input",
        error: parsedData.error
     })
   }
    const { email, password, name } = req.body;

    const hashedPassword = await bcrypt.hash(password, 5);
    try {
    await UserModel.create({
        email: email,
        password: hashedPassword, // store hashed password
        name: name
    })

    res.json({
        message: "you are signed up"
    });
} catch (error) {
    res.status(500).json({
        message: "User already signed up!!"
    })
}
});

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
    const user = await UserModel.findOne({
        email: email,
    })
    if(!user) {
        return res.status(403).json({
            message: "User not found"
        });
    }

    const passwordMatch = bcrypt.compare(password, user.password);

    console.log(user);
    if(passwordMatch) {
        const token = jwt.sign({ 
            id: user._id.toString()
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
} catch (error) {
    res.status(500).json({
        message: "An error accoured during signin"
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