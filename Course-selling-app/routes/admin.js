const { Router } = require('express');
const { adminMiddleware } = require('../middleware/adminMiddleware');
const adminController = require("../controllers/adminController");

// Create a new instance of Router
const adminRouter = Router();

// Admin signup Route
adminRouter.post('/signup', adminController.adminSignup);

// Admin Signiin Route
adminRouter.post('/signin', adminController.adminSignin);

// Create Course Route
adminRouter.post('/course', adminMiddleware,adminController.createCourse);

// Update a course Route
adminRouter.put('/course', adminMiddleware, adminController.updateCourse);

// Delete a Course Route
adminRouter.delete('/course', adminMiddleware, adminController.deleteCourse);

// Get all course Route
adminRouter.get('/course/bulk', adminMiddleware, adminController.getAllCourse);


module.exports = {
    adminRouter,
};