const { adminModel } = require('../db.js');
const { courseModel } = require('../db.js');
const bcrypt = require('bcrypt');
const z = require('zod');

// Admin signup

async function adminignup(req, res) {
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