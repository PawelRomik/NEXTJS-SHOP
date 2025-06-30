// @ts-ignore
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

("use strict");

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    // @ts-ignore
    const { products, currency, exchangeRate, discount, locale, user } =
      ctx.request.body;
    try {
      const lineItems = await Promise.all(
        products.map(async (product) => {
          const items = await strapi.entityService.findMany(
            "api::product.product",
            {
              filters: { uuid: product.id },
              locale: locale,
            }
          );
          const item = items[0] || null;
          const price = item.salePrice
            ? item.salePrice - (item.salePrice * discount) / 100
            : item.price - (item.price * discount) / 100;
          return {
            price_data: {
              currency: currency.toLowerCase(),
              product_data: {
                name: item.name,
              },
              unit_amount: parseFloat((price * exchangeRate).toFixed(2)),
            },
            quantity: product.quantity,
          };
        })
      );
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        success_url: `${process.env.SHOP_URL}/order?state=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.SHOP_URL}/order?state=error&session_id={CHECKOUT_SESSION_ID}`,
        line_items: lineItems,
      });

      const transformedProducts = products.map((product) => ({
        id: product.id,
        price: product.price - (product.price * discount) / 100,
        quantity: product.quantity,
      }));

      await strapi.service("api::order.order").create({
        data: {
          products: transformedProducts,
          stripeId: session.id,
          user: user,
        },
      });
      return { stripeSession: await session };
    } catch (err) {
      console.log(err);
      ctx.response.status = 500;
      return err;
    }
  },
}));
