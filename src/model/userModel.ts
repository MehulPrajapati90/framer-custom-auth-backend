import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema({
    userName: {
        type: String,
        maxLength: 30,
        minLength: 1,
        trim: true,
        required: true
    },
    emailId: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    role: {
        type: String,
        default: "user",
        enum: ['user', 'admin']
    },
    disable: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        trim: true,
        minLength: 8,
        required: true
    }
})

const userModel = model('user', userSchema);
export default userModel;