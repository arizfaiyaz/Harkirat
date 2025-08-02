const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "anything copy";
const app = express();
const path = require('path');

app.use(express.json());

const users = [];

function auth(req, res, next) {
    const token = req.headers.authorization;
    if(token) {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                res.json({
                    message: "unauthorized"
                })
            } else {
                req.user = decoded;
                next();
            }
        })
    } else {
        res.json({
            message: "you are not authenticated"
        })
    }
}

function logger(req, res, next) {
    console.log(`Request come${req.method}`);
    next();
}

app.use(logger);

//
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});



app.post('/signup', (req, res) => {
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

    const user = users.find(
        function(u){
     if(u.username == username && u.password == password){
        return true;
    } else{
        return false;
    }
});

    if(user){
        const token = jwt.sign({
            username: username
        }, JWT_SECRET);
        
        // user.token = token; // store the token in the user (no need for this as we are not storing it in jwt and it is stateless)

        res.json({
            token: token
        })
    } else {
        res.status(403).send({
            message: "invalid username or password"
        })
    }
    console.log(users);
});

 app.get('/me', auth, (req, res) =>{

    const user = users.find(u => u.username == username);
    if(user){
        res.json({
            username: user.username,
            password: user.password
        })
    }
 })


app.listen(3000);