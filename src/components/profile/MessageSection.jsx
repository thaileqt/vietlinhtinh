import React, { useState } from "react";
import {
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import defaultAvatar from "../../assets/default_avatar.jpg";
import utils from "../../commons/utils";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import UserService from "../../services/user.service";
import Role from "../misc/Role";

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
    <div className="reply-messages" style={{paddingTop: "15px"}}>
      {replyMessages.map((message, index) => (
        <Stack key={index} direction="column" style={{ marginBottom: "10px" }}>
        
          <Stack direction="row" spacing={2} >
            {/* Avatar */}
            <Avatar
              src={message.sender.avatar || defaultAvatar}
              alt={message.sender.username}
              style={{ border: "1px solid #ccc", width: "50px", height: "50px" }}
            />
            <Stack direction="column" width="100%">
            {/* Information */}
            <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", flex: 1 }}>
              <Stack direction="column" width="100%">
                {/* Title, Role, Time */}
                <Stack direction="row" width="100%" alignItems="center" justifyContent="space-between" mb={1}>
                  <Typography variant="subtitle1" component="h6">
                    {message.sender.username} {message.sender.roles.map((role, index) => (
                      <Role name={role.name} key={index} />
                    ))}
                  </Typography>
                  <Typography variant="subtitle2" component="p">
                    {utils.timeSince(message.createdAt)}
                  </Typography>
                </Stack>
                {/* Content */}
                <Typography variant="body1" component="p">
                  {message.content}
                </Typography>
              </Stack>
            </div>
            </Stack>
            {/* Reply */}
            
          </Stack>
        
        
      </Stack>
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
      <hr />
      <div className="tab-messages">
        {messages &&
          messages.map((message, index) => (
        
            <Stack key={index} direction="column">
              {/* <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}> */}
                <Stack direction="row" spacing={2} padding="15px">
                  {/* Avatar */}
                  <Avatar
                    src={message.sender.avatar || defaultAvatar}
                    alt={message.sender.username}
                    style={{ border: "1px solid #ccc", width: "50px", height: "50px" }}
                  />
                  <Stack direction="column" width="100%">
                  {/* Information */}
                  <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", flex: 1 }}>
                    <Stack direction="column" width="100%">
                      {/* Title, Role, Time */}
                      <Stack direction="row" width="100%" alignItems="center" justifyContent="space-between" mb={1}>
                        <Typography variant="subtitle1" component="h6">
                          {message.sender.username} {message.sender.roles.map((role, index) => (
                            <Role name={role.name} key={index} />
                          ))}
                        </Typography>
                        <Typography variant="subtitle2" component="p">
                          {utils.timeSince(message.createdAt)}
                        </Typography>
                      </Stack>
                      {/* Content */}
                      <Typography variant="body1" component="p">
                        {message.content}
                      </Typography>
                    </Stack>
                  </div>
                  <span>Reply</span>
                  {message.replyMessages && renderReplyMessages(message.replyMessages)}
                  </Stack>
                  {/* Reply */}
                  
                </Stack>
              {/* </div> */}
              
            </Stack>
          ))}
      </div>
    </section>
  );
};

export default MessageSection;
