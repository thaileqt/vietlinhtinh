import { List, Avatar, ListItem, ListItemText, Divider } from "@mui/material"
import default_avatar from "../../assets/default_avatar.jpg";
import { PropTypes } from "prop-types";


export default function CommentList({comments}) {
  CommentList.propTypes = {
    comments: PropTypes.array.isRequired
  }
  return (
    <>
    {comments ? (
        <List>
        {comments.map((comment) => (
          <div key={comment.id}>
            <ListItem>
                <Avatar alt={comment.userDTO.username} src={comment.userDTO.cover ? comment.userDTO.cover : default_avatar} />
                <ListItemText primary={comment.userDTO.username} />
                <ListItemText primary={comment.content} />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    ) : (<></>)}
    </>
  )
}