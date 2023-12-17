import request_utils from "../commons/request_utils";

const API_URL = request_utils.host + "/api";



const UserService = {
  getProfile: (id) => request_utils.handleGetRequest(API_URL + `/user/${id}`, request_utils.header_config()),
  getGenres: () => request_utils.handleGetRequest(`${API_URL}/genres`),
  getUser: (username) => request_utils.handleGetRequest(API_URL + "/user/get-by-username/" + username),
}

export default UserService;
