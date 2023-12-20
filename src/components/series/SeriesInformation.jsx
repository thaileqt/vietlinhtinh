// SeriesInformation.js
import { Link } from "react-router-dom";
import { Typography, Grid, ListItemAvatar } from "@mui/material";
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
          <ListItemAvatar sx={{marginRight: "20px"}}>
            <SeriesThumbnail src={series.cover} size={2} shadow={true} />
          </ListItemAvatar>

            <Grid>
              <p><Typography variant="h4">{series.title}</Typography></p>
              <p>
                {series.genres.map((element) => (
                  <Link to="#" key={element}>
                    <Genre name={element} color="white" backgroundColor="rgb(62, 82, 122)" />
                  </Link>
                ))}
              </p>
              <Grid container spacing={3} alignItems="center">
                <Grid item>
                  <VisibilityIcon fontSize="small" />
                  <Typography variant="body1" component="span" ml={1}>
                    {series.totalView}
                  </Typography>
                </Grid>

                <Grid item>
                <Favorite fontSize="small" />
                  <Typography variant="body1" component="span" ml={1}>{series.totalLike}</Typography>
                </Grid>
                
                <Grid item>
                  <ChapterIcon fontSize="small" />
                  <Typography variant="body1" component="span" ml={1}>
                    {series.totalChapter}
                  </Typography>
                </Grid>
              </Grid>
              <p>
                <StatusIcon fontSize="small" />
                <Typography variant="body1" component="span" ml={1}>
                {series.seriesState === "ONGOING"
                  ? "Đang tiến hành"
                  : "Kết thúc"}
                  </Typography>
                
              </p> 
            </Grid>
          {/* </div> */}
        </Grid>
      )}
      
    </div>
  );
}
