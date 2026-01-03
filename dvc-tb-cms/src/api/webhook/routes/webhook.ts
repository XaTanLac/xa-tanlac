export default {
    routes: [
        {
            method: "POST",
            path: "/webhook",
            handler: "webhook.webhookAction",
            config: {
                auth: false,
                policies: [],
                middlewares: [],
            },
        },
    ],
};
