import React from "react";

export default function SeriesDescription({ series }) {
    const [expanded, setExpanded] = React.useState(false); // State to manage expanded/collapsed description

    const truncatedDescriptionLength = 1000;

    // Function to toggle the description expansion
    const toggleDescription = () => {
        setExpanded(!expanded);
    };
    return (
        <>
        { series && (
            <div className="col-md-12">
            <h5><strong>Mô tả truyện</strong></h5>
            {/* Description */}
            {series.description ? (
            <p className="description">                           
                {/* {expanded ? series.description : `${series.description.slice(0, truncatedDescriptionLength)}...`}
                
                {series.description.length > truncatedDescriptionLength && (
                    <span className="read-more" onClick={toggleDescription}>
                        {expanded ? 'Read Less' : 'Read More'}
                    </span>
                )} */}
                {series.description.split('\n').map((item, key) => {
                    return <p key={key}>{item}<br/></p>
                }
                )}

            </p>
                ) : (<div>Không có mô tả</div>)}
        </div>
        )}   

    </>
    )
}