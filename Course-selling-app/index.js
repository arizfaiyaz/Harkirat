const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const { userRouter } = require('./routes/user.js');
const { courseRouter } = require('./routes/course.js');

const app = express();

app.use("/user", userRouter);
app.use("/course", courseRouter);


app.listen(3000);