const express =  require('express');

const app = express();

// route handlers
// /route
app.get('/', function (req, res){
    res.send('Hello World!');
})

app.get('/ariz', function (req, res){
    res.send('hey i am ariz, returning from /ariz');
})

app.listen(3000)