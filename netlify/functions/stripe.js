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
    mode: "payment",
    locale: "sv",
    /*     success_url: "https://serverless-payments.netlify.app/success",
    cancel_url: "https://serverless-payments.netlify.app/cancel", */
    success_url: "https://lovnasbryggeri.netlify.app/success.html",
    cancel_url: "https://lovnasbryggeri.netlify.app/folkolshoppen.html",
    shipping_address_collection: { allowed_countries: ["SE"] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "sek" },
          display_name: "Fri frakt (Lämna tom om upphämtning)",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 4 },
            maximum: { unit: "business_day", value: 10 },
          },
        },
      },
    ],
  });
  return {
    statusCode: 200,
    body: JSON.stringify({
      id: session.id,
    }),
  };
};
