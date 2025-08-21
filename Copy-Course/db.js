//Import mongoose to interact with mongodb
const mongoose = require('mongoose');

// Use schema and ObjectId from mongooose for creqating models
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

// Define User Schema
const UserSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    }
});

// Define AdminSchema
const AdminSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    }
});

// Define the CourseSchema
const CourseSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        require: true,
    },
    createrId: ObjectId,
});

const PurchaseSchemma = new Schema({
    userId: ObjectId,
    courseId: ObjectId,
});


const userModel = mongoose.model('user', UserSchema);
const adminModel = mongoose.model('admin', AdminSchema);
const courseModel = mongoose.model('course', CourseSchema);
const purchaseModel = mongoose.model('purchase', PurchaseSchemma);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel,
};