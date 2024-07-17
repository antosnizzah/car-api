// import dotenv from 'dotenv';
// const Hono = require("hono");
// const Stripe = require("stripe");
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// const app = new Hono();


// app.post ('/create-checkout-session', async (req, res) => {
//   const session = await Stripe.Checkout.Sessions.create({
//     line_items: [{
//       price_data: {
//         currency: 'usd',
//         product_data: {
//           name: 'T-shirt',
//         },
//         unit_amount: 2000,
//       },
//       quantity: 1,
//     }],
//     mode: 'payment',
//     success_url:`${process.env.CLIENT_URL}/checkout-success` ,
//     cancel_url: `${process.env.CLIENT_URL}/checkout-cancelled`,
//   });
//     res.redirect({ 303: session.url });
//     });
//     module.exports = app;