import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/AddChapter.css'; // Import CSS for styling
import ChapterService from '../../services/chapter.service';
import paths from '../../commons/paths';

import {
  Typography,
  Stack,
  TextField,
  Divider,
  Button,
  Container,
} from "@mui/material";

import Paper from "@mui/material/Paper";
import Toolbar from "../../components/compose/Toolbars";
import Poll from '../../components/compose/Poll';
import SeriesService from '../../services/series.service';
import TransparentButton from '../../components/button/TransparentButton';
import CustomButton from '../../components/button/CustomButton';

const AddChapter = () => {
  const { slug } = useParams(); // Get series slug from URL params
  const [chapterData, setChapterData] = useState({
    title: '',
    content: '',
    seriesSlug: slug,
    status: 'draft', // Add status field with initial value as 'draft'
  });
  const [series, setSeries] = useState(null); // Add series state
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChapterData({
      ...chapterData,
      [name]: value,
    });
  };

  useEffect(() => {
    SeriesService.getSeriesBySlug(slug)
      .then((response) => {
        setSeries(response.data);
      })
      .catch((error) => {
        console.error('Error fetching series details:', error);
      });
  }, [slug]);
        

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setError('');
    console.log(chapterData)

    ChapterService.addChapter(chapterData)
      .then(() => {
        window.location.href = paths.compose.allChapter(slug);
      })
      .catch((error) => {
        setIsSubmitting(false);
        setError('Error adding chapter. Please try again.');
        console.error('Error adding chapter:', error);
      });
  };

  return (
    <Container>
      {series && (
        <Stack direction="column">
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          bgcolor: "rgb(233, 233, 233, 0.5)",
          padding: "15px",
          marginBottom: "30px",
        }}
      >
        <img
          src={series.cover}
          style={{ width: "100px", height: "142px", objectFit: "cover" }}
        />
        <Stack
          direction="column"
          flexGrow={1}
          justifyContent="center"
          pl={2} // Left padding to create space between image and text
        >
          <Typography variant="h6" textAlign="left">
            {series.title}
          </Typography>
          <Typography variant="subtitle2" textAlign="left">
            by {series.author.username}
          </Typography>


          <Divider flexItem sx={{ my: 1, width: "100%" }} />
          <Typography variant="body1" textAlign="left">
            Total chapters: 32
          </Typography>


          <Stack direction="row" spacing={1} justifyContent="right">
            <TransparentButton name="Save Draft" color="rgb(100, 0, 50)" />
            <TransparentButton name="Publish" invert={true} color="rgb(100, 0, 50, 0.9)" textColor="white" size={1} />
          </Stack>
        </Stack>
      </Paper>


      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          flexDirection: "row",
          alignItems: "center",
          bgcolor: "rgb(233, 233, 233, 0.5)",
          padding: "15px",
          marginBottom: "30px",
        }}
      >
        <Stack direction="column" textAlign="left">
          <Typography padding="15px 0">
            <strong>Title</strong>
          </Typography>
          <TextField id="outlined-basic" variant="outlined" />


          <div style={{ padding: "15px 0" }}>
            <Poll />
          </div>


          <Typography padding="15px 0">
            <strong>Chapter</strong>
          </Typography>


          <Stack direction="column">
            <Paper
              elevation={5}
              sx={{ backgroundColor: "rgb(233, 233, 233, 0.5)" }}
            >
              <Toolbar />
              <TextField
                id="outlined-basic"
                variant="outlined"
                multiline
                rows={10}
                fullWidth
              />
            </Paper>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
      )}
    
    </Container>
  );
};

export default AddChapter;
