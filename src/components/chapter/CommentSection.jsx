import { useState } from "react";
import CommentForm from "../form/CommentForm";
import CommentList from "../list/CommentList";

import CommentService from "../../services/comment.service";

export default function CommentSection({ comments, chapterId }) {
    console.log(comments, chapterId);
    const [commentText, setCommentText] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        // Your logic to handle the comment submission
        // You can use the chapterId to associate the comment with a specific chapter
        CommentService.createComment({
            content: commentText,
            chapterId: chapterId,
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error('Error creating comment:', error);
        });
    
      };
  
    
    return (
        <div>
            
        <h2>Comments</h2>
        <CommentList comments={comments} />
        <CommentForm
            commentText={commentText}
            setCommentText={setCommentText}
            handleSubmit={handleSubmit}
        />
        
        </div>
    );
}
