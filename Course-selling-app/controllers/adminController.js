const { adminModel } = require('../db.js');
const { courseModel } = require('../db.js');
const bcrypt = require('bcrypt');
const z = require('zod');

// Admin signup

async function adminSignup(req, res) {
    const schema = zod.object({
        email: z.email().min(5),
        password: z.string().min(5),
        firstname: z.string().min(3).max(30),
        lastName: z.string().min(0).max(30),
    });

    const result = schema.safeParse(req.body);
    if(!result.success) {
        return res.json({
            message: "Invalid data format", error: result.error
        });
    }

    const { email, password, firstName, lastName } = req.body;
    const hashedpassword = await bcrypt.hash(password, 5);
    
    try{
        await adminModel.create({
            email,
            password: hashedpassword,
            firstName,
            lastName
        });
        res.json({
            message: "admin signup succesfull"
        })
    } catch (error) {
        return res.json({
            message: "Admin already exists"
        })
    }
};

// Admin signin
async function adminSignin(req, res) {
    const schema = z.object({
        email: z.email(),
        password: z.string().min(6),
    });
    const result = schema.safeParse(req.body);
    if(!result.success) {
        return res.json({
            message: "Incorrect data format", error: result.error
        })
    }

    const { email, password } = req.body;
    const admin = await adminModel.findOne({ email});

    if(!admin) {
        return res.json({
            message: "admin not found"
        });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if(passwordMatch){
        req.session.adminId = admin._id;
        res.json({
            message: "Signin Successful!"
        });
    } else {
        res.json({
            message: "Incorrect password"
        });
    }
}

// Create Course
async function createCourse(req, res) {
    const schema = z.object({
        title: zod.string().min(5),
        description: z.string().min(30).max(150),
        imageUrl: z.string().url(),
        price: z.number().positive(),
    });

    const result = schema.safeParse(req.body);

    if(!result.success) {
        return res.json({
            message: "incorrect data format", error: result.error
        });
    }
    const { title, description, imageUrl, price } = req.body;

    const course = await courseModel.create({
        title,
        description,
        imageUrl,
        price,
        createrId: req.adminId,
    });

    return res.json({
        message: "Course created!", courseId: course._Id 
    });  
}

// Update course

async function updateCourse(req, res) {
    const schema = z.object({
        courseId: z.string().min(5),
        title: z.string().min(5).optional(),
        description: z.string().min(30).max(150).optional(),
        imageUrl: z.string().url().optional(),
        price: z.number().positive().optional(),
    });

    const result = schema.safeParse(req.body);
    if(!result.success) {
        return res.json({
            message: "incorrect data format", error: result.error
        });
    }

    const { courseId, title, description, imageUrl, price } = req.body;
    const course = await courseModel.findOne({
        _id: courseId, 
        createrId: res.adminId
    });
    if(!course) {
        return res.json({
            message: "Course not found!"
        });
    }

    await courseModel.updateOne(
        { _id: courseId, createrId: req.adminId },
        {
            title: title || course.title,
            description: description || course.description,
            imageUrl: imageUrl || course.imageUrl,
            price: price || course.price
        }
    );
    res.json({
        message: "Course update successfully"
    });
}

// Delete Course
async function deleteCourse(req, res) {
    const schema = z.object({
        courseId: z.string().min(5),
    });

    const result = schema.safeParse(req.body);
    if(!result.success) {
        return res.json({
            message: "Incorrect data format", error: result.error
        })
    }
    const { courseId } = req.body;
    const course = await courseModel.findOne({
        _id: courseId, createrId: req.adminId,
    });
    if(!course) {
        return res.json({
            message: "Course not found!"
        });
    }

    await courseModel.deleteOne({

        _id: courseId, createrId: req.adminId
    });
    return res.json({
        message: "course deleted succesfully"
    });
};

// Get all the Courses
async function getAllCourse(req, res) {
    const courses = await courseModel.find({
        createrId: req.adminId
    });
    return res.json({
        courses
    });
};

module.exports = {
    adminSignup,
    adminSignin,
    createCourse,
    updateCourse,
    deleteCourse,
    getAllCourse,
}; 