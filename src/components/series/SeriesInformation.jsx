// SeriesInformation.js
import { Link } from "react-router-dom";
import { Typography, Grid, ListItemAvatar, Rating, Stack } from "@mui/material";
import GenreIcon from '@mui/icons-material/Category';
import ChapterIcon from '@mui/icons-material/LibraryBooks';
import StatusIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SeriesThumbnail from "../avatar/SeriesThumbnail";
import Genre from "../misc/Genre";
import { PropTypes } from "prop-types";
import { Favorite, FavoriteBorder, FavoriteSharp } from "@mui/icons-material";



export default function SeriesInformation({ series }) {
  SeriesInformation.propTypes = {
    series: PropTypes.object.isRequired,
  };
  return (
    <div className="row">
      {series && (
        <Grid container alignItems="flex-start">
          <Stack direction="row">
            <ListItemAvatar sx={{marginRight: "20px"}}>
              <SeriesThumbnail src={series.cover} size={2} shadow={true} />
            </ListItemAvatar>

              <Grid>
                <Typography variant="h4"><p>{series.title}</p></Typography>
                <Rating name="read-only" value={series.averageRating ? series.averageRating : 0} readOnly />
                <p>
                  {series.genres.map((genre) => (
                    <Link to="#" key={genre.id}>
                      <Genre name={genre.name} color="white" backgroundColor="rgb(62, 82, 122)" />
                    </Link>
                  ))}
                </p>
                <Grid container spacing={3} alignItems="center">
                  <Grid item>
                    <VisibilityIcon fontSize="small" />
                    <Typography variant="body1" component="span" ml={1}>
                      {series.totalViews}
                    </Typography>
                  </Grid>

                  <Grid item>
                  <Favorite fontSize="small" />
                    <Typography variant="body1" component="span" ml={1}>{series.totalLikes}</Typography>
                  </Grid>
                  
                  <Grid item>
                    <ChapterIcon fontSize="small" />
                    <Typography variant="body1" component="span" ml={1}>
                      {series.totalChapters}
                    </Typography>
                  </Grid>
                </Grid>
                <p>
                  <StatusIcon fontSize="small" />
                  <Typography variant="body1" component="span" ml={1}>
                  {series.seriesState.name === "ONGOING"
                    ? "Đang tiến hành"
                    : "Kết thúc"}
                    </Typography>
                  
                </p> 
              </Grid>
            {/* </div> */}
            </Stack>
          </Grid>
        
      )}
      
    </div>
  );
}
