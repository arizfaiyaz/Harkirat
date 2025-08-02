const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "anything copy";
const app = express();

app.use(express.json());

const users = [];

app.post('/singup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(users.find(u => u.username == username)){
        res.json({
            message: "username already exists"
        })
        return;
    }
    users.push({
        username: username,
        password: password
    })
    res.json({
        message: "signed up succesfully"
    })

    console.log(users);
 })

 app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(function(u){
        if(u.username == username && u.username == password){
            return true;
        } else {
            return false;
        }
    });
    if(user){
        const token = jwt.sign({
            username: username
        }, JWT_SECRET);
        res.json({
            token: token
        })
    } else {
        res.json({
            message: "username or password is incorrect"
        });
    }
    console.log(users);
 });

 app.get('/me', (req, res) =>{
    const token = req.headers.authorization;
    if(!token){
        res.json({
            message: "you are not allowed to access this route"
        })
    };

    // cerify the token 
    const decodingInformation = jwt.verify(token, JWT_SECRET);
    const username = decodingInformation.username;

    const user = users.find(u => u.username == username);
    if(user){
        res.json({
            username: user.username
        })
    } else {
        res.json({
            message: "Token invalid"
        })
    }
 })







app.listen(3000);