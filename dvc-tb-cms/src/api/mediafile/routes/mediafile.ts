export default {
  routes: [
    {
      method: 'POST',
      path: '/mediafiles',
      handler: 'mediafile.upload',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
