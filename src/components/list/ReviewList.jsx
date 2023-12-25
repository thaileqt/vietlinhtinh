import { List, ListItem, ListItemAvatar, ListItemText, Typography, Rating, Avatar, Divider, ListItemSecondaryAction, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import utils from "../../commons/utils";
import { PropTypes } from "prop-types";

const reviewContainerStyle = {
    border: '1px solid #e0e0e0',
    borderRadius: 4,
    padding: 16,
  };
  
const commentStyle = {
  color: '#333',
};



export default function ReviewList({ reviews }) {
  ReviewList.propTypes = {
    reviews: PropTypes.array,
  };
    return (
        <div>
        {(reviews && reviews.length > 0) ? (
            reviews.map((review) => (
              <div key={review.id}>
                <List>
                    <ListItem style={reviewContainerStyle}>
                        <ListItemAvatar>
                        <Avatar alt={review.user.username ? review.user.username : " "} src={review.user.cover} />
                        </ListItemAvatar>
                        <ListItemText
                        primary={
                            <>
                            <strong>{review.user.username}</strong>            
                            <Rating name="read-only" value={review.rating} readOnly />
                            </>
                            
                        }
                        secondary={
                            <Typography variant="body1" style={commentStyle}>
                                {review.content}
                            </Typography>
                        }
                        />
                        <ListItemSecondaryAction>
                        <ListItemText>
                            <Typography variant="caption" color="textSecondary" style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            whiteSpace: 'nowrap',
                            }}>
                            {utils.timeSince(review.createdAt)}
                            </Typography>
                        </ListItemText>
                        
                        <IconButton // i want the icon to be in the right bottom corner of the list item
                            edge="end" 
                            aria-label="like"
                            style={{
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            }}>
                            <FavoriteIcon />
                        </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                    </List>
              </div>
            ))
          ) : (
            <>Chưa có nhận xét</>
          )}
        </div>
    )
}