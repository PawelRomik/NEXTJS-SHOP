// @ts-ignore
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

("use strict");

// @ts-ignore
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { products, currency, exchangeRate, discount, locale, user } =
      ctx.request.body;

    try {
      const lineItems = await Promise.all(
        products.map(async (product) => {
          const items = await strapi.entityService.findMany(
            "api::product.product",
            {
              filters: { uuid: product.uuid },
              locale: locale,
            }
          );
          const item = items[0];
          const price = item.salePrice
            ? item.salePrice - (item.salePrice * discount) / 100
            : item.price - (item.price * discount) / 100;

          return {
            price_data: {
              currency: currency.toLowerCase(),
              product_data: { name: item.name },
              unit_amount: Math.round(price * exchangeRate),
            },
            quantity: product.quantity,
          };
        })
      );

      const metadataProducts = products.map((p) => ({
        id: p.uuid,
        quantity: p.quantity,
        price: Math.round((p.salePrice ?? p.price) * exchangeRate),
      }));

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        success_url: `${process.env.SHOP_URL}/order?state=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.SHOP_URL}/order?state=error&session_id={CHECKOUT_SESSION_ID}`,
        line_items: lineItems,
        metadata: {
          user: user,
          products: JSON.stringify(metadataProducts),
        },
      });

      return { stripeSession: session };
    } catch (err) {
      console.error(err);
      ctx.response.status = 500;
      return err;
    }
  },
}));
