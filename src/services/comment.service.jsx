import request_utils from "../commons/request_utils";

const API_URL = request_utils + "/api/comment";



const CommentService = {
  createComment: (commentDTO) => request_utils.handlePostRequest(API_URL + "/create", commentDTO),
  deleteComment: (id) => request_utils.handleDeleteRequest(API_URL + "/delete-by-id/" + id),
}

export default CommentService;
