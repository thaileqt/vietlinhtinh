import default_cover from "../../assets/default_cover.jpeg";
import PropTypes from "prop-types";



const SeriesThumbnail = ({ src, size, borderRadius, shadow, width, height }) => {
  SeriesThumbnail.propTypes = {
    src: PropTypes.string,
    size: PropTypes.number,
    borderRadius: PropTypes.number,
    shadow: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
  };
    // size is from 1 - 10
    
    const w = size ? 50*size : (width ? width : 100);
    const h = size ? w * 1.5 : (height ? height : 150);

    return (
             <img
              src={src ? src : default_cover}
              alt="Cover"
              className="img-fluid"
              style={{
                width:  `${w}px`,
                height: `${h}px`,
                objectFit: "cover",
                borderRadius: borderRadius ? `${borderRadius}px` : "0px",
                boxShadow: shadow ? "0px 0px 10px 0px rgba(0, 0, 0, 0.9)" : "none",
              }}
            />
        );  
    }
export default SeriesThumbnail;