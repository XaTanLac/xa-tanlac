export default ({ env }) => [
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            env("CUSTOM_DOMAIN")
              ? env("CUSTOM_DOMAIN").replace(/^https?:\/\//, "")
              : "",
            env("AWS_ENDPOINT")
              ? env("AWS_ENDPOINT").replace(/^https?:\/\//, "")
              : "",
          ].filter(Boolean),
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            env("CUSTOM_DOMAIN")
              ? env("CUSTOM_DOMAIN").replace(/^https?:\/\//, "")
              : "",
            env("AWS_ENDPOINT")
              ? env("AWS_ENDPOINT").replace(/^https?:\/\//, "")
              : "",
          ].filter(Boolean),
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "global::pre-check-token",
  "strapi::favicon",
  "strapi::public",
];
