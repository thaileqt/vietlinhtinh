import request_utils from "../commons/request_utils";


const API_URL = request_utils.host + "/api/chapters";


const ChapterService = {
    getChapterBySeriesSlugAndChapterNumber: (seriesSlug, chapterNumber) => request_utils.handleGetRequest(API_URL + "/get-by-series-and-chapter/" + seriesSlug + "/" + chapterNumber),
    getChaptersBySeriesSlug: (slug, page, size) => request_utils.handleGetRequest(API_URL + "/get-by-series-slug/" + slug + "?page=" + page + "&size=" + size),
    getAllChaptersBySeriesIdForNavigation: (seriesId) => request_utils.handleGetRequest(API_URL + "/get-all-by-series-id-for-navigation/" + seriesId),
    countTotalChapters: (slug) => request_utils.handleGetRequest(API_URL + "/count-by-series-slug/" + slug),

    addChapter: (newChapter) => request_utils.handlePostRequest(API_URL + "/create", newChapter),
    editChapter: (seriesSlug, chapterNumber, newChapterData) => request_utils.handlePutRequest(API_URL + "/update-by-series-and-chapter/" + seriesSlug + "/" + chapterNumber, newChapterData),
    deleteChapter: (id) => request_utils.handleDeleteRequest(API_URL + "/delete-by-id/" + id),
}  

export default ChapterService;