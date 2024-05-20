import db from '../models/index.js';

export const getPaginatedPosts = async (page, limit) => {
    try {
        const offset = (page - 1) * limit;
        const posts = await db.Post.findAndCountAll({
            offset,
            limit,
        });
        return posts;
    } catch (error) {
        console.error('Error in getPaginatedPosts service:', error);
        throw error;
    }
}