import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { Box, Typography, List, ListItem, Grid, ListItemSecondaryAction, ListItemAvatar, ListItemText, Stack} from '@mui/material';
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
        <div className="section-header">Mới cập nhật</div>
        
          {recentUpdatedSeries.map((series, index) => (
            <Stack key={series.id} direction="row" 
                  className={`list-item ${
                    index % 2 === 0 ? "even-item" : "odd-item"
                  }`}
                  justifyContent="space-between"
                  padding="10px"
            >
              <Stack direction="row" justifyContent="flex-start">
                
                    <SeriesThumbnail src={series.cover} size={0.55} shadow={false} />    
                

                  <Stack direction="column" alignItems="left" paddingLeft="10px">
                    <Typography
                      component="span"
                      variant="body1"
                      textAlign="left"
                      color={hoveredIndex === index ? "secondary" : "text.primary"}
                      // on hover
                      sx={{
                        color: hoveredIndex === index ? "red" : "black",
                        '&:hover': {
                          color: "red",
                          cursor: "pointer",
                        },
                      }}
                      onClick={() => {
                        window.location.href = paths.series(series.slug);
                      }}
                    >
                      <strong>{series.title}</strong>
                    </Typography>
                    <Typography
                      component="span"
                      variant="body1"
                      color={hoveredIndex === index ? "secondary" : "text.primary"}
                    >
                      {series.genres ? series.genres.map((element) => (
                            // <a key={element}> {mapper.genre_name_mapper[element]} {element === series.genres[series.genres.length - 1] ? "" : "-"}</a>
                            <Genre name={element} key={element} color="black" borderRadius='3px' border="1px solid rgb(191, 191, 191)" />
                          )) : ""}
                    </Typography>
                    <Typography
                      component="span"
                      variant="body1"
                      color={hoveredIndex === index ? "secondary" : "text.primary"}
                    >
                      Chương {series.totalChapter}
                    </Typography>
                  </Stack>
                </Stack>

                <Stack direction="column" justifyContent="flex-end"
                >
                  <Typography
                    component="span"
                    variant="subtitle2"   
                  >
                    {"\t" + utils.timeSince(series.updatedDate)}
                  </Typography>

                  <Typography
                    component="span"
                    variant="subtitle2"   
                  >
                    by <Typography
                      component="span"
                      variant="body2"
                      textAlign="left"
                      color={hoveredIndex === index ? "secondary" : "text.primary"}
                      // on hover
                      sx={{
                        color: "#3f51b5",
                        '&:hover': {
                          fontWeight: "bold",
                          cursor: "pointer",
                        },
                      }}
                    >
                      {series.author.username}
                    </Typography>
                  </Typography>
                </Stack>


             
              
              {/* <ListItem key={series.id}
                alignItems="flex-start"
               
                onClick={() => {
                  window.location.href = paths.series(series.slug);
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                
       
              >
                
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
              
 
              </ListItem>  */}
              </Stack>    
          ))}
        
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