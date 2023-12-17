import { Grid, ListItem, Typography } from "@mui/material";
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
    <ListItem>
      {/* Row 1 */}
      <Grid container justifyContent="space-between" xs={12}>
        <Grid container spacing={2} xs={12}>
            {/* Left Column */}
            <Grid item xs={12} sm={3}>
                <Grid container alignItems="center" spacing={2}>
                    {/* Thumbnail */}
                    <Grid item>
                    <SeriesThumbnail src={series.cover} borderRadius={3} width={100} height={140} />
                    </Grid>
                    {/* Star Rating (Assuming you have a component for it) */}
                    <Grid item>
                    {/* Replace with your star rating component */}
                    {/* <StarRatingComponent /> */}
                    </Grid>
                </Grid>
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} sm={9}>
                <Link to={paths.compose.allChapter(series.slug)}>
                <Typography variant="subtitle1">{series.title}</Typography>
                </Link>
                <Typography variant="body2" color="textSecondary">
                <VisibilityOutlined fontSize="small"/> {series.totalView} <FavoriteOutlined fontSize="small" />{series.totalLike} <LibraryBooksOutlined/> {series.totalChapter}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                {series.genres && series.genres.map((element) => (
                    <span key={element ? element : "z"}>
                    <Genre name={element ? element : "Unknown"} />
                    </span>
                ))}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                {renderDescription(series.description)}
                </Typography>
            </Grid>
        </Grid>
        {/* Row 2 for buttons */}
        <Grid container justifyContent="flex-end" xs={12}>
          <CustomButton name="Chương" icon={<AddOutlined />} color="transparent" onClick={() => window.location.href = paths.compose.addChapter(series.slug)} />
          <CustomButton name="Sửa" icon={<EditOutlined />} color="transparent" onClick={() => window.location.href = paths.compose.editSeries(series.slug)} />
        </Grid>
      </Grid>

    </ListItem>
    
  );
}
