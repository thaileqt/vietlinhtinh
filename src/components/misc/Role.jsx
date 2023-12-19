import PropTypes from 'prop-types';
import utils from '../../commons/utils';




const Role = ({ 
  name, 
  size, 
  borderRadius="3px" ,
  margin='0px 10px 3px 0px',
  padding='2px 5px',
}) => {
  Role.propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.string,
    borderRadius: PropTypes.string,
    margin: PropTypes.string,
    padding: PropTypes.string,
  };
  // You can define different background colors based on genre if needed
  const getBackgroundColor = (genreName) => {
    switch (genreName) {
      case 'ROLE_ADMIN':
        return 'rgb(100, 0, 50)';
      // Add more cases for different genres if required
      default:
        // default super dark 
        return 'blue';
    }
  };

  const roleStyle = {
    padding: padding,
    margin: margin,
    borderRadius: borderRadius,
    backgroundColor: getBackgroundColor(name ? name.toUpperCase() : "Unknown"),
    color: "white",
    // fit the content
    display: 'inline-block',
    // if size exist then set the font size to size, otherwise set it to 0.6rem
    fontSize: size ? size : '0.7rem',
    
    
  };
  // take only words after "_"
const roleName = name ? name.split("_")[1] : "Unknown";

  return (
      <span style={roleStyle}>{roleName}</span>
  );
};



export default Role;
