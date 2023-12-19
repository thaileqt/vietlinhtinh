import { useState, useEffect } from "react";
import "react-multi-carousel/lib/styles.css"; // Import the default styles

// import RecentUpdate from "../components/RecentUpdate";
import SeriesService from "../services/series.service";
import SeriesCarousel from "../components/carousel/SeriesCarousel";
import RecentUpdatedSeries from "../components/list/RecentUpdatedSeries";


const Home = () => {
  const [hotSeries, setHotSeries] = useState([]);
  const [latestSeriesList, setLatestSeriesList] = useState([]);
  

  useEffect(() => {
    SeriesService.getHotSeries(10).then(
      (response) => {setHotSeries(response.data)},
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setHotSeries(_content);
      }
    );
      // Fetch recent updated series from UserService
    SeriesService.getTopRecentUpdatedSeries(0).then(
        (response) => {
            setLatestSeriesList(response.data);
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

  }, []);

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
    <div className="container" >
      
      <div>
        <SeriesCarousel seriesList={hotSeries} heading={"Truyện Hot"} indexMark={true} showRating={true}/>
      </div>

      <div>
        <RecentUpdatedSeries />
      </div>
      
      <div>
        <SeriesCarousel seriesList={latestSeriesList} heading={"Mới ra mắt"} />
      </div>
      
    </div>

    

 
  );
};

export default Home;
