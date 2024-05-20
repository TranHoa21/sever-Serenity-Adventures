import db from '../models/index.js';
import { Op } from 'sequelize';

export const searchProductsService = (searchTerm) => {
    return new Promise((resolve, reject) => {
        // Truy vấn cơ sở dữ liệu
        const query = `SELECT * FROM products WHERE name LIKE '%${searchTerm}%'`;

        db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT })
            .then(results => {
                resolve(results);
            })
            .catch(err => {
                console.error('Lỗi truy vấn cơ sở dữ liệu: ', err);
                reject(err);
            });
    });
};


export const filterProductsService = async (filterOptions) => {
    try {
        const { keyword, maxPrice, color, size } = filterOptions;
        const whereClause = {};

        if (keyword) {
            whereClause.name = {
                [Op.like]: `%${keyword}%`,
            };
        }

        if (maxPrice && !isNaN(maxPrice)) {
            whereClause.price = {
                [Op.lte]: maxPrice,
            };
        }

        if (color) {
            whereClause.color = color;
        }

        if (size) {
            whereClause.size = size;
        }

        const filteredProducts = await db.Product.findAll({
            where: whereClause,
            attributes: ['name', 'price', 'image', 'review']
        });

        return filteredProducts;
    } catch (error) {
        console.log('check err >>', error)
        throw new Error('Lỗi tìm kiếm sản phẩm.');
    }
};



