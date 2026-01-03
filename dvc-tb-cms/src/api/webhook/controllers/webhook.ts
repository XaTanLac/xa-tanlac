/**
 * A set of functions called "actions" for `webhook`
 */

export default {
    webhookAction: async (ctx, next) => {
        try {
            ctx.body = "ok";
        } catch (err) {
            ctx.body = err;
        }
    },
};
