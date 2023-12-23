import { useEffect, useState } from 'react';
import { TextField, Button, Typography, Rating } from '@mui/material';
import AuthService from '../../services/auth.service';
import ReviewService from '../../services/review.service';
import ReviewList from '../list/ReviewList';
import { PropTypes } from 'prop-types';



export default function SeriesReviews({ reviews, seriesId }) {
  SeriesReviews.propTypes = {
    reviews: PropTypes.array.isRequired,
    seriesId: PropTypes.number.isRequired,
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newReview, setNewReview] = useState({
    content: '',
    rating: 0,
    seriesId: seriesId,
  });
  


    useEffect(() => {
    // Check if user is logged in by examining local storage
      const user = AuthService.getCurrentUser();
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleRatingChange = (event, value) => {
    setNewReview((prevReview) => ({
      ...prevReview,
      rating: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    ReviewService.sendReview(newReview)
      .then((response) => {
        console.log(response.data);
        // reload the page
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error sending review:', error);
      }
    );
  };

  return (
    <div className="col-md-12">
      <h5><strong>Nhận xét</strong></h5>

      <ReviewList reviews={reviews} />

      
        <form onSubmit={handleSubmit}>
          <br />
          <h5><strong>Thêm nhận xét</strong></h5>
          {isLoggedIn ? (
            <>
          <TextField
            label="Username"
            name="username"
            value={JSON.parse(localStorage.getItem('user')).username}
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            label="Đánh giá"
            name="content"
            value={newReview.content}
            onChange={handleInputChange}
            multiline
            rows={4}
            fullWidth
            margin="normal"
          />
          <Typography component="legend">Rating:</Typography>
          <Rating
            name="rating"
            value={newReview.rating}
            onChange={handleRatingChange}
            precision={1}
          />
          <br />
          <Button variant="contained" color="primary" type="submit">
            Submit Review
          </Button>
          </>
          ) : (
            <Typography variant="body1">
              Vui lòng đăng nhập để thêm nhận xét
            </Typography>
          )}
        </form>
    </div>
  );
}
