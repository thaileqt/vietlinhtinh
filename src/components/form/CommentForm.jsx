import { TextField, Button } from "@mui/material"


export default function CommentForm({ commentText, setCommentText, handleSubmit}) {
  return (
    <form onSubmit={handleSubmit}>
          <TextField
            label="Your Comment"
            variant="outlined"
            margin="normal"
            fullWidth
            multiline
            rows={3}
            // Add state to handle the comment text
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
          />
          <Button variant="contained" color="primary" type="submit" onSubmit={handleSubmit}>
            Add Comment
          </Button>
        </form>
      )
}