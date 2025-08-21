const { Router } = require('express');
const { userMiddleware }= require('../middleware/userMiddleware');
const userController = require('../controllers/userController');

// Create a Router instance 
const userRouter = Router();

// User signup Route 
userRouter.post('/signup', userController.userSignup);

// User signin Route
userRouter.post('/signin', userController.userSignin);

// User Signout Route
userRouter.post('/signout', userController.userSignout);

// Get User Purchase Route
userRouter.get('/purchases', userMiddleware, userController.getUserPurchases);


module.exports = {
    userRouter,
}