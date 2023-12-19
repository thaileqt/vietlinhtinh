import { TextField, Button } from "@mui/material"
import { PropTypes } from "prop-types";
import CustomButton from "../button/CustomButton";


export default function CommentForm({ commentText, setCommentText, handleSubmit}) {
    CommentForm.propTypes = {
        commentText: PropTypes.string,
        setCommentText: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
    }
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
        {/* <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
          Add Comment
        </Button> */}
        <CustomButton name="Send"  onClick={handleSubmit} />
      </form>
    )
}