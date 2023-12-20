import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
// Compoenents
import CommentSection from '../components/chapter/CommentSection';
import ContentRender from '../components/chapter/ContentRender';
import { FavoriteBorderOutlined, FavoriteOutlined, Visibility } from '@mui/icons-material';
import SeriesThumbnail from '../components/avatar/SeriesThumbnail';
import ChapterConfig from '../components/chapter/ChapterConfig';
// Services
import SeriesService from '../services/series.service';
import ChapterService from '../services/chapter.service';
import MarkerService from '../services/marker.service';
import LikeService from '../services/like.service';
import AuthService from '../services/auth.service';

import paths from '../commons/paths';
import { Divider, Stack, Typography } from '@mui/material';




const ChapterDetail = () => {
    const user = AuthService.getCurrentUser();
    let { slug, chapterNumber } = useParams(); // Get the ID parameter from the URL
    
    const [series, setSeries] = useState(null);
    const [chapter, setChapter] = useState([]);
    const [nextChapter, setNextChapter] = useState(null);
    const [prevChapter, setPrevChapter] = useState(null);
    const seriesReaderRef = useRef(null);
    const [lineSpacing, setLineSpacing] = useState('1.5');
    const [backgroundColor, setBackgroundColor] = useState('#FFFFFF'); // Default color
    const [showSettings, setShowSettings] = useState(false);
    const [fontSize, setFontSize] = useState(20);

    const [totalChapter, setTotalChapter] = useState(null);
    const [marker, setMarker] = useState(null);
    const [is_like, setIsLike] = useState(user ? null : false);
    const [likeCount, setLikeCount] = useState(null);
    const [commentCount, setCommentCount] = useState(null);
    const navigate = useNavigate();

    

    useEffect(() => {
      SeriesService.getSeriesBySlug(slug) // Fetch the details of the specific series
        .then((response) => { setSeries(response.data); }) 
        .catch((error) => { console.error('Error fetching series details:', error); });



      ChapterService.getChapterBySeriesSlugAndChapterNumber(slug, chapterNumber)
        .then((response) => { 
          setChapter(response.data); 
          setLikeCount(response.data.likeCount);
          setCommentCount(response.data.comments.length);
          return response.data.id;
        }) 
        .then((chapterId) => {

          MarkerService.getMarkerInThisChapter(chapterId)
            .then((response) => { 
              console.log(response.data)
              setMarker(response.data); 
              })
              .catch((error) => { console.error('Error fetching marker:', error); });

          LikeService.isChapterLiked(chapterId)
          .then((response) => {
            setIsLike(response.data);
            
          })
          .catch((error) => { console.error('Error fetching like:', error); });
        })
      
        .catch((error) => { console.error('Error fetching chapter details:', error); });

        
          
        ChapterService.countTotalChapters(slug)
        .then((response) => { 
          setTotalChapter(response.data); 
          loadAdjacentChapters(response.data);
        })
        .catch((error) => { console.error('Error fetching total chapter:', error); });
      }, [slug, chapterNumber]);

    const loadAdjacentChapters = async (totalChapter) => {
      // Fetch next and previous chapters based on the current chapter number
      const nextChapterNumber = parseInt(chapterNumber, 10) + 1;
      const prevChapterNumber = parseInt(chapterNumber, 10) - 1;
      if (nextChapterNumber <= totalChapter) {
        const nextChapterData = await ChapterService.getChapterBySeriesSlugAndChapterNumber(slug, nextChapterNumber);
        setNextChapter(nextChapterData.data);
      } else {
        console.log(nextChapterNumber, totalChapter);
      }
      if (prevChapterNumber > 0) {
        const prevChapterData = await ChapterService.getChapterBySeriesSlugAndChapterNumber(slug, prevChapterNumber);
        setPrevChapter(prevChapterData.data);
      }
      
      
    };

    const handleFavoriteClick = () => {
      
      if (!user) {
        alert("Please login to like this chapter");
        return;
      }
      if (is_like === true) {
        LikeService.unlikeChapter(chapter.id)
          .then((response) => {
            setIsLike(false);
            setLikeCount(likeCount - 1);
            
          })
          .catch((error) => { console.error('Error fetching like:', error); });
      } else if (is_like === false){
        LikeService.likeChapter(chapter.id)
          .then((response) => {
            setIsLike(true);
            setLikeCount(likeCount + 1);
            // alert("Like chapter successfully");
          })
          .catch((error) => { console.error('Error fetching like:', error); });
      }
    }

    

    const handleClickNextChapter = () => {
      if (nextChapter.chapterNumber <= totalChapter) {
        scrollToChapterTitle();
        setChapter(nextChapter);
        chapterNumber++;
        loadAdjacentChapters(totalChapter);
        
        navigate(paths.chapter(slug, nextChapter.chapterNumber))
      } else {
        console.log(chapterNumber+1 < totalChapter);
      }
    }
    
    const handleClickPrevChapter = () => {
      if (prevChapter.chapterNumber > 0) {
        scrollToChapterTitle();
        setChapter(prevChapter);
        chapterNumber--;
        loadAdjacentChapters(totalChapter);  
        
        navigate(paths.chapter(slug, prevChapter.chapterNumber))
      }else {
        console.log(chapterNumber, totalChapter);
      }
    }
    

  const scrollToChapterTitle = () => {
    if (seriesReaderRef.current && seriesReaderRef.current.chapterTitleRef) {
        seriesReaderRef.current.chapterTitleRef.scrollIntoView({ behavior: 'smooth' });
    }
  };
  


  const toggleMarker = (index) => {
    console.log(index);
    if (marker && marker.paragraphIndex === index) {
      MarkerService.deleteMarker(marker.id)
    } else {
      setMarker({ 
        paragraphIndex: index 
      });
      MarkerService.createMarker({
        chapterId: chapter.id,
        paragraphIndex: index
      });

    }
  };




  return (
    <div>  
      {(series && chapter && is_like !== null) ? (
        <div>
          <ChapterConfig 
            seriesId={series.id}
            showSettings={showSettings} 
            setShowSettings={setShowSettings} 
            chapter={chapter}
            totalChapter={totalChapter}
            currentChapterNumber={chapterNumber}
            handleClickNextChapter={handleClickNextChapter}
            handleClickPrevChapter={handleClickPrevChapter}
            lineSpacing={lineSpacing}
            setLineSpacing={setLineSpacing}
            backgroundColor={backgroundColor}
            setBackgroundColor={setBackgroundColor}
            fontSize={fontSize}
            setFontSize={setFontSize}
          />
          <Stack direction="column" style={{ marginBottom: '10px', alignItems: 'center'}}>
            <SeriesThumbnail src={series.cover} size={1} />
            <Typography variant="h5" sx={{ marginTop: "10px"}}>{series.title}</Typography>
            <Typography variant="h6">by {series.author.username}</Typography>
            <hr />
          </Stack>

        
          <div className="chapter-info" style={{
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '10px',
                alignItems: 'center',
            }}>

                {/* Row 2 */}
                <div style={{ marginBottom: '10px' }}>
                  <h2>{chapter.title}</h2>
                </div>

                {/* Row 3 */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                    <Visibility style={{ fontSize: '18px' }} />
                    <p style={{ marginLeft: '5px' }}>
                      {chapter.viewCount ? " " + chapter.viewCount : 0}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {is_like ? (
                      <FavoriteOutlined style={{ fontSize: '18px' }} onClick={handleFavoriteClick}/>
                    ) : (
                      <FavoriteBorderOutlined style={{ fontSize: '18px' }} onClick={handleFavoriteClick}/>
                    )}
                    <p style={{ marginLeft: '5px' }}>
                      {likeCount ? " " + likeCount : 0}
                    </p>
                  </div>
                </div>
              </div>

      
        <div style={{ backgroundColor: backgroundColor, fontSize: fontSize }} className="container">
          <ContentRender
            chapterContent={chapter.content}
            lineSpacing={lineSpacing}
            marker={marker}
            toggleMarker={toggleMarker}
          />
        </div>


        <div className="container" style={{ display: 'flex', flexDirection: 'row' }}>
        {/* Comment Section */}
        <div style={{ flex: 1 }}>
          <CommentSection chapterId={chapter.id} comments={chapter.comments} />
        </div>
        {/* Similar Series */}
    
      </div>
  
      </div>
        ) : (
          <div>
            Loading...
          </div>
        )}
      
    </div>
  );
};


export default ChapterDetail;
