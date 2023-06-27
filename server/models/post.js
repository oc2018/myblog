import mongoose, { Schema } from 'mongoose';

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    img: { type: Object },
    content: { type: String, required: true},
    author: { type: Schema.Types.ObjectId, ref: 'BlogUser' }

}, {
    timestamps: true
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;