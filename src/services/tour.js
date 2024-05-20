import db from '../models/index.js';
const cloudinary = require('cloudinary').v2;



export const createTour = (body, fileData) => new Promise(async (resolve, reject) => {
    try {
        const createLinkFromTitle = (title) => {
            const cleanedTitle = title.replace(/[^a-zA-Z0-9\s-]+/g, '');
            const lowercaseTitle = cleanedTitle.toLowerCase();
            const link = lowercaseTitle.replace(/\s+/g, '-');

            return link;
        }
        console.log("check fileData", fileData)
        const link = createLinkFromTitle(body.title);
        const response = await db.Tour.findOrCreate({
            where: { title: body?.title },
            defaults: {
                title: body.title,
                description: body.description,
                image: fileData?.path,
                places_name: body.places_name,
                link: link,
                price: body.price,

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


export const getAllTour = async () => {
    try {
        const getTour = await db.Tour.findAll();
        const tourData = getTour.map(tour => ({
            id: tour.id,
            title: tour.title,
            image: tour.image,
            places_name: tour.places_name,
            link: tour.link,
            price: tour.price,


        }));
        return tourData
    } catch (error) {
        console.log('check err >>>>', error);
        throw error;
    }
}

export const getTourByLink = async (tourLink) => {
    try {
        if (!tourLink) {
            throw new Error('Invalid post ID');
        }
        const tour = await db.Tour.findOne({ where: { link: tourLink } });
        return tour;
    } catch (error) {
        console.log('check err', error)

        throw new Error(`Lỗi khi lấy bài viết theo ID: ${error.message}`);
    }
}



export const updateTour = async (tourLink, newData, newImageData) => {
    try {
        const tour = await db.Tour.findOne({ where: { link: tourLink } });
        if (!tour) {
            throw new Error('Bài viết không tồn tại');
        }

        await tour.update(newData);

        return tour;
    } catch (error) {
        console.log('check err >>>>', error);
        throw error;
    }
};

export const deleteTour = async (tourId) => {
    try {
        const tour = await db.Tour.findOne({ where: { id: tourId } });
        if (!tour) {
            throw new Error('Bài viết không tồn tại');
        }
        await tour.destroy();
    } catch (error) {
        console.log('check err >>>>', error);

        throw error;
    }
}