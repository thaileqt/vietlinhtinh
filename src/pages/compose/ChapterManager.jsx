import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../../styles/SeriesDetailCompose.css'; // Import CSS for styling
import ChapterService from '../../services/chapter.service';
import SeriesService from '../../services/series.service';
import paths from '../../commons/paths';
import { Pagination, Rating, Stack, Typography } from '@mui/material';
import SeriesThumbnail from '../../components/avatar/SeriesThumbnail';
import Genre from "../../components/misc/Genre";
import MyBreadcrumb from '../../components/layout/Breadcrumb';

export default function ChapterList() {
  const { slug } = useParams();
  const [chapters, setChapters] = useState(null);
  const [series, setSeries] = useState(null);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    ChapterService.getChaptersBySeriesSlug(slug, 1, 10)
      .then((response) => {
        setChapters(response.data);
      })
      .catch((error) => {
        console.error('Error fetching chapters:', error);
      });
      SeriesService.getSeriesBySlug(slug)
      .then((response) => {
        setSeries(response.data);
      })
      .catch((error) => {
        console.error('Error fetching chapters:', error);
      });
    ChapterService.countTotalChapters(slug)
        .then((response) => {
            setTotalPages(Math.ceil(response.data/20));
        })
        .catch((error) => {
            console.error('Error fetching chapters:', error);
        });
      
  }, [slug]);

  const handleDeleteChapter = (id) => {
    ChapterService.deleteChapter(id)
      .then((response) => {
        console.log(response.data);
        setChapters(chapters.filter((chapter) => chapter.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting chapter:', error);
      });
  }

  return (
    <div className="series-detail-compose container">
      {series && (
        <>
          <MyBreadcrumb items={[series.title]} />
          <header style={{
                fontSize: "0.9rem", 
                // darker than white
                backgroundColor: "#f5f5f5",
                // padding top
                paddingTop: "1rem",
                paddingBottom: "0.5rem",
            }}>
            <Stack direction="row" spacing={2}>
              <Stack direction="column" spacing={2} alignItems="center">
                <SeriesThumbnail src={series.cover} size={1} />
                <Rating name="read-only" value={series.rating} readOnly />
              </Stack>
              <Stack direction="column" spacing={1}>
                <h2>{series.title}</h2>
                <Stack direction="row" spacing={2}>
                  {series.genres.map((genre) => (
                    <span key={genre.id} className="genre">
                      <Genre name={genre.name} />
                    </span>
                  ))}
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {series.description}
                </Typography>

              </Stack>
            
            </Stack>
            </header>
        </>
      )}
        
        {(series && chapters && totalPages) ? (
            <div>
            <div className="add-chapter-button">
                <button><Link to={`/compose/add-chapter/${slug}`}>Add Chapter</Link></button>
            </div>
            <div className="chapter-list">
                {chapters.map((chapter) => (
                <div key={chapter.id} className="chapter-item">
                    {/* Chapter Details */}
                    <div className="chapter-details">
                    <div className="chapter-header">
                        <p>{chapter.title + ` [${chapter.chapterState.name}]`}</p>
                        <span className="delete-chapter" onClick={handleDeleteChapter} style={{
                            color: 'red',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            fontSize: '0.8rem',
                        }}>Delete</span>
                    </div>
                    <div className="chapter-footer">
                        {/* <p className="chapter-content">{chapter.content.slice(0, 150)}...</p> */}
                        <div className="action-buttons">
                          <button><Link to={paths.compose.editChapter(slug, chapter.chapterNumber)}>Edit</Link></button>
                        </div>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            
            </div>
            
        ) : (
            <div className="chapter-list">
                <h3>There are no chapters in this series.</h3>
            </div>
        )}
      
      {/* Add Chapter Button */}
      
      <Pagination count={totalPages ? totalPages : 1} variant="outlined" shape="rounded" />
      
    </div>
  );
  
}

