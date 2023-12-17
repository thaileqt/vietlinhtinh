import PropTypes from 'prop-types';



export default function ContentRender({ chapterContent,  lineSpacing, marker, toggleMarker }) {
  ContentRender.propTypes = {
    chapterContent: PropTypes.string.isRequired,
    lineSpacing: PropTypes.string.isRequired,
    marker: PropTypes.object,
    toggleMarker: PropTypes.func.isRequired,
  };
    chapterContent = chapterContent.split('\n');

  

    return (
      <div className="series-reader-container">
        {/* <div className='title' ref={chapterTitleRef}>
          <h2 className="title">Chương {chapterNumber} </h2>
          <h2>{chapterTitle}</h2>
        </div> */}

        <div className="individual-line-container">
          {chapterContent.map((line, index) => (
            <p
              key={index}
              className={`individual-line ${
                lineSpacing === '1.5' ? 'line-spacing-1-5' : ''
              } ${lineSpacing === '2' ? 'line-spacing-2' : ''}`}
              style={{ backgroundColor: (marker && marker.paragraphIndex === index) ? 'yellow' : 'transparent' }}
              onClick={() => toggleMarker(index)}
            >
              {line}
            </p>
            
          ))}
        </div>
      </div>
    );
  }
