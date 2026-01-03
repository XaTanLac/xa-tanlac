/**
 * A set of functions called "actions" for `loads`
 */
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3"

export default {
  async list(ctx) {
    try {
      const s3 = new S3Client({
        region: process.env.AWS_REGION || "auto",
        endpoint: process.env.AWS_ENDPOINT,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_ACCESS_SECRET,
        },
        forcePathStyle: true,
      })

      const command = new ListObjectsV2Command({
        Bucket: process.env.AWS_BUCKET,
      })

      const response = await s3.send(command)

      ctx.body = (response.Contents || [])
        .map((obj) => ({
          key: obj.Key,
          size: obj.Size,
          lastModified: obj.LastModified,
          url: `${process.env.CUSTOM_DOMAIN}/${obj.Key}`,
        }))
        .filter((obj) => obj.key.endsWith(".css") || obj.key.endsWith(".js"))
        .reduce(
          (acc, obj) => {
            if (obj.key.endsWith(".css")) acc.css.push(obj.url)
            else if (obj.key.endsWith(".js")) acc.js.push(obj.url)
            return acc
          },
          { css: [], js: [] }
        )
    } catch (err) {
      ctx.throw(500, err.message)
    }
  },
}
