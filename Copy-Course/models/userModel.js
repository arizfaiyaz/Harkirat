const mongoose = require('mongoose');
const { email } = require('zod');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,   
    },
    
})