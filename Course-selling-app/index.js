/**
Create a course selling app
    - Initialize a new Node.js project
    - Add Express, jsonwebtoken, mongoose to it as a dependency
    - Create index.js
    - Add route skeleton for user login, signup, purchase a course, sees all course, see the purchased course
    - Add routes for admin login, admin signup, create a course, delete a course, add course content.
    - Add middlewares for user and admin auth
    - Add a database (mongodb), use dotenv to store the database connection string
    - Define the schema for User, Admin, Course, Purchase
    - Complete the routes for user login, signup, purchase a course, see course

Assignment #1 - Create a .env file and add the PORT and MongoDB URL. Access these values in the index.js file.
*/
// Import required modules 
const express = require('express');
const mongoose = require('mongoose');

// Import routers for handling different routes 
const { userRouter } = require('./routes/user.js');
const { courseRouter } = require('./routes/course.js');
const { adminRouter } = require('./routes/admin.js');
require('dotenv').config();

// Initialize express app
const app = express();

// use the routes with a base API path 
app.use("/api/v1/user", userRouter); // all user-related routes
app.use("/api/v1/course", courseRouter); // All course related routes
app.use("/api/v1/admin", adminRouter); // all admin- related routes


const connectDb = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log("Connected to the database successsful");

        const port = process.env.PORT || 3000;

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })
        
    } catch (error) {
        console.error("connection to db failed");
        process.exit(1);
    }
};


connectDb();