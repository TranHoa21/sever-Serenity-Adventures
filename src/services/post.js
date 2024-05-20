import db from '../models/index.js';
const cloudinary = require('cloudinary').v2;
import { Post } from '../models';
import Sequelize from 'sequelize';



export const createPost = (body, fileData) => new Promise(async (resolve, reject) => {
    try {
        const createLinkFromTitle = (title) => {
            const cleanedTitle = title.replace(/[^a-zA-Z0-9\s-]+/g, '');
            const lowercaseTitle = cleanedTitle.toLowerCase();
            const link = lowercaseTitle.replace(/\s+/g, '-');

            return link;
        }

        const link = createLinkFromTitle(body.title);
        const response = await db.Post.findOrCreate({
            where: { title: body?.title },
            defaults: {
                title: body.title,
                content: body.content,
                description: body.description,
                image: fileData?.path,
                link: link,
            },

        })
        resolve({
            err: response[1] ? 0 : 1,
            mes: response[1] ? 'Created' : 'Cannot create new post',
        })
        if (fileData && !response[1]) cloudinary.uploader.destroy(fileData.filename)
    }

    catch (error) {
        reject(error)
        if (fileData && !response[1]) cloudinary.uploader.destroy(fileData.filename)

    }
})




export const getAllPost = async () => {
    try {
        const getPost = await db.Post.findAll();
        return getPost
    } catch (error) {
        console.log('check err >>>>', error);
        throw error;
    }
}

export const getPostByLink = async (postLink) => {
    try {
        if (!postLink) {
            throw new Error('Invalid post ID');
        }
        const post = await db.Post.findOne({ where: { link: postLink } });
        return post;
    } catch (error) {
        console.log('check err', error)

        throw new Error(`Lỗi khi lấy bài viết theo ID: ${error.message}`);
    }
}

export const findPostById = async (postId) => {
    try {
        if (!postId) {
            throw new Error('Invalid post ID');
        }
        const post = await db.Post.findOne({ where: { id: postId } });
        return post;
    } catch (error) {
        console.log('check err', error)

        throw new Error(`Lỗi khi lấy bài viết theo ID: ${error.message}`);
    }
}

export const updatePost = async (postLink, newData, newImageData) => {
    try {
        const post = await db.Post.findOne({ where: { link: postLink } });
        if (!post) {
            throw new Error('Bài viết không tồn tại');
        }

        await post.update(newData);

        return post;
    } catch (error) {
        console.log('check err >>>>', error);

        throw error;
    }
}

export const deletePost = async (postId) => {
    try {
        const post = await db.Post.findOne({ where: { id: postId } });
        if (!post) {
            throw new Error('Bài viết không tồn tại');
        }
        await post.destroy();
    } catch (error) {
        console.log('check err >>>>', error);

        throw error;
    }
}


export const addLike = async (postId, userId) => {
    try {
        // Tìm bài viết dựa trên postId
        const post = await Post.findOne({ where: { id: postId } });

        if (!post) {
            return { error: 'Post not found' };
        }

        const alreadyLiked = await db.Like.findOne({
            where: { post_id: postId, user_id: userId },
        });

        if (alreadyLiked) {
            return { error: 'User has already liked this post' };
        }

        // Tạo mới một like trong bảng Like
        await db.Like.create({
            post_id: postId,
            user_id: userId,
            liked: true,
        });

        // Tăng số lượt like của bài viết và lưu lại
        await Post.increment('like', { by: 1, where: { id: postId } });

        return { success: true, post };
    } catch (error) {
        throw error;
    }
};


export const removeLike = async (postId, userId) => {
    try {
        // Tìm bài viết dựa trên postId
        const post = await Post.findOne({ where: { id: postId } });

        if (!post) {
            throw new Error('Post not found');
        }

        // Kiểm tra xem userId đã like bài viết này chưa
        const like = await db.Like.findOne({
            where: { post_id: postId, user_id: userId },
        });

        if (!like) {
            throw new Error('User has not liked this post');
        }

        // Xóa like từ bảng Like
        await like.destroy();

        // Giảm số lượt like của bài viết và lưu lại
        post.like -= 1;
        await post.save();

        return post;
    } catch (error) {
        throw error;
    }
};
export const getLikeById = async (postId, userId) => {
    try {
        const like = await db.Like.findOne({ where: { post_id: postId, user_id: userId } });
        return like;
    } catch (error) {
        console.error('Error getting like:', error);
        throw new Error('An error occurred');
    }
};

export const createNewComment = async (postId, userId, userName, userAvatar, comment) => {
    try {
        const post = await Post.findByPk(postId);
        if (!post) {
            throw new Error('Post not found');
        }

        const newComment = await db.Comment.create({
            post_id: postId,
            comment_text: comment,
            user_id: userId,
            user_name: userName,
            user_avatar: userAvatar
        });
        await addComment(postId);
        return newComment;
    } catch (error) {
        console.error('Error creating comment:', error);
        throw new Error('An error occurred');
    }
};

export const addComment = async (postId, userId) => {
    try {
        const post = await Post.findOne({ where: { id: postId } });

        if (!post) {
            throw new Error('Post not found');
        }

        post.comment += 1;

        await post.save();
        return post.comment;
    } catch (error) {
        throw error;
    }
};



export const updateComment = async (commentId, updatedContent) => {
    try {
        const comment = await db.Comment.findByPk(commentId);
        if (!comment) {
            throw new Error('Comment not found');
        }

        comment.content = updatedContent;
        await comment.save();

        return;
    } catch (error) {
        console.error('Error updating comment:', error);
        throw new Error('An error occurred');
    }
};

export const deleteComment = async (commentId) => {
    try {
        // Tìm comment dựa trên commentId
        const comment = await db.Comment.findByPk(commentId);
        if (!comment) {
            throw new Error('Comment not found');
        }

        const postId = comment.post_id;

        // Xóa comment từ bảng Comment
        await comment.destroy();

        // Giảm số lượng bình luận của bài viết và lưu lại
        const post = await db.Post.findByPk(postId);
        if (post) {
            post.comment -= 1;
            await post.save();
        }

        return post;
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw new Error('An error occurred');
    }
};




export const getCommentsByPostId = async (postId) => {
    try {
        const comments = await db.Comment.findAll({ where: { post_id: postId } });
        return comments;
    } catch (error) {
        console.error('Error getting comments:', error);
        throw new Error('An error occurred');
    }
};

