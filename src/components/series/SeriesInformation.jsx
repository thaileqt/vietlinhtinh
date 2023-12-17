// SeriesInformation.js
import { Link } from "react-router-dom";
import { Typography, Grid } from "@mui/material";
import GenreIcon from '@mui/icons-material/Category';
import ChapterIcon from '@mui/icons-material/LibraryBooks';
import StatusIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SeriesThumbnail from "../avatar/SeriesThumbnail";
import Genre from "../misc/Genre";
import { PropTypes } from "prop-types";



export default function SeriesInformation({ series }) {
  SeriesInformation.propTypes = {
    series: PropTypes.object.isRequired,
  };
  return (
    <div className="row">
      {series && (
        <>
          <div className="col-md-4 mb-3">
            <SeriesThumbnail src={series.cover} size={4} shadow={true} />
          </div>
          <div className="col-md-8">
            {/* Title and Information */}
            <div>
              <Typography variant="h4">{series.title}</Typography>
              {/* Add separator */}
              <hr className="separator" />
              <p>
                <strong><GenreIcon /> Thể loại:</strong>
                {series.genres.map((element) => (
                  <Link to="#" key={element}>
                    {" "}
                    <Genre name={element} />
                  </Link>
                ))}
              </p>
              <Grid container spacing={3} alignItems="center">
                <Grid item>
                  <FavoriteIcon />
                  <Typography variant="body1" component="span" ml={1}>
                    {series.totalLike} Favorites
                  </Typography>
                </Grid>
                <Grid item>
                  <VisibilityIcon />
                  <Typography variant="body1" component="span" ml={1}>
                    {series.totalView} Views
                  </Typography>
                </Grid>
                <Grid item>
                  <ChapterIcon />
                  <Typography variant="body1" component="span" ml={1}>
                    {series.totalChapter} chương
                  </Typography>
                </Grid>
              </Grid>
              <p>
                <strong><StatusIcon /> Trạng thái: </strong>
                {series.seriesState === "ONGOING"
                  ? "Đang tiến hành"
                  : "Kết thúc"}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
