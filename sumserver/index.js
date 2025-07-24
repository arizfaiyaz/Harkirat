const express = require('express');
const app = express();

let requestCount = 0;
function logRequest(req, res, next){
    requestCount++;
    console.log(`Request ${requestCount}: ${req.method}`);
    next();
}
app.use(logRequest);
app.get('/sum', (req, res) => {
    const { a, b } = req.query;
    const sum = parseInt(a) + parseInt(b);
    res.send(`The sum is ${sum}`);
});

app.get('/multiply', (req, res) => {
    const { a, b } = req.query;
    const product =  parseInt(a) * parseInt(b);
    res.send(`The product is ${product}`);
});

app.get('/subtract', (req, res) => {
    const { a, b } = req.query;
    const difference = parseInt(a) - parseInt(b);
    res.send(`The difference is ${difference}`);

});

app.get('/divide', (req, res) => {
    const { a, b } = req.query;
    const quotient = parseInt(a) / parseInt(b);
    res.send(`The quotient is ${quotient}`);
});

app.listen(3000);