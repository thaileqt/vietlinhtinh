import default_cover from "../../assets/default_cover.jpeg";
import PropTypes from "prop-types";
import "./SeriesThumbnail.css";



const SeriesThumbnail = ({ src, size, borderRadius, shadow, onHover=false, handleImageClick }) => {
  SeriesThumbnail.propTypes = {
    src: PropTypes.string,
    size: PropTypes.number,
    borderRadius: PropTypes.number,
    shadow: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
    onHover: PropTypes.bool,
    handleImageClick: PropTypes.func,
  };
    // size is from 1 - 10

    
    const w = 100 * size
    const h = 142 * size

    return (
             <img
              src={src ? src : default_cover}
              alt="Cover"
              className={ onHover===true ? "img-fluid img-hover" : "img-fluid"}
              style={{
                width:  `${w}px`,
                height: `${h}px`,
                objectFit: "cover",
                borderRadius: borderRadius ? `${borderRadius}px` : "0px",
                boxShadow: shadow ? "0px 0px 10px 0px rgba(0, 0, 0, 0.9)" : "none",
              }}
              onClick={handleImageClick}
            
            />
        );  
    }
export default SeriesThumbnail;