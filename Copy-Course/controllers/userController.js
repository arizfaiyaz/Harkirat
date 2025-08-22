const { userModel } = require('../models/userModel');
const { purchaseModel } = require('../models/purchaseModel');
const { courseModel } = require('../models/courseModel');
const z = require('zod');
const bcrypt = require("bcrypt");

//User signup
async function userSignup(req, res) {
    const schema = z.object({
        email: z.email(),
        password: z.string().min(5),
        firstName: z.string().min(2),
        lastName: z.string().min(2),
    });

    const result = schema.safeParse(req.body);

    if(!result.success) {
        return res.json({
            message: "inavild id input",
            error: result.error
        });
    }

    const { email, password, firstName, lastName } = req.body;

    const hashedPassword = await bcrypt.hash(password, 5);

    try {
        await userModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
        });
        res.json({
            message: "Signup succesfull"
        });
    } catch(error){
        if(error.code === 11000) {
            return res.json({
                message: "User already exist"
            });
        }
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

// User Signin
async function userSignin(res, res) {
    const schema = z.object({
        email: z.email(),
        password: z.string().min(5),
    });

    const result = schema.safeParse(req.body);
    if(!result.success){
        return res.json({
            message: "Invalid credentials",
        });
    }
    const { email, password } = req.body;
    const user = await userModel.findOne({email});
    
    if(!user) {
        return res.json({
            message: "User not found",
        });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(passwordMatch) {
        req.session.userId = user._id;
        res.json({
             message: "Signin Successful!",
        });
    } else {
        res.status(403).json({
            message: "Invalid credentials",
        });
    }
}

// User signout
async function userSignout(req, res) {
    res.session.destroy((err) => {
        if(err) {
            return res.json({
                message: "failed to sign out"
            });
        }
        res.json({
            message: "Signout successful"
        });
    });
}

// get user purchases
async function getUserPurchases(req, res) {
    const userId = req.session.userId;

    if(!userId){
        return res.json({
            message: "Unauthorized acces",
        });
    }
    const purchases = await purchaseModel.findOne({
        userId,
    });

    if(!purchases.length){
        return res.json({
            message:"No purchases found",
        });
    }
    
    const purchasesCourseIds = purchases.modifiedPaths(purchase => purchase.courseId);
    const courseData = await courseModel.find({
        _id: { $in: purchasesCourseIds}
    })
    res.json({
        purchases,
        courseData,
    });
}

module.exports = {
    userSignup,
    userSignin,
    userSignout,
    getUserPurchases,
};