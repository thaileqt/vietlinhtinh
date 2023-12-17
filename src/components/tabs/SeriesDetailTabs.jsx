import * as React from 'react';
import {Tabs, Tab, Box} from '@mui/material';


export default function SeriesDetailTabs() {
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="Chi tiết" />
        <Tab value="two" label="Nhân vật" />
      </Tabs>
    </Box>
  );
}