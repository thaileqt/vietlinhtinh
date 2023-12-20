import React from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemSecondaryAction, ListItemText, Pagination } from "@mui/material";

import ChapterService from "../../services/chapter.service";
import PropTypes from "prop-types";

import utils from "../../commons/utils";
import paths from "../../commons/paths";

ChapterList.propTypes = {
    slug: PropTypes.string.isRequired
};

export default function ChapterList({ slug }) {
    
    // Your code here
    
    const [chapters, setChapters] = React.useState([]);
    const [totalPages, setTotalPages] = React.useState(null);
    const size = 20

    React.useEffect(() => {
        ChapterService.getChaptersBySeriesSlug(slug, 0, size)
            .then((response) => {
                setChapters(response.data);
            })
            .catch((error) => {
                console.error('Error fetching chapters:', error);
            });

        ChapterService.countTotalChapters(slug)
            .then((response) => {
                setTotalPages(Math.ceil(response.data/size));
            })
            .catch((error) => {
                console.error('Error fetching chapters:', error);
            });
    }, [slug]);

    // const getFormattedDate = (timestamp) => {
    //     const date = new Date(timestamp);
    //     return date.toLocaleDateString("en-US", {
    //         year: "numeric",
    //         month: "short",
    //         day: "numeric",
    //     });
    // };

    const handlePageChange = (event, value) => {
        ChapterService.getChaptersBySeriesSlug(slug, value-1, size).then(
          (response) => {
              setChapters(response.data);
          },
          (error) => {
              const errorMessage =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
              console.error('Error fetching recent updated series:', errorMessage);
              // Handle errors accordingly
          }
        );
      };

    return (
        <div className="col-md-12">
            <h5><strong>Danh sách chương</strong></h5>
            <div style={{
            marginTop: "20px",
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            }}>
            {chapters.length > 0 ? (
                <List>
                    {chapters.map((chapter, index) => (
                        <ListItem button component={Link} to={paths.chapter(slug, index+1)} key={chapter.id}>
                            <ListItemText   
                                primary={chapter.title ? chapter.title : "Chương " + chapter.chapterNumber}
                            />
                            <ListItemSecondaryAction>
                            <ListItemText
                                secondary={utils.timeSince(chapter.createdAt)}
                            />
                        </ListItemSecondaryAction>
                        </ListItem>
                        
                    ))}
                </List>
            ) : (
                <div style={{ padding: "20px" }}>Chưa có chương nào</div>
            )}
            </div>
            {(totalPages && totalPages > 0) && <Pagination count={totalPages} variant="outlined" shape="rounded" onChange={handlePageChange} 
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '20px'
                }} 
            />}
            
        </div>
    );
}
