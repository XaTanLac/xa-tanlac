import { JSDOM } from "jsdom";
import { NewsArticle } from "./interface";
import { env } from "../../../../config/config";

const parseNewsData = (html: string): NewsArticle[] => {
    const baseURL = env("NEWS_BASE_URL_DRAWL");

    const dom = new JSDOM(html);
    const document = dom.window.document;
    const articles = document.querySelectorAll("article.item-block");
    const newsArticles: NewsArticle[] = [];

    articles.forEach((article) => {
        const image =
            baseURL +
                article.querySelector("img.post-image")?.getAttribute("src") ||
            "";
        const title =
            article.querySelector("h4.entry-title a")?.textContent?.trim() ||
            "";
        const description =
            article.querySelector(".post-content")?.textContent?.trim() || "";
        const link =
            baseURL +
                article.querySelector("a.post-more")?.getAttribute("href") ||
            "";

        newsArticles.push({ image, title, description, link });
    });

    return newsArticles;
};

export { parseNewsData };
