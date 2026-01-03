import { PUBLIC_ROUTES } from "../constants/public-route"

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    if (PUBLIC_ROUTES.includes(ctx.request.url)) {
      ctx.request.header.authorization = `Bearer ${process.env.CMS_API_TOKEN}`
    }

    await next()
  }
}
