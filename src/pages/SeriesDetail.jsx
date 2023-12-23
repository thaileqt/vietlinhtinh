// SeriesDetail.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import "../styles/SeriesDetail.css";
import ChapterList from '../components/list/ChapterList';
import SeriesDescription from '../components/series/SeriesDescription';
import SeriesInformation from '../components/series/SeriesInformation';
import SeriesReviews from '../components/series/SeriesReviews';
import SimilarSeries from '../components/list/SimilarSeries';

import Author from '../components/user/Author';
import SeriesDetailTabs from '../components/tabs/SeriesDetailTabs';
import SeriesService from '../services/series.service';
import { CircularProgress } from '@mui/material';
import MyBreadcrumb from '../components/layout/Breadcrumb';


const SeriesDetail = () => {
    const { slug } = useParams(); // Get the ID parameter from the URL
    const [series, setSeries] = useState(null)
    
    const seriesList = [
        {
            title: "Max & the Unknown",
            user: {
                username: "thaileqt",
            },
            cover: "https://i.imgur.com/3JQXQ9p.jpg",
            totalChapter: 10,
            totalLike: 120,
            totalView: 23591,
        },
        {
            title: "Tác giả Vs Người đọc",
            user: {
                username: "thaileqt",
            },
            cover: "https://cdn.scribblehub.com/images/47/Author-Vs-Reader_942487_1702433591.jpg",
        },
        {
            title: "Max & the Unknown",
            user: {
                username: "thaileqt",
            },
            cover: "https://i.imgur.com/3JQXQ9p.jpg",
            totalChapter: 10,
            totalLike: 120,
            totalView: 23591,
        },
        {
            title: "Tác giả Vs Người đọc",
            user: {
                username: "thaileqt",
            },
            cover: "https://cdn.scribblehub.com/images/47/Author-Vs-Reader_942487_1702433591.jpg",
        },
        {
            title: "Max & the Unknown",
            user: {
                username: "thaileqt",
            },
            cover: "https://i.imgur.com/3JQXQ9p.jpg",
            totalChapter: 10,
            totalLike: 120,
            totalView: 23591,
        },
    ]

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
        <div style={{ minHeight: "100vh" }}>
            
        {series ? (
            
            <div >
                <MyBreadcrumb items={[series.title]} />
            
                {/* SeriesInformation */}
                <div className="series-information-background"> {/* Change bg-info to the desired Bootstrap background color class */}
                    <div className="container">
                        <SeriesInformation series={series} />
                    </div>
                    <hr style={{
                        backgroundColor: "rgb(100, 0, 50)",
                    
                    }}/>
                    
                    <div className="container">
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
                            <SimilarSeries seriesList={seriesList} />
                            
                        </div>
                    </div>
                </div>
      
            </div>
        ) : (
            <CircularProgress />
        )}
        </div>
    );
};

export default SeriesDetail;
