const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const { z } = require('zod');
const router = express.Router();
const app = express();
const { createUserRoutes } = require('./routes/user.js');
const { createCourseRoutes } = require('./routes/course.js');

app.use("/user", userRouter);
app.use("/course", courseRouter);


createUserRoutes(app);
createCourseRoutes(app);


app.listen(3000);