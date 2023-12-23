import { useState, useEffect } from 'react';
import UserOwnedSeriesList from '../../components/list/UserOwnedSeriesList';
// import '../components/compose/css/ComposePage.css'; // Import CSS file for styling
import { Button, CircularProgress, Pagination } from '@mui/material';
import SeriesService from '../../services/series.service';
import AddIcon from '@mui/icons-material/Add';
import paths from '../../commons/paths';
import MyBreadcrumb from '../../components/layout/Breadcrumb';


const AddSeriesButton = () => {
  return (
    <div className="add-series-background" style={{
      backgroundImage: '',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }}>
      <div className="add-series-button" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '20px',
        marginBottom: '20px',
        borderRadius: '2px',
        border: '1px solid #ddd',
      }}>
        <Button variant="primary" size="lg" className="add-series-button" // if user clicks on this button, redirect to /compose/add-series
          onClick={() => { window.location.href = paths.compose.addSeries();}}>
          <AddIcon />Thêm truyện
        </Button>
      </div>
    </div>
    
  );
};
// check whether user is logged in, if not, redirect to login page
const checkLogin = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    window.location.href = '/login';
  }
  return user;
};

const ComposePage = () => {
  const user = checkLogin();
  const [series, setSeries] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const size = 10;

  // Fetch series to display in the "Add Chapter" dropdown
  useEffect(() => {
      SeriesService.getSeriesByUsername(user.username, page, size)
        .then((response) => {
          setSeries(response.data);
        })
        .catch((error) => {
          console.error('Error fetching series:', error);
        });
      SeriesService.countUserOwnedSeries(user.username)
        .then((response) => {
          setTotalPages(Math.ceil(response.data/size))
        })
        .catch((error) => {
          console.error('Error fetching series:', error);
        });
    }, [page, user.username]);

  const handlePageChange = (event, value) => {
    setPage(value);
    SeriesService.getUserOwnedSeries(user.username, value, size)
        .then((response) => {
          setSeries(response.data);
        })
        .catch((error) => {
          console.error('Error fetching series:', error);
        });
  }

  return (
    <div className="container-fluid">
      <MyBreadcrumb items={[""]} />
      <div>

        <AddSeriesButton />
      </div>
      <div className="container jumbotron">
        <h4>Truyện của bạn</h4>
          { series ? (
            <UserOwnedSeriesList series={series} />
          ) : (
            <>
            <CircularProgress />
            <Pagination count={totalPages ? totalPages : 0} variant="outlined" shape="rounded" onChange={handlePageChange} />
            </>
          )}
          
          
      </div>
    </div>
  );
};

export default ComposePage;
