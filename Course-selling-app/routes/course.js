const { Router } = require('express');
const courseController = require('../controllers/courseController');
const { userMiddleware } = require('../middleware/userMiddleware');

const {userSessionMiddleware} = require('../middleware/userSessionMiddleware');

// Create a new router instance for course routes
const courseRouter = Router();

// Route to purchase a course with user authentication
courseRouter.post('/purchse', userSessionMiddleware, userMiddleware, courseController.purchaseCourse);

// route to preview available courses without authentication
courseRouter.get('/preview', courseController.previewCourse);


module.exports = {
    courseRouter,
}