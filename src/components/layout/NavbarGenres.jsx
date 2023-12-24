/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import "../../styles/NavbarGenres.css"; // Import your CSS file
import utils from "../../commons/utils";
import { ArrowDownward, ArrowDropDown, CallToActionOutlined, DirectionsRounded, GirlOutlined, TransgenderOutlined } from "@mui/icons-material";
import { Nav } from "react-bootstrap";
import paths from "../../commons/paths";


const NavbarGenres = ({ genres }) => {
  const GENRE_NAME_TO_ICON = {
    "ACTION": "https://www.scribblehub.com/genreimg/action.png",
    "ADULT": "https://www.scribblehub.com/genreimg/adult.png",
    "ADVENTURE": "https://www.scribblehub.com/genreimg/adventure.png",
    "BOYS_LOVE": "https://www.scribblehub.com/genreimg/boys-love.png",
    "COMEDY": "https://www.scribblehub.com/genreimg/comedy.png",
    "DRAMA": "https://www.scribblehub.com/genreimg/drama.png",
    "DOUJINSHI": "https://www.scribblehub.com/genreimg/doujinshi.png",
    "ECCHI": "https://www.scribblehub.com/genreimg/ecchi.png",
    "FANTASY": "https://www.scribblehub.com/genreimg/fantasy.png",
    "FANFICTION": "https://www.scribblehub.com/genreimg/fanfiction.png",
    "HORROR": "https://www.scribblehub.com/genreimg/horror.png",
    "GAME": "https://www.scribblehub.com/genreimg/game.png",
    "GENDER_BENDER": "https://www.scribblehub.com/genreimg/gender-bender.png",
    "GIRLS_LOVE": "https://www.scribblehub.com/genreimg/girls-love.png",
    "HAREM": "https://www.scribblehub.com/genreimg/harem.png",
    "HISTORICAL": "https://www.scribblehub.com/genreimg/historical.png",
    "ISEKAI": "https://www.scribblehub.com/genreimg/isekai.png",
    "JOSEI": "https://www.scribblehub.com/genreimg/josei.png",
    "LITRPG": "https://www.scribblehub.com/genreimg/litrpg.png",
    "MARTIAL_ARTS": "https://www.scribblehub.com/genreimg/martial-arts.png",
    "MATURE": "https://www.scribblehub.com/genreimg/mature.png",
    "MECHA": "https://www.scribblehub.com/genreimg/mecha.png",
    "PSYCHOLOGICAL": "https://www.scribblehub.com/genreimg/psychological.png",
    "SCHOOL_LIFE": "https://www.scribblehub.com/genreimg/school-life.png",
    "SEINEN": "https://www.scribblehub.com/genreimg/seinen.png",
    "SHOUNEN": "https://www.scribblehub.com/genreimg/shounen.png",
    "SHOUJO": "https://www.scribblehub.com/genreimg/shoujo.png",
    "SCI_FI": "https://www.scribblehub.com/genreimg/sci-fi.png",
    "SLICE_OF_LIFE": "https://www.scribblehub.com/genreimg/slice-of-life.png",
    "SPORTS": "https://www.scribblehub.com/genreimg/sports.png",
    "SUPERNATURAL": "https://www.scribblehub.com/genreimg/supernatural.png",
    "TRAGEDY": "https://www.scribblehub.com/genreimg/tragedy.png",
    "MYSTERY": "https://www.scribblehub.com/genreimg/mystery.png",
    "ROMANCE": "https://www.scribblehub.com/genreimg/romance.png",

    "THRILLER": "https://www.scribblehub.com/genreimg/thriller.png",
    "WESTERN": "https://www.scribblehub.com/genreimg/western.png",
    "XIANXIA": "https://www.scribblehub.com/genreimg/xianxia.png",
    "XUANHUAN": "https://www.scribblehub.com/genreimg/xuanhuan.png",
    "YAOI": "https://www.scribblehub.com/genreimg/yaoi.png",
    "YURI": "https://www.scribblehub.com/genreimg/yuri.png",
  };

  
  const [showGenres, setShowGenres] = useState(false);
  const genresRef = useRef(null);


  useEffect(() => {
    if (showGenres) {
      // animateGenres();
    }
  }, [showGenres]);


  const toggleGenres = () => {
    setShowGenres(!showGenres);
  };




  const animateGenres = () => {
    const genreBubbles = genresRef.current.childNodes;
    const columns = 7; // Number of columns in the grid
    let delay = 0; // Delay between animations

    genreBubbles.forEach((bubble, index) => {

      setTimeout(() => {
        bubble.style.transition = "opacity 1s ease"; // Apply fade-in transition
        bubble.style.opacity = 1; // Fade in
      }, delay);

    });
  };

  return (
      <Nav.Item className="genres-header" onClick={toggleGenres} >
          Thể loại <ArrowDropDown/>
          {showGenres && (
            <div  className="genres-overlay" onClick={toggleGenres}>
              <div ref={genresRef} className="genres-content">
                {genres.map((genre, index) => (
                  <div key={index} className="genre-item" onClick={() => window.location.href=paths.searchByGenre(genre.toLowerCase())}>
                    <div className="genre-bubble" style={{zIndex: "2"}}>
                      <img src={GENRE_NAME_TO_ICON[genre]} style={{
                        objectFit: "cover",
                      }} />
                    </div>
                    {utils.genre_name_mapper[genre]}
                  </div>
              ))}
              </div>
            </div>
          )}
      </Nav.Item>
      
  );
};



export default NavbarGenres;