const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

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

    },

});


const adminModel = mongoose.model('admin', AdminSchema);

module.exports = {
    adminModel
}