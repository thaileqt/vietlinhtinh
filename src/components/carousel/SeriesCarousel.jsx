import Slider from "react-slick";
import SeriesThumbnail from "../avatar/SeriesThumbnail";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Box, Chip, CircularProgress, Typography } from "@mui/material";

import { PropTypes } from "prop-types";


import { StarRateOutlined, StarRate } from "@mui/icons-material";
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import paths from "../../commons/paths";

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});



SeriesCarousel.propTypes = {
  seriesList: PropTypes.array,
  heading: PropTypes.string.isRequired,
  indexMark: PropTypes.bool,
  showRating: PropTypes.bool,
  showChapterCount: PropTypes.bool,
};

function SamplePrevArrow(props) {
  SamplePrevArrow.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
  }

  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

function SampleNextArrow(props) {
  SampleNextArrow.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
  }
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, 
        
      
        border: "1px solid black", 
        borderRadius: "none", 
        fontSize: "2rem",
        fontWeight: "bold",
      // width: "50px",
      // height: "50px",
        // align vertical center
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // set arrow color
        
        // set arrow background color
        background: "gray", 
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: "1",
        
        
     }}
      onClick={onClick}
    />
  );
}


export default function SeriesCarousel ({ seriesList, heading, indexMark=false, showRating=false, showChapterCount=false }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: seriesList ? 8 : 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    // centerMode: true,
    // centerPadding: "60px",
  };

  return (
    <div>
      <br />
      <Typography variant="h6" gutterBottom>
        <strong>{heading}</strong>
      </Typography>
      
      <div className="container">
        {seriesList ? (
        <Slider {...settings}>
          {seriesList.slice(0, 10).map((series, index) => (
            <div className="series-slide" key={series.id}>
              <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" maxWidth="100px" position="relative">
    
                <SeriesThumbnail src={series.cover} borderRadius={3} size={1} onHover={true}
                    handleImageClick={() => {window.location.href = paths.series(series.slug)}}/>
                {indexMark===true && (
                    <Typography
                    variant="h6"
                    sx={{
                      position: 'absolute',
                      top: '0px',
                      left: '0px',
                    }}
                  >
                    <Chip
                    sx={{
                      color: "rgb(233, 233, 233)",
                      backgroundColor: "rgb(100, 0, 50, 0.6)",
                      fontWeight: "bold",
                    }}
                    label={index+1}
                  />
                  </Typography>
                )}
                
                
                {showChapterCount==true && (<Typography variant="body2" color="text.secondary" sx={{marginBottom: "5px"}}>({series.totalChapter} chương)</Typography>)}
                {showRating==true && (
                    <StyledRating
                      readOnly
                      sx={{margin: "5px 0"}}
                      name="customized-color"
                      defaultValue={series.averageRating ? series.averageRating : 0}
                      // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                      precision={0.5}
                      size="small"
                      icon={<StarRate fontSize="inherit" />}
                      emptyIcon={<StarRateOutlined fontSize="inherit" />}
                    />
                  
                )}
                <Typography variant="h10" sx={{
                  fontSize: "0.8rem",
                  // on hover
                  '&:hover': {
                    color: '#ff3d47',
                    cursor: "pointer",
                  },
                  }}
                  onClick={() => {window.location.href = paths.series(series.slug)}}
                  ><strong> 
                  {series.title.length > 20 ? series.title.substring(0, 20) + "..." : series.title}
                    </strong></Typography>
                
              </Box>
            </div>
          ))}
        </Slider>
        ) : (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        )}
      </div>
      <br />
    </div>
  );
}
