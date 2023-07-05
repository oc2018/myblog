import express from 'express';
import multer from 'multer';

import { getPosts, createPost, updatePost, deletePost, getPost,  } from '../controllers/postControllers.js';

const storage = multer.memoryStorage();
const uploadMiddleware = multer({    
    storage
});

// const uploadMiddleware = (req, res) => {
//     upload(req, res, (err) => {
//         if (err instanceof multer.MulterError) {
//             res.status(400).json({message: err.message})
//         } else if (err) {
//             res.status(400).json({message: 'Unknown error occurred '})
//         }
//     })
// }

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API,
//     api_secret: process.env.CLOUDINARY_SECRET,
//     secure: true,
// })

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', uploadMiddleware.single('file'),  createPost);
router.patch('/:id', uploadMiddleware.single('file'), updatePost);
router.delete('/:id', deletePost);

export default router;