import React from "react";
import { Box, Tabs, Tab } from "@mui/material";


export default function ProfileTabs({value, handleChange, renderTabContent}) {
  return (
    <Box sx={{ width: '100%', 
    border : '1px solid #eaeaea',
    borderRadius : '5px',
     }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="Tin nhắn" />
        <Tab value="two" label="Sáng tác" />
        <Tab value="three" label="Đánh giá" />
        <Tab value="four" label="Tủ truyện" />
      </Tabs>
      {renderTabContent()}
    </Box>
  );
}