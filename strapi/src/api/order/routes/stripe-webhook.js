module.exports = {
  routes: [
    {
      method: "POST",
      path: "/stripe/webhook",
      handler: "stripe-webhook.handleWebhook",
      config: {
        auth: false,
        middlewares: [
          async (ctx, next) => {
            const chunks = [];
            for await (const chunk of ctx.req) {
              chunks.push(chunk);
            }
            ctx.request.rawBody = Buffer.concat(chunks);
            await next();
          },
        ],
        body: { type: "raw" },
      },
    },
  ],
};
