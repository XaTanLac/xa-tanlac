import axios from 'axios';
import { env } from '../../../../config/config';

const NewsService = () => {
    const baseURL = env('NEWS_BASE_URL_DRAWL');

    const endpoint =
        "?module=Content.Listing&moduleId=22&cmd=redraw&site=80598&url_mode=rewrite&submitFormId=22&moduleId=22&page=Article.News.list&site=80598";

    const defaultData = {
        layout: "Article.List.list",
        itemsPerPage: "12",
        orderBy: "publishTime DESC",
        pageNo: "1",
        service: "Content.Article.selectAll",
        widgetCode: "Article",
        type: "Article.News",
        parentId: "5096395",
        detailLayout: "Article.Detail.default",
        categoryId: "5096395",
        inheritBlockParentId: "B5b16577a5aff31",
        imageSizeRatio: "16:9",
        page: "Article.News.list",
        modulePosition: "0",
        moduleParentId: "13",
        _t: Date.now(),
    };

    const getNews = async (customData = {}) => {
        try {
            const formData = new URLSearchParams(
                Object.entries({
                    ...defaultData,
                    ...customData,
                }).reduce((acc, [key, value]) => {
                    acc[key] = String(value);
                    return acc;
                }, {})
            );

            const axiosInstance = axios.create({
                httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }),
            });

            const response = await axiosInstance.post(`${baseURL}${endpoint}`, formData);

            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return response.data;
        } catch (error) {
            console.error("Error fetching news:", error);
            throw error;
        }
    };

    return {
        getNews,
    };
};

export default NewsService;
