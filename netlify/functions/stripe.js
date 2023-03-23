// netlify/function/stripe.js

const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.handler = async (event, context) => {
  const { quantity } = JSON.parse(event.body);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: "price_1MoXwGLHXKTpG87XbhFcS6CW",
        quantity: quantity, // use the quantity value from the request body
      },
    ],
    shipping_address_collection: { allowed_countries: ["SE"] },
    shipping_options: [
      {
        shipping_rate: "shr_1MoknOLHXKTpG87X9ar2X0eU", // Replace with the actual shipping rate ID for "Frakt"
      },
      {
        shipping_rate: "shr_1MokoPLHXKTpG87XYHWH8ugz", // Replace with the actual shipping rate ID for "Upphämtning på Roslagsgatan 14, Stockholm"
      },
    ],
    /*     shipping_rates: [
      "shr_1MoknOLHXKTpG87X9ar2X0eU", // Replace with the actual shipping rate ID for "Frakt"
      "shr_1MokoPLHXKTpG87XYHWH8ugz", // Replace with the actual shipping rate ID for "Upphämtning på Roslagsgatan 14, Stockholm"
    ], */
    mode: "payment",
    locale: "sv",
    /*     success_url: "https://serverless-payments.netlify.app/success",
    cancel_url: "https://serverless-payments.netlify.app/cancel", */
    success_url: "https://lovnasbryggeri.netlify.app/success.html",
    cancel_url: "https://lovnasbryggeri.netlify.app/folkolshoppen.html",
  });
  return {
    statusCode: 200,
    body: JSON.stringify({
      id: session.id,
    }),
  };
};
