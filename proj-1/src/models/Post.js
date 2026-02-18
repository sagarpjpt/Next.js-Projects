import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    img: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
}, {timestamps: true})

const Post = mongoose.models.Post || mongoose.model('Post', postSchema)

export default Post;