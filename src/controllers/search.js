import { searchProductsService, filterProductsService } from '../services/search';


export const searchProductsController = async (req, res) => {
    try {
        const searchTerm = req.query.searchTerm; // Lấy giá trị từ query string

        const results = await searchProductsService(searchTerm);
        res.status(200).json(results);
    } catch (err) {
        console.error('Lỗi tìm kiếm sản phẩm: ', err);
        res.status(500).json({ error: 'Lỗi tìm kiếm sản phẩm' });
    }
};

export const filterProducts = async (req, res, next) => {
    try {
        const { keyword, maxPrice, color, size } = req.query;

        const filterOptions = {
            keyword,
            maxPrice: parseFloat(maxPrice),
            color,
            size,
        };

        const filteredProducts = await filterProductsService(filterOptions);

        res.json(filteredProducts);
    } catch (error) {
        next(error);
    }
};

