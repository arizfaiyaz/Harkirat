const express = require('express');
const adminRouter = express.Router();
const { adminModel, userModel } = require('../db.js');
const { z, email } = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


adminRouter.post('/signup', async (req, res) => {
    const requiredbody = z.object({
        email: z.email(),
        password: z.string().min(8).max(30).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/),
        firstName: z.string().min(3).max(30),
        lastName: z.string().min(0).max(30)
    });
    const result = requiredbody.safeParse(req.body);
    try {
    await userModel.create({
        email: result.data.email,
        password: result.data.password,
        firstName: result.data.firstName,
        lastName: result.data.lastName
    })
} catch (error) {
    console.log(error);
    res.status(500).json({
        message: "Internal server error"
    });
}
    res.json({
        message: "signup endpoint"
    })
});

adminRouter.post('/signin', (req, res) => {
    res.json({
        message: "signin endpoint"
    })
});

 adminRouter.use(adminMiddleware);

adminRouter.post('/course', (req, res) => {
    res.json({
        message: "course created endpoint"
    })
});

adminRouter.put('/course', (req, res) => {
    res.json({
        message: "course created endpoint"
    })
});


adminRouter.get('/course/all', (req, res) => {
    res.json({
        message: "course created endpoint"
    })
});

module.exports = {
    adminRouter: adminRouter
};