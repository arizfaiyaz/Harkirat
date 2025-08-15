const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const { z } = require('zod');

const app = express();

app.post('/user/signup', (req, res) => {

    res.json({
        message: "User signed up successfully"
    })
});

app.post('/user/signin', (req, res) => {
    res.json({
        message: "User signin up successfully"
    })
});

app.post('/user/purchases', (req, res) => {
    res.json({
        message: "purchase endpoint"
    })
});

app.post('/course/purchase', (req, res) => {
    res.json({
        message: "course endpoint"
    })
});


app.get('/courses', (req, res) => {
    res.json({
        message: "course endpoint"
    })
});






app.listen(3000);