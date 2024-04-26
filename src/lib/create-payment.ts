// src/routes/api/create-payment.ts
import stripe from 'stripe';

const stripeSecretKey = 'sk_test_51P6CCIHPHCO7vleeXG97tCLoXiFKIAmOUIs7lNAJcj1ERFUpi7QbFAP6xNQhFFJtR2bRRBNnHXcs9bYuBlDK8hLD00aoVo5M9w';
const stripeInstance = new stripe(stripeSecretKey);

// export async function post(request:any) {
//     try {
//         const paymentIntent = await stripeInstance.paymentIntents.create({
//             amount: 1000, // сумма платежа в копейках
//             currency: 'usd',
//             description: 'Оплата за товары',
//         });
//         return {
//             body: {
//                 client_secret: paymentIntent.client_secret
//             }
//         };
//     } catch (error) {
//         console.error(error);
//         return {
//             status: 500,
//             body: 'Произошла ошибка при создании платежа'
//         };
//     }
// }


// export async function getPaymentLink() {

//     try {
//         const paymentIntent = await stripeInstance.paymentIntents.create({
//             amount: 1000, // сумма платежа в копейках
//             currency: 'usd',
//             description: 'Оплата за товары',
//             metadata: {
//                 products: '6735',
//             },
//         });
//         return {
//             body: {
//                 client_secret: paymentIntent.client_secret,
//                 all:paymentIntent
//             }
//         };
//     } catch (error) {
//         console.error(error);
//         return {
//             status: 500,
//             body: 'Произошла ошибка при создании платежа'
//         };
//     }
// }

//export const stripePaymentLink = getPaymentLink()


export async function getPaymentLink() {
    try {
        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Product-1',
                        },
                        unit_amount: 1000,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'https://test-fawn-two-87.vercel.app/success',
            cancel_url: 'https://test-fawn-two-87.vercel.app/cancel',
        });
        return {
            body: {
                session_id: session.id,
                session_url: session.url
            }
        };
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            body: 'Произошла ошибка при создании сеанса чекаута'
        };
    }
}
