import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phoneNo: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
    }
}, { timestamps: true });


const userModel = mongoose.model("user", userSchema)
export default userModel