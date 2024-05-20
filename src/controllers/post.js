import * as services from '../services';
const cloudinary = require('cloudinary').v2;
import Joi from 'joi';
import { Post } from '../models';


export const createPost = async (req, res) => {
    const fileData = req.file;

    const { title, content, description } = req.body;

    try {
        const schema = Joi.object({
            title: Joi.string().required(),
            content: Joi.string().required(),
            image: Joi.string().required(),
            description: Joi.string().required(),
        });

        const { error } = schema.validate({ title, content, image: fileData?.path, description });
        if (error) {
            if (fileData) {
                cloudinary.uploader.destroy(fileData.filename);
            }
            return res.status(400).json({ error: error.details[0].message }, console.log("check>>", error));
        }
        const createLinkFromTitle = (title) => {
            // Xóa các ký tự không phải chữ cái, số, hoặc dấu gạch ngang từ title
            const cleanedTitle = title.replace(/[^a-zA-Z0-9\s-]+/g, '');
            // Chuyển đổi title thành lowercase
            const lowercaseTitle = cleanedTitle.toLowerCase();
            // Thay thế khoảng trắng bằng dấu gạch ngang
            const link = lowercaseTitle.replace(/\s+/g, '-');

            return link;
        }

        const link = createLinkFromTitle(title);

        const result = await services.createPost({ ...req.body, link }, fileData);
        return res.status(200).json({ message: 'Tạo bài viết thành công', result });
    } catch (error) {
        if (fileData) {
            cloudinary.uploader.destroy(fileData.filename);
        }
        res.status(500).json({ error: 'Internal Server Error' });
        console.log(error);
    }
};


export const allPost = async (req, res) => {
    try {
        const postTitles = await services.getAllPost();
        res.json(postTitles)
    } catch (error) {
        console.log('check err >>>', error)
        return res.status(500).json({
            error: true,
            message: 'Error in server',

        })
    }
}

export const getPostByLink = async (req, res) => {
    const { postLink } = req.params;
    try {
        const post = await services.getPostByLink(postLink);
        res.json(post)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

export const updatePost = async (req, res) => {
    const { postLink } = req.params;
    const newData = req.body;
    const newImageData = req.file
    try {
        if (newImageData) {
            // Nếu có ảnh mới được tải lên
            newData.image = newImageData.path; // Cập nhật đường dẫn ảnh mới vào newData
        }
        const post = await services.updatePost(postLink, newData, newImageData);
        if (post && post.image) {
            // Xóa ảnh cũ trên Cloudinary
            const publicId = post.image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId);
        }
        res.status(200).json({ message: 'Cập nhật bài viết thành công', post });
    } catch (error) {
        console.log('check err', error)
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật bài viết' });
    }
}

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        if (!postId) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        await services.deletePost(postId);
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: `Error deleting user by ID: ${error.message}` });
    }
}

export const createNewLike = async (req, res) => {
    const { postId, userId } = req.params;
    try {
        const post = await services.addLike(postId, userId);
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const removeLike = async (req, res) => {
    const { postId, userId } = req.params;
    try {
        const post = await services.removeLike(postId, userId);
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: 'Post not found or no likes to remove' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const getLikeById = async (req, res, next) => {
    try {
        const { postId, userId } = req.params;
        const like = await services.getLikeById(postId, userId);
        res.json(like);
    } catch (error) {
        next(error);
    }
};

export const addComment = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const { content, userId, userName, userAvatar } = req.body;


        const comment = await services.createNewComment(postId, userId, userName, userAvatar, content);
        res.status(201).json(comment);
    } catch (error) {
        next(error);
    }
};

export const updateComment = async (req, res, next) => {
    try {
        const { commentId } = req.params;
        const { updatedContent } = req.body;
        await services.updateComment(commentId, updatedContent);
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
};

export const deleteComment = async (req, res, next) => {
    try {
        const { commentId } = req.params;
        await services.deleteComment(commentId);
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
};

export const getCommentsByPostId = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const comments = await services.getCommentsByPostId(postId);
        res.json(comments);
    } catch (error) {
        next(error);
    }
};