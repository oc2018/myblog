import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: { type: String, required: true, min: 4, unique: true },
    email: { type: String, required: true, unique: true},
    password: { type:String, required: true },
    // createdAt: { type: Date, default: new Date() },
},{
    timestamps: true
}); 

const BlogUser = mongoose.model('BlogUser', userSchema);

export default BlogUser;