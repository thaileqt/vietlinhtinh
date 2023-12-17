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
import PropTypes from 'prop-types';



const TabEditDetail = ({series}) => {
    TabEditDetail.propTypes = {
        series: PropTypes.object.isRequired
    }
  const [thumbnail, setThumbnail] = useState(series.cover);
  const [title, setTitle] = useState(series.title);
  const [description, setDescription] = useState(series.description);
  const [seriesGenres, setSeriesGenres] = useState(series.genres); // list of string ["name1", "name2"]
  const [genres, setGenres] = useState(null); // 
  const [state, setState] = useState(series.seriesState);
  const [thumbnailSource, setThumbnailSource] = useState('local'); // State to manage the selected thumbnail source
  const [internetThumbnail, setInternetThumbnail] = useState(series.cover || ''); // State for preloading thumbnail

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
    setSeriesGenres((prevGenres) =>
      prevGenres.includes(selectedGenre)
        ? prevGenres.filter((genre) => genre !== selectedGenre)
        : [...prevGenres, selectedGenre]
    );
  };

  const handleInternetThumbnail = (event) => {
    // Logic to preload thumbnail
    // For example:
    setInternetThumbnail(event.target.value);
  };


  const handleSave = () => {
    // Handle save logic here
    const newSeries = {
      cover: thumbnailSource === 'local' ? thumbnail : internetThumbnail,
      title: title,
      description: description,
      genres: seriesGenres,
      seriesState: state,
    }
    SeriesService.editSeries(series.slug, newSeries)
      .then((response) => {
        console.log(response.data);
        // reload the page
        window.location.href = `/compose/all-chapter/${series.slug}`;
      })
      .catch((error) => {
        console.error('Error sending review:', error);
      }
    );
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
                    checked={seriesGenres.includes(genre)}
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
            src={thumbnail ? thumbnail : '/static/images/avatar/1.jpg'}
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
                    <input type="file" accept="image/*" onChange={handleThumbnailChange} />
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
                    onChange={handleInternetThumbnail}
                    // Add necessary state and event handling here
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
          <FormLabel component="legend">Status</FormLabel>
          <TextField
            select
            value={state}
            onChange={(e) => setState(e.target.value)}
            variant="outlined"
            SelectProps={{ native: true }}
          >
            <option value="Ongoing">Ongoing</option>
            <option value="Dropped">Dropped</option>
          </TextField>
        </FormControl>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save Changes
        </Button>
      </Box>
    </Container>
  );
};

export default TabEditDetail;
