import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    email : {
        type: String,
        required: true,
        unique: true,
    }, 
    role : {
        type : String,
        required : true,
        default: "NORMAL"
    },
    password: {
        type: String,
        require: true
    }
}, {timestamps: true})

const User = mongoose.model('USER', userSchema)

export default User;