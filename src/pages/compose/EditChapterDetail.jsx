import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Container,
    Rating,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import SeriesService from '../../services/series.service';
import ChapterService from '../../services/chapter.service';
import paths from '../../commons/paths';
import SeriesThumbnail from '../../components/avatar/SeriesThumbnail';
import MyBreadcrumb from '../../components/layout/Breadcrumb';
import Genre from '../../components/misc/Genre';

const EditChapterDetail = () => {
    // Sample series details (replace this with your actual data)
    const { slug, chapterNumber } = useParams();

    const [series, setSeries] = useState(null);
    const [chapter, setChapter] = useState(null);
    const [editedContent, setEditedContent] = useState(null);
    const [editedTitle, setEditedTitle] = useState(null);

    useEffect(() => {
        SeriesService.getSeriesBySlug(slug)
                .then((response) => {
                        setSeries(response.data);
                })
                .catch((error) => {
                        console.error('Error fetching series details:', error);
                });
        ChapterService.getChapterBySeriesSlugAndChapterNumber(slug, chapterNumber)
                .then((response) => {
                        setChapter(response.data);
                        setEditedTitle(response.data.title);
                        setEditedContent(response.data.content);
                        console.log(response.data);
                })
                .catch((error) => {
                        console.error('Error fetching chapter details:', error);
                });
        }, [slug, chapterNumber]);

    // State for the chapter title and content

    const handleTitleChange = (event) => {
        setEditedTitle(event.target.value)
    };

    const handleContentChange = (event) => {
        // split the content, if content is empty then skip
        setEditedContent(event.target.value)
    };

    const handleSaveDraft = () => {
        ChapterService.editChapter(slug, chapterNumber, {
            seriesId: chapter.seriesId,
            chapterNumber: chapter.chapterNumber,
            title: editedTitle,
            content: editedContent,
            chapterState: "DRAFT",
            seriesSlug: chapter.seriesSlug
        })
        .then((response) => {
            console.log(response.data);
        })
    }

    const handlePublish = () => {
        // split the content, if content is empty then skip
        // remove any element that is empty
        ChapterService.editChapter(slug, chapterNumber, {
            seriesId: chapter.seriesId,
            chapterNumber: chapter.chapterNumber,
            title: editedTitle,
            content: editedContent,
            chapterState: "PUBLISHED",
            seriesSlug: chapter.seriesSlug
        })
        .then((response) => {
            console.log(response.data);
        })
    }

    return (
        <div style={{minWidth: "100vh"}}>
        {chapter && series &&
            <>

            <MyBreadcrumb items={[series.title, chapter.title]} />
            <header style={{
                fontSize: "0.9rem", 
                // darker than white
                backgroundColor: "#f5f5f5",
                // padding top
                paddingTop: "1rem",
                paddingBottom: "0.5rem",
            }}>
                <div className="container">
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
                </div>
            </header>

            <div className="container">

            {/* Container 2 - Edit Chapter Title and Content */}
            <Box sx={{ width: '100%' }}>
                <Typography variant="h6" gutterBottom>
                    Edit Chapter
                </Typography>
                <TextField
                    fullWidth
                    label="Chapter Title"
                    variant="outlined"
                    value={editedTitle}
                    onChange={handleTitleChange}
                    sx={{ marginBottom: '1rem' }}
                />
                <TextField
                    fullWidth
                    label="Chapter Content"
                    multiline
                    minRows={10}
                    variant="outlined"
                    value={editedContent}
                    onChange={handleContentChange}
                />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem 1rem'}}>
                <Link to={paths.compose.allChapter(slug)}><Button variant="contained" color="primary" onClick={handleSaveDraft}>
                    Lưu nháp
                </Button></Link>
                <Link to={paths.compose.allChapter(slug)}><Button variant="contained" color="secondary" onClick={handlePublish}>
                    Đăng 
                </Button></Link>
            </Box>

            </div>
            </>
}
        </div>
  );
};

export default EditChapterDetail;
