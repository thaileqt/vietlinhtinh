import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Rating,
  List, ListItemSecondaryAction, ListItemAvatar
} from '@mui/material';
import { ListItem, ListItemText } from "@mui/material";
import PropTypes from 'prop-types';
import SeriesThumbnail from '../avatar/SeriesThumbnail';
import paths from '../../commons/paths';

const SimilarSeries = ({ seriesList }) => {
  return (
    <div style={{
      marginTop: "20px",
      border: '1px solid #e0e0e0',
      borderRadius: "4px",
      backgroundColor: 'rgb(250, 250, 250, 0.8))',
    }}>
      <h6 style={{
        padding: '7px',
        borderBottom: '1px solid #e0e0e0',
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'black',
      }}>Truyện tương tự (developing)</h6>
      
      {seriesList.map((series, index) => (
          <ListItem key={index} alignItems="flex-start" >
            <ListItemAvatar sx={{paddingRight: "10px"}}
                              onClick={() => {window.location.href = paths.series(series.slug)}}>
              <SeriesThumbnail src={series.cover} size={0.6} shadow={false} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography component="span" variant="body1"
                onClick={() => {
                  window.location.href = paths.series(series.slug);
                }}
                // style on hover change title color
                sx={{
                  "&:hover": {
                    color: "#1976d2",
                    cursor: "pointer",
                  },
                }}
                >
                  {series.title}
              </Typography> 
                
              }
              secondary={
                <Typography variant="body2" color="text.secondary">
                   {series.user.username}
                </Typography>
              } />
            </ListItem>

      ))}
    </div>
  );
};

SimilarSeries.propTypes = {
  seriesList: PropTypes.array.isRequired,
};

export default SimilarSeries;
