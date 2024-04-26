// src/routes/api/create-payment.ts
import stripe from 'stripe';
import { page } from '$app/stores';
//import {getCurrentUser} from "$lib/pages/Header.js"

//let currentUserVal:any



const stripeSecretKey = 'sk_test_51P6CCIHPHCO7vleeXG97tCLoXiFKIAmOUIs7lNAJcj1ERFUpi7QbFAP6xNQhFFJtR2bRRBNnHXcs9bYuBlDK8hLD00aoVo5M9w';
const stripeInstance = new stripe(stripeSecretKey);

export async function POST(requestEvent:any, res:any) {
    try {
        const {request} = requestEvent
        let {siteUrl, cartItems, user} = await request.json()
        let UID = user.uid?user.uid:user
        console.log("user - ", UID)
        let arrProducts: Array<any> = []
        let arrProductsID: Array<any> = []
        cartItems.forEach((item: any) => {
            arrProductsID.push(item.id)
            arrProducts.push({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        images: [`https://test-fawn-two-87.vercel.app/images/products/${item.img}`],
                    },
                    unit_amount: item.price*100,
                },
                quantity: item.quantity,
            })
        });
        let stringProductsID = JSON.stringify(arrProductsID)
        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: arrProducts,
            mode: 'payment',
            success_url: `${siteUrl}/success?uid=${UID}&pid=${stringProductsID}`,
            cancel_url: `${siteUrl}/cancel`,
        });
        return new Response(JSON.stringify( {
            status: 200,
            body: {
                session_id: session.id,
                session_url: session.url
            }
        }))
       
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            body: 'Произошла ошибка при создании сеанса чекаута'
        };
    }
}
