const mongoose = require('mongoose');



const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const UserSchema = new Schema({

    email: {
        string: true,
        required: true,
        unique: true,
    },
    password: {
        string: true,
        required: true,
    },
    firstName: {
        string: true,
        required: true,
    },
    lastName: {
        string: true,
        required: true,
    }
});

const AdminSchema = new Schema({

    email: {
        string: true,
        required: true,
        unique: true,
    },
    password: {
        string: true,
        required: true,
    },
    firstName: {
        string: true,
        required: true,
    },
    lastName: {
        string: true,
        required: true,
    }
});

const CourseSchema = new Schema({
    title: {
        string: true,
        required: true,
    },
    description: {
        string: true,
        required: true,
    },
    price: {
        number: true,
        required: true,
    },
    imageUrl: {
        string: true,
        require: true,
    },
    createrId: ObjectId,
});

const PurchaseSchemma = new Schema({
    purchase_id: ObjectId,
    course_id: ObjectId,
    user_id: ObjectId,
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