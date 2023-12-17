import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import UserService from '../../services/user.service';
import utils from '../../commons/utils';
import SeriesService from '../../services/series.service';

export default function AddSeriesPage() {
  
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genres, setGenres] = useState(null);
  const [thumbnailSource, setThumbnailSource] = useState('local'); // State to manage the selected thumbnail source
  const [selectedGenres, setSelectedGenres] = useState([]); // list of string ["name1", "name2"

  const handleThumbnailChange = (event) => {
    setThumbnailSource(event.target.value);
  };

  useEffect(() => {
    UserService.getGenres()
      .then((response) => {
        // response.data: list of genre objects [{id: 1, name: "name1"}, {id: 2, name: "name2"}]
        // convert list of genre objects to list of genre names
        const genreNames = response.data.map((genre) => genre.name);
        setGenres(genreNames); // 20 genre names
      })
      .catch((error) => {
        console.error('Error fetching series details:', error);
      });
  }, []);


  const handleGenreChange = (event) => {
    const selectedGenre = event.target.name;
    // append or remove selected genre from selectedGenres
    if (selectedGenres.includes(selectedGenre)) {
      setSelectedGenres(selectedGenres.filter((genre) => genre !== selectedGenre));
    } else {
      setSelectedGenres([...selectedGenres, selectedGenre]);
    }
  };

  const handlePreloadThumbnail = (event) => {
    // Logic to preload thumbnail
    // For example:
    // setPreloadThumbnail(event.target.value);
  };


  const handleSave = () => {
    // Handle save logic here
    const data = {
      title: title,
      description: description,
      genres: selectedGenres,
      cover: thumbnail,
    }
    console.log(data)
    SeriesService.addSeries(data)
      .then((response) => {
        console.log(response.data);
        // navigate to series edit page
        console.log(response.data)
        window.location.href = `/compose/all-chapter/${response.data.slug}`;
      })
      .catch((error) => {
        console.error('Error fetching series details:', error);
      });
  };

  const renderGenres = () => {
    const rows = [];
    if (genres === null) return null;
    for (let i = 0; i < genres.length; i += 4) {
  
      rows.push(
        <Grid key={`row_${i}`} container spacing={2}>
          {genres.slice(i, i + 4).map((genre) => (
            <Grid key={genre} item xs={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedGenres.includes(genre)}
                    onChange={handleGenreChange}
                    name={genre}
                  />
                }
                label={utils.genre_name_mapper[genre]}
                sx={{ fontSize: '0.8rem' }}
              />
            </Grid>
          ))}
        </Grid>
      );
    }
    return rows;
  };

  return (
    <Container maxWidth="md">

      <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        {/* Left column: Preloaded thumbnail */}
        <Box flex="0 0 auto">
          {/* Display the preloaded thumbnail */}
          <Avatar
            alt="Preloaded Thumbnail"
            src={'/static/images/avatar/1.jpg'}
            variant="square"
            sx={{ width: 200, height: 300 }} // Custom styling for rectangular Avatar
          />
        </Box>
        {/* Right column: Options to load thumbnail */}
        <Box flex="1 1 auto" pl={2}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">Thumbnail</FormLabel>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <RadioGroup
                aria-label="thumbnailSource"
                name="thumbnailSource"
                value={thumbnailSource}
                onChange={handleThumbnailChange}
              >
                <FormControlLabel
                  value="local"
                  control={<Radio />}
                  label="Load from local disk"
                />
                {thumbnailSource === 'local' && (
                  <Box display="flex" alignItems="center">
                    <input type="file" accept="image/*" onChange={handlePreloadThumbnail} />
                    <Button variant="outlined" color="primary" sx={{ marginLeft: 1 }}>Choose file</Button>
                  </Box>
                )}
                <FormControlLabel
                  value="url"
                  control={<Radio />}
                  label="URL from internet"
                />
                {thumbnailSource === 'url' && (
                  <TextField
                    label="Thumbnail URL"
                    variant="outlined"
                    // Add necessary state and event handling here
                    onChange={(e) => setThumbnail(e.target.value)}
                  />
                )}
              </RadioGroup>
            </FormControl>
          </FormControl>
        </Box>
      </Box>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
          />
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            multiline
            rows={4}
          />
        </FormControl>
        <FormControl component="fieldset" fullWidth sx={{ marginBottom: 2 }}>
          <FormLabel component="legend">Genres</FormLabel>
          <FormGroup>
            {renderGenres()}
          </FormGroup>
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
        
         
        </FormControl>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save Changes
        </Button>
      </Box>
    </Container>
  );
}
