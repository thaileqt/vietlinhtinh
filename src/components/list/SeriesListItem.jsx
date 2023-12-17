import React from "react";
import { Avatar, Typography, ListItem, ListItemText, Box, Divider, Grid } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import default_cover from "../../assets/default_cover.jpeg";

const SeriesListItem = ({ series }) => {
  const rating = 4.5;
  return (
    <div>
      <ListItem alignItems="flex-start">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Avatar alt="Series Avatar" src={series.cover ? series.cover : default_cover} />
            <ListItemText primary={series.title} secondary={<React.Fragment>
              {/* Left Column Content */}
              <StarIcon style={{ color: "#ffd700" }} />
              4.5
            </React.Fragment>} />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              {/* Right Column Content */}
              <Box display="flex" alignItems="center">
                <ListItemText primary={series.title} />
                <Typography variant="body2" color="textSecondary">
                  {rating}
                </Typography>
              </Box>
              <Typography variant="caption" color="textSecondary">
                {series.totalView} views | {series.totalLike} likes | {series.totalChapter} chapters
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {series.genres.map((genre) => genre.name).join(", ")}
              </Typography>
              <Typography variant="body2">{series.description}</Typography>
            </Box>
          </Grid>
        </Grid>
      </ListItem>
      <Divider variant="inset" component="li" />
      
    </div>
  );
};

export default SeriesListItem;
