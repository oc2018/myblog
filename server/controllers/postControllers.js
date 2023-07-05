import mongoose from "mongoose";
import PostMessage from "../models/post.js";
import cloudinary from "../utils/cloudinary.js";
import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import fs from 'fs';
import streamifier from 'streamifier';


dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
})

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

        res.status(200).json(data);
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

export const createPost = async(req, res) => {

    // console.log(req.file)
    
    try {
        const { title, summary, content } = req.body;
        const { token } = req.cookies;

        Jwt.verify(token, process.env.JWT_SECRET, {}, async(err, info)=> {
            if (err) return res.status(400).json({ message: 'Invalid token' });

            const uploadRes = await cloudinary.uploader.upload_stream({ folder: 'uploads' }, async(error, result) => {
                if(error) return console.error(error);
                if(result){
                    
                    const newPost = await new PostMessage({ title, summary, img: result.url, content, author: info._id });
            
                    await newPost.save();
            
                    res.status(200).json(newPost);
                }            
            });
            streamifier.createReadStream(req.file.buffer).pipe(uploadRes);
            
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

export const updatePost = async(req, res) => {
    // let newName;

    // if (req.file) {
        
    //     const { originalname, path } = req.file;
    //     const ext = originalname.split('.')[originalname.split('.').length - 1];
    //     newName = `${path}.${ext}`;
    //     fs.renameSync(path, newName);
    
    // }

    const {title, summary, content } = req.body;
    const { token } = req.cookies;
    const { id: _id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json({ message: 'Invalid id' });
    const postData = await PostMessage.findById( _id );
    
    try {
        Jwt.verify(token, process.env.JWT_SECRET, {}, async(err, info)=> {
            if (err) return res.status(400).json({ message: 'Invalid token' });
            const isAuthor = JSON.stringify(postData.author) === JSON.stringify(info._id)
            
            const uploadRes = await cloudinary.uploader.upload_stream({ folder: 'uploads' }, async(error, result) => {
                if(error) return console.error(error);
                if(result){

                if(isAuthor) {
                
                        const updatedPost = await PostMessage.findByIdAndUpdate( _id, { title, summary, content, img: result.url ? result.url : postData.img, _id }, { new: true });
                
                        res.status(200).json(updatedPost);
                    } else {
                        res.status(403).json({ message: 'You are not allowed to edit this post. Only the author can edit' });
                    }
                
                }
            
            });

            streamifier.createReadStream(req.file.buffer).pipe(uploadRes);

        });

        
        
    } catch (error) {
        console.error( error.message || error );
        res.status(500).json({ message: error.message });
    }

}

export const deletePost = async(req, res) => {
    const { id: _id } = req.params;
    const { token } = req.cookies;
    
    try {
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json({ message: 'Invalid id' });
        
        Jwt.verify( token, process.env.JWT_SECRET, {}, async(err, info) => {

            if(err) return res.status(403).json({ message: `You are not authorized to delete this Article` });

            const postData = await PostMessage.findById( _id );

            const isAuthor = JSON.stringify(postData.author) === JSON.stringify(info._id);

            if (!isAuthor) return res.status(403).json({ message: `You are not authorized to delete this Article, Only the author can delete` });

            if (isAuthor) {

                const success = await PostMessage.findByIdAndDelete( _id );
                res.status(200).json({ message: success });
            }

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    } 
}