import { Button } from "@mui/material";
import PropTypes from 'prop-types';

TransparentButton.propTypes = {
    name: PropTypes.string.isRequired,
    icon: PropTypes.object,
    color: PropTypes.string,
    borderRadius: PropTypes.string,
    size: PropTypes.number,
    padding: PropTypes.string,
    onClick: PropTypes.func,
    invert: PropTypes.bool,
    textColor: PropTypes.string,
};


export default function TransparentButton({ 
  name, 
  icon, 
  color="info.main", 
  borderRadius="1px",
  size=1, 
  padding="0.2rem 0.5rem", 
  onClick,
  textColor="rgb(233, 233, 233)",
  invert=false }) {
  return (
    <div>
      <Button
        onClick={onClick}
        sx={{
            color: invert === false ? color : textColor,
            textTransform: 'none',
            borderColor: invert === false ? color : "transparent", 
            mx: 1, 
            fontSize: `${size}rem`, 
            padding: padding,
            borderRadius: borderRadius,
            border: "1px solid",
            backgroundColor: invert === true ? color : "transparent",
            // add hover effect, display shadow when hover, the color will be a little bit darker
            '&:hover': {
              boxShadow: 3,
              backgroundColor: invert === true ? color : "transparent",
              color: invert === true ? textColor : color,
              borderColor: invert === false ? color : "transparent",
            },
          }}
        >
            {icon && icon}  {name}
        </Button>
    </div>
  );
}