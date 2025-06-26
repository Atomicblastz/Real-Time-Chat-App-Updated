import express from 'express';
import Message from '../models/message.model.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getUsers, getMessages, sendMessages } from '../controllers/message.controller.js';

const router = express.Router();

router.get('/users', protectRoute, getUsers);
router.get('/:id', protectRoute, getMessages);

router.post('/send/:id', protectRoute, sendMessages);

export default router;