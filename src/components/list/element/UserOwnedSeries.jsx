import { Divider, Grid, ListItem, Rating, Stack, Typography } from "@mui/material";
import SeriesThumbnail from "../../avatar/SeriesThumbnail";
import { Link } from "react-router-dom";
import Genre from "../../misc/Genre";
import CustomButton from "../../button/CustomButton";
import { AddOutlined, EditOutlined, FavoriteOutlined, LibraryBooksOutlined, RateReviewOutlined, ReviewsOutlined, VisibilityOutlined } from "@mui/icons-material";
import paths from "../../../commons/paths";
import PropTypes from "prop-types";
import SeriesService from "../../../services/series.service";

UserOwnedSeries.propTypes = {
    series: PropTypes.object.isRequired,
};

const renderDescription = (description, MAX_LENGTH=500) => {
  if (description && description.length > MAX_LENGTH) {
    return description.substring(0, MAX_LENGTH) + '...';
  }
  return description;
};

export default function UserOwnedSeries({ series }) {
  const handleDeleteSeries = () => {
    // ask for confirmation
    if (!window.confirm("Bạn có chắc chắn muốn xóa bộ truyện này?")) {
      
      return;
    }
    SeriesService.deleteSeries(series.id)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
    <p onClick={handleDeleteSeries} style={{ // place at the top right corner
      position: 'absolute',
      right: '0px',
      color: '#ff3d47', 
      textDecoration: 'underline',
      fontSize: "0.8rem",
      paddingRight: '10px', 
      }}>Delete</p>
    <Stack direction="column" marginTop="30px">
         
        <Grid container>
              <Stack direction="row">
                  <Stack direction="column" alignItems="center" paddingLeft="10px">
                    {/* Thumbnail */}
                    <SeriesThumbnail src={series.cover} borderRadius={3} size={0.9} 
                      handleImageClick={() => window.location.href = paths.series(series.slug)} />
                    {/* Rating */}
                    <Rating name="read-only" value={series.averageRating ? series.averageRating : 0} readOnly precision={0.5} />
                    <div><RateReviewOutlined fontSize="small" /> {series.totalReviews}</div>
                  </Stack>
                  

                  <Stack direction="column">
                    <Typography variant="h5"
                    onClick={() => window.location.href = paths.series(series.slug)}
                    // add hover will change color
                    sx={{ 
                      '&:hover': {

                      cursor: 'pointer', 
                        color: '#ff3d47',
                      },
                  }}
                    >{series.title}</Typography>
                    {/* View, Like, Chapter  */}
                    <Typography variant="body2" color="textSecondary">
                      <Stack direction="row" spacing={2}>
                      <VisibilityOutlined fontSize="small"/> {series.totalViews} Views <FavoriteOutlined fontSize="small" />{series.totalLikes} Favorites <LibraryBooksOutlined/> {series.totalChapters} Chapters
                      </Stack>
                    </Typography>
                    {/* Genre  */}
                    <Typography variant="body2" color="textSecondary">
                      {series.genres && series.genres.map((element) => (
                          <span key={element ? element.name : "z"}>
                          <Genre name={element ? element.name : "Unknown"} color="black" />
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
        <Grid container justifyContent="flex-end">
          <CustomButton name="Chương" icon={<AddOutlined />} color="transparent" onClick={() => window.location.href = paths.compose.addChapter(series.slug)} />
          <CustomButton name="Sửa" icon={<EditOutlined />} color="transparent" onClick={() => window.location.href = paths.compose.editSeries(series.slug)} />
        </Grid>
        
    </Stack>
    
    </>
  );
}
