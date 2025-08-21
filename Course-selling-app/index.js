/**
Create a course selling app
    - Initialize a new Node.js project
    - Add Express, jsonwebtoken, mongoose to it as a dependency
    - Create index.js
    - Add route skeleton for user login, signup, purchase a course, sees all course, see the purchased course
    - Add routes for admin login, admin signup, create a course, delete a course, add course content.
    - Add middlewares for user and admin auth
    - Add a database (mongodb), use dotenv to store the database connection String
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
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());

// use the routes with a base API path 
app.use("/api/v1/user", userRouter); // all user-related routes
app.use("/api/v1/course", courseRouter); // All course related routes
app.use("/api/v1/admin", adminRouter); // all admin- related routes


async function main() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to MongoDB successfully");

        app.listen(PORT, () => {
            console.log(`Server is running on port${PORT}`);
            
        });
    } catch (error) {
        console.log("Failed to connect to Mongodb", error);
    }
}
main();