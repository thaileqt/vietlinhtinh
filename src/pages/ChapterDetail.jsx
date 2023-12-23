import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
// Compoenents
import CommentSection from '../components/chapter/CommentSection';
import ContentRender from '../components/chapter/ContentRender';
import { CommentOutlined, FavoriteBorderOutlined, FavoriteOutlined, Visibility } from '@mui/icons-material';
import SeriesThumbnail from '../components/avatar/SeriesThumbnail';
import ChapterConfig from '../components/chapter/ChapterConfig';
// Services
import SeriesService from '../services/series.service';
import ChapterService from '../services/chapter.service';
// import MarkerService from '../services/marker.service';
import LikeService from '../services/like.service';
import AuthService from '../services/auth.service';

import paths from '../commons/paths';
import { CircularProgress, Stack, Typography } from '@mui/material';
import MyBreadcrumb from '../components/layout/Breadcrumb';




const ChapterDetail = () => {
    const user = AuthService.getCurrentUser();
    let { slug, chapterNumber } = useParams(); // Get the ID parameter from the URL
    
    const [chapter, setChapter] = useState(null);
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
      ChapterService.getChapterAndAdjacentChapters(slug, chapterNumber)
        .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].chapterNumber === parseInt(chapterNumber)) {
                    setChapter(response.data[i]);
                    setLikeCount(response.data[i].likeCount);
                    setCommentCount(response.data[i].comments.length);
                } else if (response.data[i].chapterNumber === parseInt(chapterNumber) + 1) {
                    setNextChapter(response.data[i]);
                } else if (response.data[i].chapterNumber === parseInt(chapterNumber) - 1) {
                    setPrevChapter(response.data[i]);
                }
            }
        }) 
        .catch((error) => { console.error('Error fetching chapter details:', error); });

        LikeService.isChapterLiked(slug, chapterNumber)
        .then((response) => {
            setIsLike(response.data);
        })
        .catch((error) => { console.error('Error fetching like:', error); });
          
        ChapterService.countTotalChapters(slug)
        .then((response) => { 
          setTotalChapter(response.data); 
        })
        .catch((error) => { console.error('Error fetching total chapter:', error); });
      }, [slug, chapterNumber]);


    const handleFavoriteClick = () => {
      if (!user) {
        alert("Please login to like this chapter");
        return;
      }
      if (is_like === true) {

        setIsLike(false);
        setLikeCount(likeCount - 1);
        LikeService.unlikeChapter(chapter.id)
          .catch((error) => { 
            console.error('Error fetching like:', error); 
            setIsLike(true);
            setLikeCount(likeCount + 1);
        });
      } else if (is_like === false){
        setLikeCount(likeCount + 1);
        setIsLike(true);
        LikeService.likeChapter(chapter.id)
          .catch((error) => { 
            console.error('Error fetching like:', error); 
            setLikeCount(likeCount - 1);
            setIsLike(false);
        });
      }
    }


    

    const handleClickNextChapter = () => {
      if (nextChapter.chapterNumber <= totalChapter) {
        scrollToChapterTitle();
        const tempChapter = chapter;
        setChapter(nextChapter);
        setNextChapter(null);
        setPrevChapter(tempChapter);
        setLikeCount(nextChapter.likeCount);
        setCommentCount(nextChapter.comments.length);
        
        chapterNumber++;
        navigate(paths.chapter(slug, nextChapter.chapterNumber))
        
        ChapterService.getChapterAndAdjacentChapters(slug, chapterNumber)
            .then((response) => {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].chapterNumber === parseInt(chapterNumber) + 1) {
                        setNextChapter(response.data[i]);
                    } else if (response.data[i].chapterNumber === parseInt(chapterNumber) - 1) {
                        setPrevChapter(response.data[i]);
                    }
                }
            }
        );
      } else {
        console.log(chapterNumber+1 < totalChapter);
      }
    }
    
    const handleClickPrevChapter = () => {
      if (prevChapter.chapterNumber > 0) {
        
        scrollToChapterTitle();
        setChapter(prevChapter);
        setNextChapter(null);
        setLikeCount(prevChapter.likeCount);
        setCommentCount(prevChapter.comments.length);
        chapterNumber--;
        navigate(paths.chapter(slug, prevChapter.chapterNumber))
        setPrevChapter(null);
        ChapterService.getChapterAndAdjacentChapters(slug, chapterNumber)
            .then((response) => {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].chapterNumber === parseInt(chapterNumber)) {
                        setChapter(response.data[i]);
                        setLikeCount(response.data[i].likeCount);
                        setCommentCount(response.data[i].comments.length);
                    } else if (response.data[i].chapterNumber === parseInt(chapterNumber) + 1) {
                        setNextChapter(response.data[i]);
                    } else if (response.data[i].chapterNumber === parseInt(chapterNumber) - 1) {
                        setPrevChapter(response.data[i]);
                    }
                }
            }
        );
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
    // if (marker && marker.paragraphIndex === index) {
    //   MarkerService.deleteMarker(marker.id)
    // } else {
    //   setMarker({ 
    //     paragraphIndex: index 
    //   });
    //   MarkerService.createMarker({
    //     chapterId: chapter.id,
    //     paragraphIndex: index
    //   });

    // }
  };




  return (
    <div style={{ minHeight: "100vh" }}>  
      {(chapter && is_like !== null) ? (
        <div>
          <MyBreadcrumb items={[chapter.series.title, chapter.title]}  />
          <ChapterConfig 
            seriesId={chapter.series.id}
            showSettings={showSettings} 
            setShowSettings={setShowSettings} 
            chapter={chapter}
            totalChapter={totalChapter}
            currentChapter={chapterNumber}
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
            <SeriesThumbnail src={chapter.series.cover} size={1} />
            <Typography variant="h5" sx={{ marginTop: "10px"}}>{chapter.series.title}</Typography>
            <Typography variant="h6">by {chapter.series.author.username}</Typography>
            <hr />
          </Stack>

        
          <div className="chapter-info" style={{
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '10px',
                alignItems: 'center',
            }}>

                  <h2>{chapter.title}</h2>

                {/* Row 3 */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: "20px"}}>
                  <div style={{ display: 'flex', alignItems: 'center', margin: "0 10px"}}>
                    <Visibility style={{ fontSize: '18px', margin: "0 5px" }} />
                      {chapter.viewCount ? chapter.viewCount : 0}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', margin: "0 10px" }}>
                    {is_like ? (
                      <FavoriteOutlined style={{ fontSize: '18px', margin: "0 5px" }} onClick={handleFavoriteClick}/>
                    ) : (
                      <FavoriteBorderOutlined style={{ fontSize: '18px', marginRight: "5px"  }} onClick={handleFavoriteClick}/>
                    )}
                      {likeCount ? likeCount : 0}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', margin: "0 10px"}}>
                    <CommentOutlined style={{ fontSize: '18px', margin: "0 5px" }} />
                      {chapter.comments.length ? chapter.comments.length : 0}
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
          <CircularProgress />
        )}
      
    </div>
  );
};


export default ChapterDetail;
