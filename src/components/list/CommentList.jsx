import { List } from "@mui/material"
import Comment from "../form/Comment";
import { PropTypes } from "prop-types";



export default function CommentList({comments}) {
  CommentList.propTypes = {
    comments: PropTypes.array.isRequired
  }
  return (
    <div>
    {comments ? (
        <List>
        {comments.map((comment) => (
          <Comment key={comment.id} data={comment} />
        ))}
      </List>
    ) : (<></>)}
    </div>
  )
}