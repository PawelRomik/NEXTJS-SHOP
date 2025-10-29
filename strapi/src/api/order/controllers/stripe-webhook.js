// @ts-ignore
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// @ts-ignore
module.exports = {
  async handleWebhook(ctx) {
    const sig = ctx.request.headers["stripe-signature"];

    // użycie Symbol.for("unparsedBody") do raw body
    const raw = ctx.request.body
      ? ctx.request.body[Symbol.for("unparsedBody")]
      : null;

    if (!raw) {
      ctx.response.status = 400;
      return "❌ No raw payload found. Stripe signature verification impossible.";
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        raw,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      ctx.response.status = 400;
      return `Webhook Error: ${err.message}`;
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const user = session.metadata.user;
      const products = JSON.parse(session.metadata.products);

      await strapi.service("api::order.order").create({
        data: {
          products,
          stripeId: session.id,
          user,
          status: "paid",
        },
      });
    }

    ctx.response.status = 200;
    return { received: true };
  },
};
