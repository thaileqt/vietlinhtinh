import { Divider, Grid, ListItem, Rating, Stack, Typography } from "@mui/material";
import SeriesThumbnail from "../../avatar/SeriesThumbnail";
import { Link } from "react-router-dom";
import Genre from "../../misc/Genre";
import CustomButton from "../../button/CustomButton";
import { AddOutlined, EditOutlined, FavoriteOutlined, LibraryBooksOutlined, VisibilityOutlined } from "@mui/icons-material";
import paths from "../../../commons/paths";
import PropTypes from "prop-types";

UserOwnedSeries.propTypes = {
    series: PropTypes.object.isRequired,
};

const renderDescription = (description) => {
  if (description && description.length > 50) {
    return description.substring(0, 50) + '...';
  }
  return description;
};

export default function UserOwnedSeries({ series }) {
  return (
    <Stack direction="column">
        <Grid container spacing={2} xs={12}>

              <Stack direction="row">
                  
                  <Stack direction="column" spacing={0.3} alignItems="center">
                    {/* Thumbnail */}
                    <SeriesThumbnail src={series.cover} borderRadius={3} size={0.9} />
                    {/* Rating */}
                    <Rating name="read-only" value={3.5} readOnly />
                  </Stack>
                  

                  <Stack direction="column">
                    <Typography variant="subtitle1">{series.title}</Typography>
                    {/* View, Like, Chapter  */}
                    <Typography variant="body2" color="textSecondary">
                      <VisibilityOutlined fontSize="small"/> {series.totalView} <FavoriteOutlined fontSize="small" />{series.totalLike} <LibraryBooksOutlined/> {series.totalChapter}
                    </Typography>
                    {/* Genre  */}
                    <Typography variant="body2" color="textSecondary">
                      {series.genres && series.genres.map((element) => (
                          <span key={element ? element : "z"}>
                          <Genre name={element ? element : "Unknown"} />
                          </span>
                      ))}
                      </Typography>
                      {/* Description  */}
                      <Typography variant="body2" color="textSecondary">
                        {renderDescription(series.description)} 
                      </Typography>
                  </Stack>
              </Stack>

        </Grid>
        {/* Row 2 for buttons */}
        <Grid container justifyContent="flex-end" xs={12}>
          <CustomButton name="Chương" icon={<AddOutlined />} color="transparent" onClick={() => window.location.href = paths.compose.addChapter(series.slug)} />
          <CustomButton name="Sửa" icon={<EditOutlined />} color="transparent" onClick={() => window.location.href = paths.compose.editSeries(series.slug)} />
        </Grid>
        
    </Stack>
    
    
  );
}
