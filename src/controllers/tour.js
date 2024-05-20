import * as services from '../services';
const cloudinary = require('cloudinary').v2;
import Joi from 'joi';


export const createTour = async (req, res) => {
    const fileData = req.file;
    const { title, description } = req.body;

    try {
        const schema = Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
        });
        console.log("check fileData", fileData)
        const { error } = schema.validate({ title, description });
        if (error) {
            if (fileData) {
                cloudinary.uploader.destroy(fileData.filename);
            }
            return res.status(400).json({ error: error.details[0].message });
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

        const link = createLinkFromTitle(title); // Tạo link từ title

        const result = await services.createTour({ ...req.body, link }, fileData); // Truyền link vào services.createTour
        return res.status(200).json(result);
    } catch (error) {
        if (fileData) {
            cloudinary.uploader.destroy(fileData.filename);
        }
        res.status(500).json({ error: 'Internal Server Error' });
        console.log(error);
    }
};

export const allTour = async (req, res) => {
    try {
        const tourData = await services.getAllTour();
        res.json(tourData)
    } catch (error) {
        console.log('check err >>>', error)
        return res.status(500).json({
            error: true,
            message: 'Error in server',

        })
    }
}

export const getTourByLink = async (req, res) => {
    const { tourLink } = req.params;
    try {
        const tour = await services.getTourByLink(tourLink);
        res.json(tour)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateTour = async (req, res) => {
    const { tourLink } = req.params;
    const newData = req.body;
    const newImageData = req.file; // Lấy dữ liệu file ảnh từ request

    try {
        if (newImageData) {
            // Nếu có ảnh mới được tải lên
            newData.image = newImageData.path; // Cập nhật đường dẫn ảnh mới vào newData
        }
        const tour = await services.updateTour(tourLink, newData, newImageData);
        if (tour && tour.image) {
            const publicId = tour.image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId);
        }
        res.status(200).json({ message: 'Cập nhật bài viết thành công', tour });
    } catch (error) {
        console.log('check err', error)
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật bài viết' });
    }
}

export const deleteTour = async (req, res) => {
    try {
        const tourId = req.params.tourId;
        if (!tourId) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        await services.deleteTour(tourId);
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: `Error deleting user by ID: ${error.message}` });
    }
}

