import { Divider, Grid, ListItem, Rating, Stack, Typography } from "@mui/material";
import SeriesThumbnail from "../../avatar/SeriesThumbnail";
import { Link } from "react-router-dom";
import Genre from "../../misc/Genre";
import CustomButton from "../../button/CustomButton";
import { AddOutlined, EditOutlined, FavoriteOutlined, LibraryBooksOutlined, VisibilityOutlined } from "@mui/icons-material";
import paths from "../../../commons/paths";
import PropTypes from "prop-types";
import SeriesService from "../../../services/series.service";

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
    <Stack direction="column" marginTop="30px">
        <Grid container>
              <Stack direction="row">
                  <Stack direction="column" alignItems="center" paddingLeft="10px">
                    {/* Thumbnail */}
                    <SeriesThumbnail src={series.cover} borderRadius={3} size={0.9} 
                      handleImageClick={() => window.location.href = paths.series(series.slug)} />
                    {/* Rating */}
                    <Rating name="read-only" value={3.5} readOnly />
                  </Stack>
                  

                  <Stack direction="column">
                    <Typography variant="h6"
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
                      <VisibilityOutlined fontSize="small"/> {series.totalView} <FavoriteOutlined fontSize="small" />{series.totalLike} <LibraryBooksOutlined/> {series.totalChapter}
                    </Typography>
                    {/* Genre  */}
                    <Typography variant="body2" color="textSecondary">
                      {series.genres && series.genres.map((element) => (
                          <span key={element ? element : "z"}>
                          <Genre name={element ? element : "Unknown"} color="black" />
                          </span>
                      ))}
                      </Typography>
                      {/* Description  */}
                      <Typography variant="body2" color="textSecondary">
                        {renderDescription(series.description)} 
                      </Typography>
                  </Stack>
                  <a onClick={handleDeleteSeries} style={{ // place at the top right corner
                    position: 'absolute',
                    top: '0px',
                    right: '0px',
                    whiteSpace: 'nowrap',
                    color: '#ff3d47', 
                    textDecoration: 'underline',
                    padding: '10px', // add hover
                    '&:hover': {
                      cursor: 'pointer', 
                      color: '#ff3d47',
                    },
                    }}>Delete</a>
              </Stack>

        </Grid>
        {/* Row 2 for buttons */}
        <Grid container justifyContent="flex-end">
          <CustomButton name="Chương" icon={<AddOutlined />} color="transparent" onClick={() => window.location.href = paths.compose.addChapter(series.slug)} />
          <CustomButton name="Sửa" icon={<EditOutlined />} color="transparent" onClick={() => window.location.href = paths.compose.editSeries(series.slug)} />
        </Grid>
        
    </Stack>
    
    
  );
}
