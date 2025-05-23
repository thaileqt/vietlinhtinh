import { Avatar, Button, Grid, Typography } from '@mui/material';
import CoffeeIcon from '@mui/icons-material/LocalCafe'; // Assuming Coffee Icon is available in Material-UI
import PersonAddIcon from '@mui/icons-material/PersonAdd'; // Icon for Follow button
import PropTypes from 'prop-types';

export default function UserInformation({ user }) {
  return (
    <>
    <Grid container direction="column" alignItems="center" sx={{ border: '1px solid rgb(100, 0, 50)', borderRadius: '5px' }}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ width: '100%', textAlign: 'center', backgroundColor: "rgb(100, 0, 50)", color: "white" }}>
            Tác giả
          </Typography>
        </Grid>
        {/* Avatar */}
        <Grid item xs={12}>
          <Avatar
            alt={user.name}
            src={user.cover || "https://cdn.dribbble.com/users/1463082/screenshots/4325775/__________-1.png"}
            sx={{
              width: 75,
              height: 75,
              margin: 'auto',
              marginTop: '10px',
              marginBottom: '10px',
              border: '1px solid #ccc',
            }}
          />
        </Grid>
        {/* user name */}
        <Grid item xs={12}>
          <Typography
            variant="h6"
            sx={{width: '100%',  textAlign: 'center',
              transition: 'color 0.3s', // Adding transition effect for color change
              '&:hover': {
                color: '#FF0000', // Change text color on hover
                cursor: 'pointer', // Change cursor to pointer on hover 
              },
            }}
          >
            {user.name}
          </Typography>
          <Typography variant="h6" sx={{width: '100%', textAlign: 'center',}}>
            {user.roles.map((role) => {
              if (role.name === "ROLE_ADMIN") {
                return "Admin";
              }
            }).join(', ')}
          </Typography>
        </Grid>
      </Grid>

      {/* Buttons */}
      <Grid item container spacing={1} justifyContent="center" sx={{ marginBottom: '10px' }}>
        <Grid item>
          <Button variant="outlined" color="primary" startIcon={<PersonAddIcon />} size="small" sx={{ fontSize: '0.7rem' }}>
            Follow
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="primary" startIcon={<CoffeeIcon />} size="small" sx={{ fontSize: '0.7rem' }}>
            Buy a Coffee
          </Button>
        </Grid>
      </Grid>

    </Grid>

    <Grid container direction="column" alignItems="left" sx={{ border: '1px solid #ccc', borderRadius: '5px', marginTop: '20px' }}>
        <Typography variant="h10">
            Tham gia từ ngày 14/10/2021
        </Typography>
        <Typography variant="h10">
            Theo dõi: 0
        </Typography>
        <Typography variant="h10">
            Đang theo dõi: 0
        </Typography>
        <Typography variant="h10">
            Đã đánh giá: 0
        </Typography>
    </Grid>

    <Grid container direction="column" alignItems="left" sx={{ border: '1px solid #ccc', borderRadius: '5px', marginTop: '20px' }}>
        <Typography variant="h10">
            Description here
        </Typography>
    </Grid>
    </>
  );
};


UserInformation.propTypes = {
  user: PropTypes.object.isRequired,
};



