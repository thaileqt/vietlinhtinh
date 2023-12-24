import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { List, ListItem, Grid, ListItemText, ListItemSecondaryAction, Typography, ListItemAvatar, Stack, Rating, CircularProgress } from "@mui/material";
import Genre from "../components/misc/Genre";

import utils from "../commons/utils";
import SeriesService from "../services/series.service";
import SeriesThumbnail from "../components/avatar/SeriesThumbnail";

import paths from "../commons/paths";
import MyBreadcrumb from "../components/layout/Breadcrumb";


export default function SearchByGenreResults() {
  const [series, setSeries] = useState(null);
  const {genre} = useParams()
  const [sortBy, setSortBy] = useState("newest");
const [orderBy, setOrderBy] = useState("asc");
const [status, setStatus] = useState("all");
const [hoveredIndex, setHoveredIndex] = React.useState(null);

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
        if (event.target.innerText === "Tăng dần") {
            setOrderBy("asc");
            document.getElementById("asc").style.color = "red";

        } else {
            setOrderBy("desc");
            document.getElementById("desc").style.color = "red";
        }
    }

    const handleOrderBy = (event) => {
        if (event.target.innerText === "Mới nhất") {
            setSortBy("newest");
            // get a tag with id = newest and change its color to red
            document.getElementById("newest").style.color = "red";
        } else if (event.target.innerText === "Xem nhiều") {
            setSortBy("view");
            document.getElementById("view").style.color = "red";
        } else {
            setSortBy("like");
            document.getElementById("like").style.color = "red";
        }
    }

    const handleStatus = (event) => {
        if (event.target.innerText === "Hoàn thành") {
            setStatus("completed");
            document.getElementById("completed").style.color = "red";
        } else if (event.target.innerText === "Đang tiến hành") {
            setStatus("ongoing");
            document.getElementById("ongoing").style.color = "red";
        } else {
            setStatus("all");
            document.getElementById("all").style.color = "red";
        }
    }


  return (
    <div>
      <MyBreadcrumb items={[utils.genre_name_mapper[genre.toUpperCase()]]} />
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
                    <a id="all" href="#" style={{color: status == "all" ? "red" : "black"}} onClick={handleStatus}>Tất cả</a> {" | "}
                    <a id="completed" style={{color: status == "completed" ? "red" : "black"}} href="#" onClick={handleStatus}>Hoàn thành</a> {" | "} 
                    <a id="ongoing" href="#" style={{color: status == "ongoing" ? "red" : "black"}} onClick={handleStatus}>Đang tiến hành</a>
                </p>
            </div>
        </header>

        <div className="container">
          {series ? ( <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {series && series.map((series, index) => (
              <Stack key={series.id} direction="row" 
              className={`list-item ${
                index % 2 === 0 ? "even-item" : "odd-item"
              }`}
              justifyContent="space-between"
              padding="10px">
          <Stack direction="row" justifyContent="flex-start">
              <Stack direction="column"
                // middle align
                alignItems="center"
              >
                <SeriesThumbnail src={series.cover} size={1} shadow={false} />    
                <Rating name="read-only" value={series.averageRating} readOnly size="small"/>
              </Stack>
              
            

              <Stack direction="column" alignItems="left" paddingLeft="10px">
                <Typography
                  component="span"
                  variant="body1"
                  textAlign="left"
                  // on hover
                  sx={{
                    '&:hover': {
                      color: "red",
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => {
                    window.location.href = paths.series(series.slug);
                  }}
                >
                  <strong>{series.title}</strong>
                </Typography>
                <Typography
                  component="span"
                  variant="body1"
                  color={hoveredIndex === index ? "secondary" : "text.primary"}
                >
                  {series.genres ? series.genres.map((genre) => (
                        // <a key={element}> {mapper.genre_name_mapper[element]} {element === series.genres[series.genres.length - 1] ? "" : "-"}</a>
                        <Genre name={genre.name} key={genre.id} color="black" borderRadius='3px' border="1px solid rgb(191, 191, 191)" />
                      )) : ""}
                </Typography>
                {/* <Link to={paths.chapter(series.slug, series.chapterNumber)}> */}
                  <Typography
                    component="span"
                    variant="body1"
                    color={index ? "secondary" : "text.primary"}
                    onClick={() => {window.location.href=paths.chapter(series.slug, series.chapterNumber)}}
                    // on hover
                    sx={{
                      color: hoveredIndex === index ? "red" : "black",
                      '&:hover': {
                        color: "red",
                        cursor: "pointer",
                      },
                    }}
                  >
                  {series.chapterTitle}
                  </Typography>
                {/* </Link> */}
                <Typography
                  component="span"
                  variant="inherit"
                  // set description color to be secondary
                  color={hoveredIndex === index ? "secondary" : "text.secondary"}
                  fontSize="0.8rem"
                >{series.description.length > 500 ? series.description.substring(0, 500) + "..." : series.description}
                </Typography>
                <Typography
                component="span"
                variant="subtitle2"  // flex end
                // on hover  
              >
                Cập nhật {utils.timeSince(series.updatedAt)} bởi <Typography
                  component="span"
                  variant="body2"
                  textAlign="left"
                  color={hoveredIndex === index ? "secondary" : "text.primary"}
                  // on hover
                  sx={{
                    color: "#3f51b5",
                    '&:hover': {
                      fontWeight: "bold",
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => {window.location.href = paths.profile(series.author.username)}}
                >
                  {series.author.username}
                </Typography>
              </Typography>
              </Stack>
              
              
            </Stack>
          </Stack>    
            ))}
          </List>) : (
            <CircularProgress />
          )}
           
        </div>
      
    </div>
  );
}

