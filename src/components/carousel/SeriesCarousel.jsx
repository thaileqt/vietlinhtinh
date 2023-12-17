import Slider from "react-slick";
import SeriesThumbnail from "../avatar/SeriesThumbnail";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography } from "@mui/material";


function SamplePrevArrow(props) {
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
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }

export default function SeriesCarousel ({ seriesList, heading }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: seriesList.length >= 8 ? 8 : seriesList.length,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    // centerMode: true,
    // centerPadding: "60px",
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        {heading}
      </Typography>
      <div className="container">
        
        <Slider {...settings}>
          {seriesList.slice(0, 10).map((series) => (
            <div className="series-slide" key={series.id}>
              <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" maxWidth="100px">
                <SeriesThumbnail src={series.cover} borderRadius={3} width={100} height={140} />
                <Typography variant="body2" color="text.secondary" sx={{marginBottom: "5px"}}>({series.totalChapter} chương)</Typography>
                <Typography variant="h10" sx={{fontSize: "0.8rem"}}><strong>{series.title}</strong></Typography>
                
              </Box>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

