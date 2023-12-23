import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { Box, Typography, Stack, CircularProgress, Link} from '@mui/material';
import SeriesThumbnail from '../avatar/SeriesThumbnail';
import Genre from '../misc/Genre';
import "../../styles/RecentUpdatedSeries.css";
import utils from "../../commons/utils";
import paths from '../../commons/paths';
import PropsType from 'prop-types';



function RecentSeriesList({ seriesList }) {
    RecentSeriesList.propTypes = {
        seriesList : PropsType.array,
    };
    const [hoveredIndex, setHoveredIndex] = React.useState(null);
  
    return (
      <div className="recent-series-container">
        <div className="section-header">Mới cập nhật</div>
        
          {seriesList ? seriesList.map((series, index) => (
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
                      {series.genres ? series.genres.map((genre) => (
                            // <a key={element}> {mapper.genre_name_mapper[element]} {element === series.genres[series.genres.length - 1] ? "" : "-"}</a>
                            <Genre name={genre.name} key={genre.id} color="black" borderRadius='3px' border="1px solid rgb(191, 191, 191)" />
                          )) : ""}
                    </Typography>
                    {/* <Link to={paths.chapter(series.slug, series.chapterNumber)}> */}
                      <Typography
                        component="span"
                        variant="body1"
                        color={hoveredIndex === index ? "secondary" : "text.primary"}
                        onClick={() => {window.location.href=paths.chapter(series.slug, series.chapterNumber)}}
                        // on hover
                        sx={{
                          color: hoveredIndex === index ? "red" : "black",
                          '&:hover': {
                            color: "blue",
                            cursor: "pointer",
                          },
                        }}
                      >
                      {series.chapterTitle}
                      </Typography>
                    {/* </Link> */}
                  </Stack>
                </Stack>

                <Stack direction="column" justifyContent="flex-end" // right align
                  alignItems="flex-end" // right align
                  paddingRight="10px"
                >
                  <Typography
                    component="span"
                    variant="subtitle2"   
                  >
                    {"\t" + utils.timeSince(series.updatedDate)}
                  </Typography>

                  <Typography
                    component="span"
                    variant="subtitle2"  // flex end
                    // on hover  
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
                      onClick={() => {window.location.href = paths.profile(series.author.username)}}
                    >
                      {series.author.username}
                    </Typography>
                  </Typography>
                </Stack>
              </Stack>    
          )): (
            <CircularProgress />
          
          )}
        
      </div>
    );
}
    
  

export default function RecentUpdatedSeries({ seriesList, handlePageChange }) {
  RecentUpdatedSeries.propTypes = {
    seriesList : PropsType.array,
    handlePageChange : PropsType.func,
  };
   

  return (
    <>
        <RecentSeriesList seriesList={seriesList} />
        <Box display="flex" justifyContent="center" mt={2}>
            {/* <Stack spacing={2}> */}
            {/* <Pagination count={10} shape="rounded" /> */}
        <Pagination count={10} variant="outlined" shape="rounded" onChange={handlePageChange} 
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