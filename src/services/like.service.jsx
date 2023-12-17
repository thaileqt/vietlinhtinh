import request_utils from "../commons/request_utils";


const API_URL = request_utils.host + "/api/likes";


const LikeService = {
    isChapterLiked: (chapterId) => request_utils.handleGetRequest(API_URL + "/is-chapter-liked/" + chapterId, request_utils.header_config() ),
    likeChapter: (chapterId) => request_utils.handlePostRequest(API_URL + "/like-chapter/" + chapterId),
    unlikeChapter: (chapterId) => request_utils.handleDeleteRequest(API_URL + "/unlike-chapter/" + chapterId),

}  

export default LikeService;