import * as services from '../services';

export const createOrderController = async (req, res) => {
    const totalAmount = req.body.totalAmount;
    try {
        const orderId = await services.createPaypalOrder(totalAmount);
        res.status(200).json({ message: orderId });
    } catch (error) {
        console.error("Error creating PayPal order:", error);
        res.status(500).json({ error: "Failed to create PayPal order" });
    }
};