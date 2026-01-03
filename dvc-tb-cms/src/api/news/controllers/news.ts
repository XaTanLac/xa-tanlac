import cache from "../../../../config/cache";
import NewsService from "../services/news";
import { parseNewsData } from "../helper/handler";

export default {
  getNews: async (ctx, next) => {
      try {
          const { pageNo = "1", ...otherParams } = ctx.request.query;

          const cacheKey = `news_${pageNo}_${JSON.stringify(otherParams)}`;
          const cachedNews = cache.get(cacheKey);

          if (cachedNews) {
              ctx.body = {
                  status: "success",
                  page: pageNo,
                  data: cachedNews,
              };
              return;
          }

          const newsService = NewsService();
          const newsData = await newsService.getNews({ pageNo, ...otherParams });
          const result = parseNewsData(newsData);

          cache.set(cacheKey, result, 60 * 30);

          ctx.body = {
              status: "success",
              page: pageNo,
              data: result,
          };
      } catch (err) {
          console.error("Error fetching news:", err);

          ctx.body = {
              status: "error",
              message: "An error occurred",
              details: err.message,
          };
      }
  },
};
