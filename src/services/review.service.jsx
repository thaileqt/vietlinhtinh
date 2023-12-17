import request_utils from "../commons/request_utils";

const API_URL = request_utils.host + "/api/reviews";



const ReviewService = {
  sendReview: (reviewDTO) => request_utils.handlePostRequest(API_URL + "/create", reviewDTO),
}

export default ReviewService;
