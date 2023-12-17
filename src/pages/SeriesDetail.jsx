// SeriesDetail.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import "../styles/SeriesDetail.css";
import ChapterList from '../components/list/ChapterList';
import SeriesDescription from '../components/series/SeriesDescription';
import SeriesInformation from '../components/series/SeriesInformation';
import SeriesReviews from '../components/series/SeriesReviews';
import Author from '../components/user/Author';
import SeriesDetailTabs from '../components/tabs/SeriesDetailTabs';
import SeriesService from '../services/series.service';


const SeriesDetail = () => {
    const { slug } = useParams(); // Get the ID parameter from the URL
    const [series, setSeries] = useState(null)
    
    // const parseDate = (timestamp) => {
    //     return new Date(timestamp).toLocaleString("en-US", {
    //         year: "numeric",
    //         month: "long",
    //         day: "numeric",
    //         hour: "numeric",
    //         minute: "numeric",
    //         second: "numeric",
    //       });
    // };
    // const [value, setValue] = React.useState(0);

    useEffect(() => {
        SeriesService.getSeriesBySlug(slug)
            .then((response) => {
                setSeries(response.data);
            })
            .catch((error) => {
                console.error('Error fetching series details:', error);
            });
    }, [slug]);

    return (
        
        (series && (
            
            <>
            
                {/* SeriesInformation */}
                <div className="series-information-background"> {/* Change bg-info to the desired Bootstrap background color class */}
                    <div className="container">
                        <div className="container">
                        <div className="container">
                        <div className="row">
                            <SeriesInformation series={series} />
                        </div>
                        </div>
                        </div>
                        <SeriesDetailTabs />
                       
                    </div>
                    
                </div>
                

                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <SeriesDescription series={series} />
                            <ChapterList slug={slug} />
                            <SeriesReviews reviews={ series ? series.reviews : null} seriesId={series.id}/>
                        </div>
                        <div className="col-md-3">
                            <Author author={series.author} />
                        </div>
                    </div>
                </div>
      
            </>
        ))
    );
};

export default SeriesDetail;
