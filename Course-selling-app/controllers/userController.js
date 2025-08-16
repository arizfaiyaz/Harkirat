const { userModel, purchaseModel, courseModel } = require('../db.js');
const z = require('zod');
const bcrypt = require('bcrypt');

// User Signup
async function userSignup(req, res) {
    const schema = z.object({
        email: z.email().min(5),
        password: z.string().min(5),
        firstName: z.string().min(3).max(30),
        lastName: z.string().min(3).max(30),
    });

    const result = schema.safeParse(req.body);
    if(!result.success) {
        return res.json({
            message: "Invalid input",
            error: result.error
        });
    }

    const { email, password, firstName, lastName } = req.body;

    const hashedpassword = await bcrypt.hash(password, 5);

    try {
        await userModel.create({
            email,
            password: hashedpassword,
            firstName,
            lastName
        });
        res.status(201).json({
            message: "Signup successful!"
        });
    } catch (error) {
        if(error.code === 11000) {
            return res.status(400).json({
                message: "Email or user already exist"
            });
        }
        res.status(500).json({
            message: "internal server error"
        })
    }
};

// User Signin
async function userSignin(req, res) {
    const schema = z.object({
        email: z.email(),
        password: z.string().min(3),
    });
    const result = schema.safeParse(req.body);

    if(!result.success) {
        return res.json({
            message: "Invalid input",
            error:  result.error
        });
    }

    const { email, password } = req.body;
    const user = await userModel.findOne({
        email
    });
    if(!user) {
        return res.json({
            message: "User not found"
        });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if(passwordMatch) {
        req.session.userId = user._id;
        return res.status(200).json({
            message: "Signin Successful!"
        })
    } else {
        return res.status(401).json({
            message: "Invalid credentails"
        });
    }
};

// User Signout
function userSignout(req, res) {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                message: "Failed to signout"
            });
        }
        res.json({
            message: "Signout Successful!"
        });
    });
};

// Get User Purchases
async function getUserPurchases(req, res) {
    const userId =  req.session.userId;
    if(!userId) {
        return res.status(401).json({
            message: "Unauthorized access"
        });
    }

    const purchases = await purchaseModel.find({ userId });

    if(!purchases.length) {
        return res.status(404).json({
            message: "No purchases found"
        });
    }

    const purchasesCourseIds = purchases.map(purchase => purchase.courseId);
    const coursesData = await courseModel.find({
        _id: { $in: purchasesCourseIds }
    });
    res.status(200).json({
        purchases,
        coursesData,
    });

};

module.exports = {
    userSignup,
    userSignin,
    userSignout,
    getUserPurchases,
};