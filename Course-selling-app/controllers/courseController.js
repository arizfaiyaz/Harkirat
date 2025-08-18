const {courseModel, purchaseModel } = require('../db');

// Purchase course
async function purchaseCourse(req, res) {
    const courseId = req.session.courseId;
    const userId = req.session.userId;
    
    if(!courseId) {
        return res.json({
            message: "please provide a course id"
        });
    }

    try {
        const existingPurchase = await purchaseModel.findOne({
            courseId: courseId,
            userId: userId,
        });
        if(existingPurchase){
            return res.json({
                message: "your have already bought this coure"
            });
        }
        await purchaseModel.create({
            courseId: courseId,
            userId: userId,
        });
        res.status(201).json({
            message: "you have successfukky bought the course"
        });
    } catch (error) {
        res.status(500).json({
            message: "an error occured while purchasing the course",
            error: error.message,
        });
    }
}

// Preview Course