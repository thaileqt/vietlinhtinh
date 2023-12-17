import request_utils from "../commons/request_utils";

const API_URL = request_utils.host + "/api/series";

const SeriesService = {
    getSeriesBySlug: (slug) => request_utils.handleGetRequest(API_URL + "/" + slug),
    getHotSeries: (seriesCount) => request_utils.handleGetRequest(API_URL + "/get-hot-series/" + seriesCount),
    getSeriesByGenre: (genre) => request_utils.handleGetRequest(API_URL + "/get-by-genre/" + genre),
    getTopRecentUpdatedSeries: (page) => request_utils.handleGetRequest(API_URL + "/get-recent-updated-series?page=" + page),
    searchSeries: (keyword) => request_utils.handleGetRequest(API_URL + "/search?keyword=" + keyword),
    getUserOwnedSeries: (username, page, size) => request_utils.handleGetRequest(API_URL + "/get-user-owned-series/" + username + "?page=" + page + "&&size=" + size),
    countUserOwnedSeries: (username) => request_utils.handleGetRequest(API_URL+ "/count-user-owned-series/" + username),

    addSeries: (newSeries) => request_utils.handlePostRequest(API_URL + "/create", newSeries),
    editSeries: (slug, newSeriesData) => request_utils.handlePostRequest(API_URL + "/update-by-slug/" + slug, newSeriesData),
    deleteSeries: (id) => request_utils.handleDeleteRequest(API_URL + "/delete-by-id/" + id),
    
}

export default SeriesService;