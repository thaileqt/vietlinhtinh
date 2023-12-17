import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Tab,
  Tabs,
} from '@mui/material';
import TabEditDetail from '../../components/tabs/TabEditDetail';
import { useParams } from 'react-router-dom';
import SeriesService from '../../services/series.service';

const EditSeries = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [series, setSeries] = useState(null); // Series details will be stored here
  const { slug } = useParams();
  
  
  useEffect(() => {
    SeriesService.getSeriesBySlug(slug)
      .then((response) => {
        console.log(response.data)
        setSeries(response.data);
      })
      .catch((error) => {
        console.error('Error fetching series details:', error);
      });
  }, [slug]);


  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };


  return (
    <Container maxWidth="md">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="series edit tabs">
          <Tab label="Details" />
          <Tab label="Table of Contents" />
        </Tabs>
      </Box>
      {tabIndex === 0 && (
        <Box>
            {series && (<TabEditDetail series={series}/>)}
          {/* Details tab content */}
          {/* Your form fields for thumbnail, title, description, genres, and status */}
        </Box>
      )}
      {tabIndex === 1 && (
        <Box>
          {/* Table of Contents tab content */}
          {/* Your table of contents related content */}
        </Box>
      )}

    </Container>
  );
};

export default EditSeries;
