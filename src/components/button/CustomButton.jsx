import { Button } from "@mui/material";
import PropTypes from 'prop-types';

CustomButton.propTypes = {
    name: PropTypes.string.isRequired,
    icon: PropTypes.object,
    color: PropTypes.string,
    borderColor: PropTypes.string,
    borderRadius: PropTypes.string,
    fontSize: PropTypes.string,
    padding: PropTypes.string,
    onClick: PropTypes.func,
};


export default function CustomButton({ 
  name, 
  icon, 
  color = "transparent", 
  borderColor="info.main", 
  borderRadius="1px",
  fontSize="0.8rem", 
  padding="0.2rem 0.5rem", 
  onClick }) {
  return (
    <div>
      <Button
        variant="outlined"
        onClick={onClick}
        sx={{ backgroundColor: color, 
            textTransform: 'none',
            borderColor: borderColor, 
            mx: 1, 
            fontSize: fontSize, 
            padding: padding,
            borderRadius: borderRadius,
            // add hover effect, display shadow when hover, the color will be a little bit darker
            '&:hover': {
              boxShadow: 1,
              backgroundColor: color,
              opacity: 0.8,
            },
          }}
        >
            {icon && icon}  {name}
        </Button>
    </div>
  );
}