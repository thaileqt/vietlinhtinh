import React, { useEffect } from 'react';
// import default_cover from '../../assets/default_cover.jpeg';
import { Box, CircularProgress, List, Pagination } from '@mui/material';
import SeriesListItem from '../list/SeriesListItem';
import SeriesService from '../../services/series.service';

export default function SeriesSection({profile_username}) {
  // Assuming you have an array of user-owned series
    const [seriesList, setSeriesList] = React.useState(null);
    const [page, setPage] = React.useState(1);
    const [size, setSize] = React.useState(10);
    const [totalPages, setTotalPages] = React.useState(null);

 
  useEffect(() => {
    SeriesService.getUserOwnedSeries(profile_username, page-1, size)
    .then(
      (response) => {setSeriesList(response.data);},
      (error) => {console.log(error);}
    );
    SeriesService.countUserOwnedSeries(profile_username)
    .then(
      (response) => {setTotalPages(Math.ceil(response.data/size));},
      (error) => {console.log(error);}
    );
}, [page, size]);

  const handleChange = (event, value) => {
    setPage(value);
    SeriesService.getUserOwnedSeries(profile_username, value-1, size)
    .then(
      (response) => {setSeriesList(response.data);},
      (error) => {console.log(error);}
    );
  }

  return (
    <div>
        {seriesList ? (
            seriesList.length > 0 ? (
                <div>
                <List>
                    {seriesList.map((series, index) => (
                        <SeriesListItem key={index} series={series} />
                    ))}
                </List>
                {totalPages > 1 ? <Pagination count={totalPages} variant="outlined" shape="rounded" onChange={handleChange} /> : null}
            </div>
            ) : (
                "Nguời dùng này chưa đăng bộ truyện nào."
            )
        ) : (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )
            
    }
    
  </div>
  );
};
