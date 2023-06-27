import mongoose from "mongoose";
import PostMessage from "../models/post.js";
import cloudinary from "../utils/cloudinary.js";
import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const getPost = async(req, res) => {

    const { id: _id } = req.params;

    try {

        const data = await PostMessage.findById(_id).populate('author', ['username']);

        res.status(200).json(data);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

export const getPosts = async(req, res) => {
    
    try {

        const data = await PostMessage.find().populate('author', ['username']).sort({ createdAt: -1 });
        // console.log(data)

        res.status(200).json(data);
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

export const createPost = async(req, res) => {
    const { token } = req.cookies;
    // console.log(token)
    const { title, summary, img, content } = req.body;
    try {

        Jwt.verify(token, process.env.JWT_SECRET, {}, async(err, info)=> {
            // console.log(info._id);
            if (err) return res.status(400).json({ message: 'Invalid token' });
            if(img) {
    
                const uploadRes = await cloudinary.uploader.upload(img, { upload_preset: 'erics_blog_photos'});
    console.log(uploadRes)
                if(uploadRes){
        
                    const newPost = await new PostMessage({ title, summary, img: uploadRes, content, author: info._id });
            
                    await newPost.save();
            
                    res.status(200).json(newPost);
                }
            }
            
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

export const updatePost = async(req, res) => {
    const post = req.body;
    const { img } = post;
    const { id: _id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json({ message: 'Invalid id' });
            
    try {

        if(img) {
            
            const uploadRes = await cloudinary.uploader.upload(img, { upload_preset: 'erics_blog_photos'});
            console.log('image uploaded')

            if(uploadRes) {

                const updatedPost = await PostMessage.findByIdAndUpdate( _id, { ...post, img: uploadRes, _id }, { new: true });
                
                console.log('success')
                res.status(200).json(updatedPost);
            }
        }
        
    } catch (error) {
        console.error( error.message || error );
        res.status(500).json({ message: error.message });
    }

}

export const deletePost = async(req, res) => {
    const { id: _id } = req.params;
    
    try {
    
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json({ message: 'Invalid id' });

        const success = await PostMessage.findByIdAndDelete( _id );


        res.status(200).json({ message: success });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    } 
}