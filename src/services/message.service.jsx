import request_utils from "../commons/request_utils";


const API = request_utils.host + "/api/messages";


const MessageService = {
    getMessages: (username) => request_utils.handleGetRequest(API + "/" + username),
    postMessage: (messageDTO) => request_utils.handlePostRequest(API + "/create-message", messageDTO),
    postReplyMessage: (replyMessageDTO) => request_utils.handlePostRequest(API + "/create-reply-message", replyMessageDTO),
    deleteMessage: (messageId) => request_utils.handleDeleteRequest(API + "/delete-message/" + messageId),
    deleteReplyMessage: (replyMessageId) => request_utils.handleDeleteRequest(API + "/delete-reply-message/" + replyMessageId),
}  

export default MessageService;