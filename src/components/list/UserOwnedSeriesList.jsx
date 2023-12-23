import React from 'react';
import {
  Divider,
  List,
} from '@mui/material';
import UserOwnedSeries from './element/UserOwnedSeries';
import PropTypes from 'prop-types';

const UserOwnedSeriesList = ({ series }) => {
    UserOwnedSeriesList.propTypes = {
        series: PropTypes.array,
    };
  
  return (
    <List sx={{ width: '100%', bgcolor: '#f2f2f2'}}>
      {(series && series.length > 0) ? series.map((series, index) => (
        <React.Fragment key={series.id}>
          {index === 0 && <Divider />}
              <UserOwnedSeries series={series} />
          <hr />
        </React.Fragment>
      )) : (<div>
        Người dùng này chưa đăng bộ truyện nào.
      </div>)}
    </List>
  );
};

export default UserOwnedSeriesList;
