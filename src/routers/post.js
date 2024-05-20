import { Router } from 'express';
import express from 'express';
import multer from 'multer';

import uploadCloud from '../middleware/cloudinary.js'

import * as controllers from '../controllers'


const router = Router();

router.use(express.json());

router.post('/', uploadCloud.single('file'), controllers.createPost);
router.get('/', controllers.allPost);
router.get('/:postLink', controllers.getPostByLink);
router.put('/:postLink', uploadCloud.single('file'), controllers.updatePost);
router.delete('/:postId', controllers.deletePost);
router.post('/:postId/like/:userId', controllers.createNewLike);
router.delete('/:postId/like/:userId', controllers.removeLike);
router.get('/:postId/like/:userId', controllers.getLikeById);
router.post('/:postId/comments/:userId', controllers.addComment);
router.put('/comments/:commentId', controllers.updateComment);
router.delete('/comments/:commentId', controllers.deleteComment);
router.get('/:postId/comments', controllers.getCommentsByPostId);






export default router;