import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { List, ListItem, Grid, ListItemText, ListItemSecondaryAction, Typography, ListItemAvatar } from "@mui/material";
import Genre from "../components/misc/Genre";

import utils from "../commons/utils";
import SeriesService from "../services/series.service";
import SeriesThumbnail from "../components/avatar/SeriesThumbnail";

import paths from "../commons/paths";


export default function SearchByGenreResults() {
  const [series, setSeries] = useState([]);
  const {genre} = useParams()
  const [sortBy, setSortBy] = useState("newest");
const [orderBy, setOrderBy] = useState("asc");
const [status, setStatus] = useState("all");

  useEffect(() => {
    SeriesService.getSeriesByGenre(genre).then(
      (response) => {
        setSeries(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setSeries(_content);
      }
    );
  }, [genre]);

    const handleSortBy = (event) => {
        if (event.target.innerText.toLowerCase() === "Tăng dần") {
            setOrderBy("asc");
            document.getElementById("asc").style.color = "red";

        } else {
            setOrderBy("desc");
            document.getElementById("desc").style.color = "red";
        }
    }

    const handleOrderBy = (event) => {
        if (event.target.innerText.toLowerCase() === "Mới nhất") {
            setSortBy("newest");
            // get a tag with id = newest and change its color to red
            document.getElementById("newest").style.color = "red";
        } else if (event.target.innerText.toLowerCase() === "Xem nhiều") {
            setSortBy("view");
            document.getElementById("view").style.color = "red";
        } else {
            setSortBy("like");
            document.getElementById("like").style.color = "red";
        }
    }

    const handleStatus = (event) => {
        if (event.target.innerText.toLowerCase() === "Hoàn thành") {
            setStatus("completed");
            document.getElementById("completed").style.color = "red";
        } else {
            setStatus("ongoing");
            document.getElementById("ongoing").style.color = "red";
        }
    }


  return (
    <div>
        <header style={{
            fontSize: "0.9rem", 
            // darker than white
            backgroundColor: "#f5f5f5",
            // padding top
            paddingTop: "1rem",
            paddingBottom: "0.5rem",
        }}>
            <div className="container">
                <h6>Thể Loại: {utils.genre_name_mapper[genre.toUpperCase()]}</h6>

                <a><strong>Sort by</strong></a>
                <p>
                    <a id="newest" href="#" style={{color: sortBy == "newest" ? "red" : "black"}} onClick={handleOrderBy}>Mới nhất</a> {" | "} 
                    <a id="view" href="#" style={{color: sortBy == "view" ? "red" : "black"}} onClick={handleOrderBy}>Xem nhiều</a> {" | "} 
                    <a id="like" href="#" style={{color: sortBy == "like" ? "red" : "black"}} onClick={handleOrderBy}>Yêu thích</a>
                </p>

                <a><strong>Order by</strong></a>
                <p>
                    <a id="asc" href="#" style={{color: orderBy == "asc" ? "red" : "black"}} onClick={handleSortBy}>Tăng dần</a> {" | "}
                    <a id="desc" href="#" style={{color: orderBy == "desc" ? "red" : "black"}} onClick={handleSortBy}>Giảm dần</a>
                </p>
                
                <a><strong>Status</strong></a>
                <p>
                    <a id="all" href="#" style={{color: status == "all" ? "red" : "black"}}>Tất cả</a> {" | "}
                    <a id="completed" style={{color: status == "completed" ? "red" : "black"}} href="#" onClick={handleStatus}>Hoàn thành</a> {" | "} 
                    <a id="ongoing" href="#" style={{color: status == "ongoing" ? "red" : "black"}} onClick={handleStatus}>Đang tiến hành</a>
                </p>
            </div>

        </header>
        <div className="container">
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {series.map((series, index) => (
              <Grid key={series.id}>
                <ListItem
                  alignItems="flex-start"
                  className={`list-item ${
                    index % 2 === 0 ? "even-item" : "odd-item"
                  }`}
                  onClick={() => {
                    window.location.href = paths.series(series.slug);
                  }}
                //   onMouseEnter={() => handleMouseEnter(index)}
                //   onMouseLeave={handleMouseLeave}
                  key={series.id}
                >
                  <ListItemAvatar sx={{marginRight: "1rem"}}>
                    <SeriesThumbnail src={series.cover} size={2} shadow={false} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        component="span"
                        variant="body1"
                        // color={hoveredIndex === index ? "secondary" : "text.primary"}
                      >
                        {series.title}
                      </Typography>
                    }
                    secondary={
                      <React.Fragment>
                        {series.genres ? series.genres.map((element) => (
                          // <a key={element}> {mapper.genre_name_mapper[element]} {element === series.genres[series.genres.length - 1] ? "" : "-"}</a>
                          <Genre name={element} key={element} />
                        )) : ""}
                        <br />
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Chương {series.totalChapter}
                        </Typography>
                        {"\t(" + utils.timeSince(series.updatedDate) + ")"}
                        <Typography>{series.description.length > 300 ? series.description.substring(0, 300) + "..." : series.description
                        }</Typography>
                      </React.Fragment>
                    
                    }
                  />
                  {/* Positioning author's name at the rightmost */}
                  <ListItemSecondaryAction>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Tác giả: {series.author.name}
                    </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
              </Grid>
            ))}
          </List>
        </div>
      
    </div>
  );
}

