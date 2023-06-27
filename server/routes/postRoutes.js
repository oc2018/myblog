import express from 'express';

import { getPosts, createPost, updatePost, deletePost, getPost } from '../controllers/postControllers.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;