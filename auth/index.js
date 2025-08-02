const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const JWT_SECRET = "anything"; // secret key for JWT

app.use(express.json()); // to parse JSON bodeis

const users = []; // in-memory user storage;



/*app.post('/signup', (req, res) => {
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
     });

     res.json({
        message: "you are signed up successfully"
     })

     console.log(users);
     
});

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
app.get('/me', (req, res) => {
    const token = req.headers.authorization;
    const decodingInformation = jwt.verify(token, JWT_SECRET);

 const username = decodingInformation.username;


    const user = users.find(u => u.username == username);
    if(user){
        res.json({
            username: user.username,
            password: user.password
        })
    } else {
        res.json({
            message: "Token invalid"
        });
    }
});


app.listen(3000); // listening on port 3000

// 1dlgq4iuz605vb3fvrzp7yiq2vwc8oua

*/