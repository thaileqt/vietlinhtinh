import { useState, useEffect } from "react";
import "react-multi-carousel/lib/styles.css"; // Import the default styles

// import RecentUpdate from "../components/RecentUpdate";
import SeriesService from "../services/series.service";
import SeriesCarousel from "../components/carousel/SeriesCarousel";
import RecentUpdatedSeries from "../components/list/RecentUpdatedSeries";


const Home = () => {
  const [hotSeries, setHotSeries] = useState(null);
  const [recentUpdatedSeries, setRecentUpdatedSeries] = useState(null);
  const [latestSeriesList, setLatestSeriesList] = useState(null);
  const recentUpdatedSeriesSize = 20
  

  useEffect(() => {
    Promise.all([
      SeriesService.getHotSeries(10),
      SeriesService.getTopRecentUpdatedSeries(1, recentUpdatedSeriesSize),
      SeriesService.getRecentCreatedSeries(1, 10),
    ]).then(([hotSeriesResponse, recentUpdatedSeriesResponse, latestSeriesResponse]) => {
      setHotSeries(hotSeriesResponse.data);
      setRecentUpdatedSeries(recentUpdatedSeriesResponse.data);
      setLatestSeriesList(latestSeriesResponse.data);
    }).catch(error => {
      // Handle errors for both requests
      console.error('Error fetching series:', error);
    });
  }, []);

  


  const handlePageChange = (event, value) => {
    SeriesService.getTopRecentUpdatedSeries(value, recentUpdatedSeriesSize).then(
      (response) => {
          setRecentUpdatedSeries(response.data);
      },
      (error) => {
          const errorMessage =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          console.error('Error fetching recent updated series:', errorMessage);
          // Handle errors accordingly
      }
    );
  };

  // Configuration for the carousel
  // const responsive = {
  //   desktop: {
  //     breakpoint: { max: 3000, min: 1024 },
  //     items: 5,
  //   },
  //   tablet: {
  //     breakpoint: { max: 1024, min: 464 },
  //     items: 3,
  //   },
  //   mobile: {
  //     breakpoint: { max: 464, min: 0 },
  //     items: 1,
  //   },
  // };
  

 

  return (
    <div className="container" // set min height is screen height
      style={{ minHeight: "100vh" }}
    >
      
      <div>
        <SeriesCarousel seriesList={hotSeries} heading={"Truyện Hot"} indexMark={true} showRating={true}/>
      </div>

      <div>
        
        <RecentUpdatedSeries seriesList={recentUpdatedSeries} handlePageChange={handlePageChange} />
      </div>
      
      <div>
        
         <SeriesCarousel seriesList={latestSeriesList} heading={"Mới ra mắt"} />
      </div>
      
    </div>

    

 
  );
};

export default Home;
