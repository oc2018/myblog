import express from 'express';
import multer from 'multer';

import { getPosts, createPost, updatePost, deletePost, getPost,  } from '../controllers/postControllers.js';

const uploadMiddleware = multer({ dest: 'uploads' });


const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', uploadMiddleware.single('file'), createPost);
router.patch('/:id', uploadMiddleware.single('file'), updatePost);
router.delete('/:id', deletePost);

export default router;