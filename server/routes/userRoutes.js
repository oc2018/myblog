import express  from 'express';

import { signup, login, profile, logout } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', profile);
router.post('/logout', logout);

export default router;