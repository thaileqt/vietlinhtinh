import { IconButton } from "@mui/material"
import { Notifications } from "@mui/icons-material"
import {Menu, Badge, MenuItem } from "@mui/material"


export default function Notification({ handleMenuOpen, handleMenuClose, notificationAnchorEl }) {
    return (
        <div>
            <IconButton onClick={(event) => handleMenuOpen(event, 'notification')}>
                  <Notifications fontSize="small" sx={{color: "rgb(233, 233, 233)"}}/>
                  <Badge fontSize="small" badgeContent={3} color="error" sx={{fontSize: "0.1rem"}} variant="string"/>
                  
              </IconButton>
              
                <Menu
                  anchorEl={notificationAnchorEl}
                  open={Boolean(notificationAnchorEl)}
                  onClose={() => handleMenuClose('notification')}
                >
                  {/* Add notification items here */}
                  <MenuItem>Notification 1</MenuItem>
                  <MenuItem>Notification 2</MenuItem>
                  <MenuItem>Notification 3</MenuItem>
                </Menu>
            
        </div>
    )
}