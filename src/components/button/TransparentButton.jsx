import { Button } from "@mui/material";
import PropTypes from 'prop-types';

TransparentButton.propTypes = {
    name: PropTypes.string.isRequired,
    icon: PropTypes.object,
    color: PropTypes.string,
    borderRadius: PropTypes.string,
    fontSize: PropTypes.string,
    padding: PropTypes.string,
    onClick: PropTypes.func,
};


export default function TransparentButton({ 
  name, 
  icon, 
  color="info.main", 
  borderRadius="1px",
  fontSize="0.8rem", 
  padding="0.2rem 0.5rem", 
  onClick }) {
  return (
    <div>
      <Button
        variant="outlined"
        onClick={onClick}
        sx={{ backgroundColor: "transparent", 
            color: color,
            textTransform: 'none',
            borderColor: color, 
            mx: 1, 
            fontSize: fontSize, 
            padding: padding,
            borderRadius: borderRadius,
            // add hover effect, display shadow when hover, the color will be a little bit darker
            '&:hover': {
              boxShadow: 1,
              backgroundColor: "transparent",
              opacity: 0.8,
            },
          }}
        >
            {icon && icon}  {name}
        </Button>
    </div>
  );
}