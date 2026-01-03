export default {
    routes: [
        {
            method: "GET",
            path: "/news",
            handler: "news.getNews",
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
