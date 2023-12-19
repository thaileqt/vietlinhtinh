import React from 'react';
import {
  Divider,
  List,
  ListItem,
} from '@mui/material';
import UserOwnedSeries from './element/UserOwnedSeries';
import PropTypes from 'prop-types';

const UserOwnedSeriesList = ({ series }) => {
    UserOwnedSeriesList.propTypes = {
        series: PropTypes.array,
    };
  
  return (
    <List>
      {series.map((series, index) => (
        <React.Fragment key={series.id}>
          {index === 0 && <Divider />}
              <UserOwnedSeries series={series} />
          <hr />
          {/* <Box sx={{ position: 'relative' }}>
            <ListItem>
              <UserOwnedSeriesElement series={series} />
            </ListItem>
            <Box sx={{ position: 'absolute', top: 0, right: 0 , fontSize: '0.5rem'}}>
              <Button
                color="error"
                onClick={() => handleDelete(series.id)}
              >
                Xóa
              </Button>
            </Box>
            <Divider />
          </Box> */}
        </React.Fragment>
      ))}
    </List>
  );
};

export default UserOwnedSeriesList;
