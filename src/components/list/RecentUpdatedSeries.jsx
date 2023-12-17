import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { Box, Typography, List, ListItem, Grid, ListItemSecondaryAction, ListItemAvatar, ListItemText} from '@mui/material';
import SeriesService from '../../services/series.service';
import SeriesThumbnail from '../avatar/SeriesThumbnail';
import Genre from '../misc/Genre';
import "../../styles/RecentUpdatedSeries.css";
import utils from "../../commons/utils";
import paths from '../../commons/paths';
import PropsType from 'prop-types';



function RecentSeriesList({recentUpdatedSeries}) {
    RecentSeriesList.propTypes = {
        recentUpdatedSeries: PropsType.array.isRequired,
    };
    const [hoveredIndex, setHoveredIndex] = React.useState(null);
  
    const handleMouseEnter = (index) => {
      setHoveredIndex(index);
    };
  
    const handleMouseLeave = () => {
      setHoveredIndex(null);
    };
  
    return (
      <div className="recent-series-container">
        <h3 className="section-header">Mới cập nhật</h3>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {recentUpdatedSeries.map((series, index) => (
            <Grid key={series.id}>
              <ListItem
                alignItems="flex-start"
                className={`list-item ${
                  index % 2 === 0 ? "even-item" : "odd-item"
                }`}
                onClick={() => {
                  window.location.href = paths.series(series.slug);
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                key={series.id}
              >
                <ListItemAvatar>
                  <SeriesThumbnail src={series.cover} size={1} shadow={false} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      component="span"
                      variant="body1"
                      color={hoveredIndex === index ? "secondary" : "text.primary"}
                    >
                      {series.title}
                    </Typography>
                  }
                  secondary={
                    <React.Fragment>
                      {series.genres ? series.genres.map((element) => (
                        // <a key={element}> {mapper.genre_name_mapper[element]} {element === series.genres[series.genres.length - 1] ? "" : "-"}</a>
                        <Genre name={element} key={element} />
                      )) : ""}
                      <br />
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Chương {series.totalChapter}
                      </Typography>
                      {"\t(" + utils.timeSince(series.updatedDate) + ")"}
                    </React.Fragment>
                  }
                />
                {/* Positioning author's name at the rightmost */}
                <ListItemSecondaryAction>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Tác giả: {series.author.name}
                  </Typography>
                </ListItemSecondaryAction>
              </ListItem>
            </Grid>
          ))}
        </List>
      </div>
    );
}
    
  

export default function RecentUpdatedSeries() {
    const [recentUpdatedSeries, setRecentUpdatedSeries] = React.useState([]);

    React.useEffect(() => {
        // Fetch recent updated series from UserService
        SeriesService.getTopRecentUpdatedSeries(0).then(
            (response) => {
                setRecentUpdatedSeries(response.data);
            },
            (error) => {
                const errorMessage =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
                console.error('Error fetching recent updated series:', errorMessage);
                // Handle errors accordingly
            }
        );
    }, []);

    const handleChange = (event, value) => {
      SeriesService.getTopRecentUpdatedSeries(value-1).then(
        (response) => {
            setRecentUpdatedSeries(response.data);
        },
        (error) => {
            const errorMessage =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            console.error('Error fetching recent updated series:', errorMessage);
            // Handle errors accordingly
        }
      );
    };

  return (
    <>
        <RecentSeriesList recentUpdatedSeries={recentUpdatedSeries} />
        <Box display="flex" justifyContent="center" mt={2}>
            {/* <Stack spacing={2}> */}
            {/* <Pagination count={10} shape="rounded" /> */}
        <Pagination count={10} variant="outlined" shape="rounded" onChange={handleChange} 
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '20px'
                }} 
            />
            {/* </Stack> */}
        </Box>
    </>
 
  );
}