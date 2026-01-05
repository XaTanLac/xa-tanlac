export default ({ env }) => ({
  sentry: {
    enabled: true,
    config: {
      dsn: env("SENTRY_DSN"),
      sendMetadata: true,
    },
  },
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        accessKeyId: env("AWS_ACCESS_KEY_ID"),
        secretAccessKey: env("AWS_ACCESS_SECRET"),
        region: "auto",
        baseUrl: env("CUSTOM_DOMAIN"),
        rootPath: "strapiMedia",
        s3Options: {
          endpoint: env("AWS_ENDPOINT"),
          credentials: {
            accessKeyId: env("AWS_ACCESS_KEY_ID"),
            secretAccessKey: env("AWS_ACCESS_SECRET"),
          },
          forcePathStyle: true,
          params: {
            Bucket: env("AWS_BUCKET"),
            CacheControl: "max-age=31536000",
          },
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});
