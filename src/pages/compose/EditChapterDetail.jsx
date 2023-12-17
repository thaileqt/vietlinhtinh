import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import SeriesService from '../../services/series.service';
import ChapterService from '../../services/chapter.service';
import paths from '../../commons/paths';
import SeriesThumbnail from '../../components/avatar/SeriesThumbnail';

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
        (chapter && series &&
            <Container maxWidth="lg">
            {/* Container 1 - Series Details */}
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                {/* Series Cover */}
                <Box sx={{ width: '30%', marginRight: '2rem' }}>
                    <SeriesThumbnail src={series.cover} />
                </Box>
                {/* Title and Author */}
                <Box sx={{ width: '70%' }}>
                    <Typography variant="h4" gutterBottom>
                        {series.title}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        {series.author ? series.author.name : "asd"}
                    </Typography>
                </Box>
            </Box>

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

        </Container>
        )
        
  );
};

export default EditChapterDetail;
