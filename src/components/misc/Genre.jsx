import PropTypes from 'prop-types';
import utils from '../../commons/utils';




const Genre = ({ 
  name, 
  size, 
  color="black", 
  backgroundColor="rgb(212, 212, 212)", 
  border="1px solid rgb(191, 191, 191)",
  borderRadius="3px" ,
  margin='0px 10px 3px 0px',
  padding='2px 4px',
}) => {
  Genre.propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.string,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    borderRadius: PropTypes.string,
    border: PropTypes.string,
    margin: PropTypes.string,
    padding: PropTypes.string,
  };
  // You can define different background colors based on genre if needed
  const getBackgroundColor = (genreName) => {
    switch (genreName) {
      case 'ACTION':
        return '#ff9999';
      case 'ADVENTURE':
        return '#99ff99';
      // Add more cases for different genres if required
      default:
        // default super dark 
        return '#333333';
    }
  };

  const genreStyle = {
    border: border,
    padding: padding,
    margin: margin,
    borderRadius: borderRadius,
    // backgroundColor: getBackgroundColor(name.toUpperCase()), // Set background color based on genre name
    backgroundColor: backgroundColor ? backgroundColor : getBackgroundColor(name ? name.toUpperCase() : "Unknown"),
    color: color,
    // fit the content
    display: 'inline-block',
    // if size exist then set the font size to size, otherwise set it to 0.6rem
    fontSize: size ? size : '0.7rem',
  };

  return (
      <span style={genreStyle}>{utils.genre_name_mapper[name]}</span>
  );
};

Genre.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Genre;
