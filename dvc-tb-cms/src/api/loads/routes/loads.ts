export default {
  routes: [
    {
      method: "GET",
      path: "/loads",
      handler: "loads.list",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
}
