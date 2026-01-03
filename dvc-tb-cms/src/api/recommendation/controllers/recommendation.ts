import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::recommendation.recommendation', ({ strapi }) => ({
  /**
   * Override the create method
   * Automatically generates the "code" field value with format PAKN-<day>-<month>-<year>-<id>.
   */
  async create(ctx) {
		try {
			const { data } = ctx.request.body;

			const now = new Date();
			const day = String(now.getDate()).padStart(2, '0');
			const month = String(now.getMonth() + 1).padStart(2, '0');
			const year = now.getFullYear();

			data.code = `PAKN-${day}-${month}-${year}-tmp`;

			const newRecommendation = await super.create(ctx);

			const id = newRecommendation.data.id;

			const code = `PAKN-${day}-${month}-${year}-${id}`;
      
      // const uploadService = strapi.plugins.upload.services.upload;
      // const file_data = await uploadService.findMany({
      //   filters: {
      //     id: {
      //       $in: uploads
      //     }
      //   }
      // })

      // await Promise.all(file_data.map(file => strapi.db.query("plugin::upload.file").update({ where: { id: file.id }, data: {
      //   related: [...(file_data.related || []), {
      //     id: updatedRecommendation.id,
      //   __type: 'api::recommendation.recommendation',
      //   __pivot: { field: 'file' },
      //   }]
      // }})))

			const updatedRecommendation = await strapi.entityService.update('api::recommendation.recommendation', id, {
				data: { code },
			});

			return ctx.send({ data: updatedRecommendation }, 200);
		} catch (error) {
			strapi.log.error(error);
			return ctx.internalServerError('An error occurred while creating the recommendation');
		}
	},


	async find(ctx) {
    const { code, phone } = ctx.query;

    let filters = {
			code: null,
			phone: null
		};
    if (code) {
      filters.code = { $contains: code };
    }
    if (phone) {
      filters.phone = { $contains: phone };
    }

    try {
      const recommendations = await strapi.entityService.findMany('api::recommendation.recommendation', ctx.query);

      return ctx.send({ data: recommendations }, 200);
    } catch (error) {
      strapi.log.error(error);
      return ctx.internalServerError('An error occurred while fetching recommendations');
    }
  },
}));
