const express = require('express');
const courseRouter =  express.Router();
const { courseModel } = require('../db.js');

courseRouter.post('/purchase', (req, res) => {
    // you would expect the user to pay you the money
    res.json({
        message: "course endpoint"
    })
});


courseRouter.get('/preview', (req, res) => {
    res.json({
        message: "course endpoint"
    })
});



module.exports = {
    courseRouter: courseRouter
}