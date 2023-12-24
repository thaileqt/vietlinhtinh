import {
    Card,
    CardContent,
    Avatar,
    Typography,
    IconButton,
    Grid,
  } from '@mui/material';
  import ReplyIcon from '@mui/icons-material/Reply';
  import ThumbUpIcon from '@mui/icons-material/ThumbUp';
  import ThumbDownIcon from '@mui/icons-material/ThumbDown';
  import { PropTypes } from 'prop-types';
  import utils from '../../commons/utils';
  import default_avatar from '../../assets/default_avatar.jpg';
  

export default function Comment({  data }) {
    Comment.propTypes = {
        data: PropTypes.object.isRequired,
    };

    const reportTextStyles = {
        textAlign: 'right',
        flexGrow: 1,
        color: '#ff0000', // Change to your desired color
        textDecoration: 'underline',
        cursor: 'pointer', // Add cursor style for interaction
    };


    const cardStyles = {
        marginBottom: '16px',
        // no shadow
        boxShadow: 'none',
    };

    const avatarStyles = {
        backgroundColor: '#1976d2', // Change to your desired color
    };

    const contentStyles = {
        flexGrow: 1,
    };

    const borderStyles = {
        border: '1px solid #ccc', // Border style for the second row of the second column
        padding: '5px', // Optional: Add padding to improve appearance
    };

    return (
        <Card style={cardStyles} key={data.id}>
            <CardContent>
                <Grid container spacing={2}>
                {/* Left Column: Avatar */}
                <Grid item>
                    <Avatar style={avatarStyles} src={(data && data.user.cover) ? data.user.cover : "https://cdn.dribbble.com/users/1463082/screenshots/4325775/__________-1.png"} alt={data.user.username} variant='square' />
                </Grid>

                {/* Right Column: User Info and Content */}
                <Grid item xs={12} sm container>
                    <Grid item xs={12} sm container direction="column">
                    {/* User Info */}
                    <Grid style={borderStyles}>
                        <Grid item >
                        <Typography variant="subtitle1">{data.user.username}</Typography>
                        <Typography variant="caption" color="textSecondary">
                            {utils.formatDate(data.createdAt)}
                        </Typography>
                        </Grid>
                        {/* Content */}
                        <Grid item style={contentStyles}>
                        <Typography variant="body1">{data.content}</Typography>
                        </Grid>
                    </Grid>

                    {/* Actions */}
                    
                    <Grid item container justifyContent="space-between">
                        <Grid item>
                        <IconButton aria-label="reply">
                            <ReplyIcon />
                        </IconButton>
                        <IconButton aria-label="like">
                            <ThumbUpIcon />
                        </IconButton>
                        <IconButton aria-label="dislike">
                            <ThumbDownIcon />
                        </IconButton>
                        {/* Add other action icons as needed */}
                        </Grid>
                        <Grid item>
                        <Typography style={reportTextStyles} variant="body2">
                            Report
                        </Typography>
                        </Grid>
                    </Grid>
                    </Grid>
                </Grid>

                {/* Border for Second Row in Second Column */}
                
                </Grid>
            </CardContent>
        </Card>
    );
}