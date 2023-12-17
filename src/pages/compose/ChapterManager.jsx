import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../../styles/SeriesDetailCompose.css'; // Import CSS for styling
import ChapterService from '../../services/chapter.service';
import SeriesService from '../../services/series.service';
import paths from '../../commons/paths';
import { Pagination } from '@mui/material';
import SeriesThumbnail from '../../components/avatar/SeriesThumbnail';

export default function ChapterList() {
  const { slug } = useParams();
  const [chapters, setChapters] = useState([]);
  const [series, setSeries] = useState({});
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    ChapterService.getChaptersBySeriesSlug(slug, 0, 10)
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

  return (
    <div className="series-detail-compose">
        <h2>{series.title}</h2>
        <SeriesThumbnail src={series.cover} />
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
                        <p>{chapter.title}</p>
                        <p className="chapter-state">{chapter.chapterState}</p>
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

