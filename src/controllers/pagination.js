import * as services from '../services';

export const paginatedPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const result = await services.getPaginatedPosts(page, limit);
        const { count, rows } = result;

        const totalPages = Math.ceil(count / limit);
        const hasNextPage = page < totalPages;
        const nextPage = hasNextPage ? page + 1 : null;

        res.json({
            totalCount: count,
            totalPages,
            currentPage: page,
            hasNextPage,
            nextPage,
            posts: rows,
        });
    } catch (error) {
        console.error('Error in paginatedPosts controller:', error);
        return res.status(500).json({
            error: true,
            message: 'Lỗi trong quá trình xử lý',
        });
    }
}