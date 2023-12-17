import React, { useState } from "react";
import {
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import defaultAvatar from "../../assets/default_avatar.jpg";
import utils from "../../commons/utils";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import UserService from "../../services/user.service";

const MessageSection = ({ messages, profile_username }) => {
  const [replyingTo, setReplyingTo] = useState(null);

  const handleReplyClick = (messageId) => {
    setReplyingTo(messageId);
  };

  const handleReplySubmit = () => {
    UserService.postReplyMessage({
      content: document.getElementById("replyContent").value,
      messageId: replyingTo
    }).then(
      (response) => {
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    )
  };

  const renderReplyMessages = (replyMessages) => (
    <div className="reply-messages">
      {replyMessages.map((reply, replyIndex) => (
        <div className="reply-message" key={replyIndex} style={{ marginLeft: "20px" }}>
          <div className="reply-header" style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
            <Avatar
              className="reply-avatar"
              src={reply.sender.avatar || defaultAvatar}
              alt={reply.sender.username}
            />
            <div style={{ marginLeft: "10px" }}>
              <Typography variant="subtitle1" component="h6">
                {reply.sender.username} - {utils.timeSince(reply.createdAt)}
              </Typography>
              <Typography variant="subtitle2" component="p">
                {reply.role}
              </Typography>
            </div>
          </div>
          <div className="reply-content">
            <Typography variant="body2" component="p">
              {reply.content}
            </Typography>
          </div>
        </div>
      ))}
    </div>
  );

  const handleMessageSubmit = () => {
    UserService.postMessage({
      content: document.getElementById("messages").value,
      receiver: {
        username: profile_username
      }
    }).then(
      (response) => {
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  return (
    <section className="tab-messages">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="messages"
            placeholder="Write something..."
            variant="outlined"
            multiline
            rows={3}
          />
        </Grid>
        <Grid item xs={9}></Grid>
        <Grid item xs={3} style={{ textAlign: "right" }}>
          <Button variant="contained" color="primary" onClick={handleMessageSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>

      <div className="tab-messages">
        {messages &&
          messages.map((message, index) => (
            <div className="message-container" key={index}>
              <div className="message-and-replies" style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
                <div className="message" style={{ marginBottom: "10px" }}>
                  <div className="message-row1" style={{ display: "flex", marginBottom: "5px" }}>
                    <div className="message-avatar">
                      <Avatar
                        src={message.sender.avatar || defaultAvatar}
                        alt={message.sender.username}
                      />
                    </div>
                    <div style={{ marginLeft: "10px" }}>
                      <Typography variant="subtitle1" component="h6">
                        {message.sender.username} - {message.sender.roles.map((role, index) => (
                          <span key={index}>{role.name}</span>
                        ))}
                      </Typography>
                      <Typography variant="subtitle2" component="p">
                        {utils.timeSince(message.createdAt)}
                      </Typography>
                    </div>
                    <div>
                      <IconButton edge="end" aria-label="reply" onClick={() => handleReplyClick(message.id)}>
                        <ArrowForwardIcon />
                      </IconButton>
                    </div>
                  </div>
                  <div className="message-row2">
                    <Typography variant="body1" component="p">
                      {message.content}
                    </Typography>
                  </div>
                </div>
                {replyingTo === message.id && (
                  <div className="reply-form" style={{ marginTop: "10px" }}>
                    {/* Add your reply form here */}
                    <TextField fullWidth id="replyContent" placeholder="Your reply..." variant="outlined" multiline rows={2} />
                    <Button variant="contained" color="primary" onClick={handleReplySubmit}>
                      Send
                    </Button>
                  </div>
                )}
                {message.replyMessages && renderReplyMessages(message.replyMessages)}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default MessageSection;
