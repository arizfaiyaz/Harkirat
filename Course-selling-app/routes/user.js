const express = require('express');
const userRouter = express.Router();
const { userModel } = require('../db.js');



userRouter.post('/signup', (req, res) => {

    res.json({
        message: "User signed up successfully"
    })
});

userRouter.post('/signin', (req, res) => {
    res.json({
        message: "User signin up successfully"
    })
});

userRouter.post('/purchases', (req, res) => {
    res.json({
        message: "purchase endpoint"
    })
});



module.exports = {
    userRouter: userRouter
}