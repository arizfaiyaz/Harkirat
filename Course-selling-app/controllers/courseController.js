const {courseModel, purchaseModel } = require('../db');

// Purchase course
async function purchaseCourse(req, res) {
    const courseId = req.session.courseId;
    const userId = req.session.userId;
    
}