const express = require('express');
const Router = express.Router();

const userRouter = Router();

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