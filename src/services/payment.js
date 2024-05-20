import paypal from "@paypal/checkout-server-sdk";
require('dotenv').config();

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export const createPaypalOrder = async (totalAmount) => {
    const price = parseFloat(totalAmount);
    console.log("check >>", totalAmount)
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
            {
                reference_id: 'default',
                amount: {
                    currency_code: 'USD',
                    value: price.toFixed(2),
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: price.toFixed(2),
                        },
                    },
                },
                items: [
                    {
                        name: "Book of React",
                        description: "A book about React",
                        quantity: "1",
                        unit_amount: {
                            currency_code: "USD",
                            value: price.toFixed(2),
                        },
                    },
                ],
            },
        ],
    });

    try {
        const response = await client.execute(request);
        console.log("PayPal order response:", response.result);
        return response.result.id;
    } catch (error) {
        console.error("Error creating PayPal order:", error);
        throw new Error("Failed to create PayPal order");
    }

};
