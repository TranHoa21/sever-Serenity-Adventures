import * as services from '../services';


export const creatPlace = async (req, res) => {
    const { name, address } = req.body
    try {
        const result = await services.createNewPlace({ name, address })
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getAllPlace = async (req, res) => {
    try {
        const places = await services.getAllPlace();
        res.json(places)
    } catch (error) {
        console.log('check err >>>', error)
        return res.status(500).json({
            error: true,
            message: 'Error in server',

        })
    }
}