import { useState } from "react";
import CommentForm from "../form/CommentForm";
import CommentList from "../list/CommentList";

import CommentService from "../../services/comment.service";
import PropTypes from "prop-types";
import AuthService from "../../services/auth.service";

CommentSection.propTypes = {
    comments: PropTypes.array.isRequired,
    chapterId: PropTypes.string.isRequired,
};


export default function CommentSection({ comments, chapterId }) {
    console.log(comments, chapterId);
    const [commentText, setCommentText] = useState("");

    // check if user logged in
    const currentUser = AuthService.getCurrentUser();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Your logic to handle the comment submission
        // You can use the chapterId to associate the comment with a specific chapter
        CommentService.createComment({
            content: commentText,
            chapterId: chapterId,
        })
        .then((response) => {
            // append to head of comments array
            comments.unshift(response.data);
            setCommentText("");
        })
        .catch((error) => {
            console.error('Error creating comment:', error);
        });
    
      };
  
    
    return (
        <div className="container" style={{
            marginTop: "20px",
            marginBottom: "20px",
            border: "1px solid #ccc",
            padding: "20px",
        }}>
            
            <h2>Bình luận</h2>
            {currentUser ? (
                <CommentForm
                commentText={commentText}
                setCommentText={setCommentText}
                handleSubmit={handleSubmit}
            />
            ) : (
                <p>Đăng nhập để bình luận</p>
            )}
            
            
            <CommentList comments={comments} />
        
        </div>
    );
}
