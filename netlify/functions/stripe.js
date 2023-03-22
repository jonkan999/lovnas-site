// netlify/function/stripe.js

const stripe = require("stripe")(process.env.STRIPE_SECRET);
const { quantity } = JSON.parse(event.body);
exports.handler = async (event, context) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: "price_1MoXwGLHXKTpG87XbhFcS6CW",
        quantity: quantity, // use the quantity value from the request body
      },
    ],
    mode: "payment",
    success_url: "https://lovnasbryggeri.netlify.app/sucess.html",
    cancel_url: "https://lovnasbryggeri.netlify.app/folkölshoppen.html",
  });
  return {
    statusCode: 200,
    body: JSON.stringify({
      id: session.id,
    }),
  };
};
