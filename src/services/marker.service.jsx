import request_utils from "../commons/request_utils";

const API_URL = request_utils.host + "/api/markers";



const MarkerService = {
  getMarkerInThisChapter: (chapterId) => request_utils.handleGetRequest(API_URL + "/get-by-chapter/" + chapterId, request_utils.header_config()),
  createMarker: (markerDTO) => request_utils.handlePostRequest(API_URL + "/markers/create", markerDTO),
  deleteMarker: (markerId) => request_utils.handleDeleteRequest(API_URL + "/delete-by-id/" + markerId),
}

export default MarkerService;
