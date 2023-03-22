// netlify/function/stripe.js

const stripe = require("stripe")(process.env.STRIPE_SECRET);
console.log("running");
exports.handler = async (event, context) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: "price_1MoXwGLHXKTpG87XbhFcS6CW",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://serverless-payments.netlify.app/success",
    cancel_url: "https://serverless-payments.netlify.app/cancel",
  });
  return {
    statusCode: 200,
    body: JSON.stringify({
      id: session.id,
    }),
  };
};
