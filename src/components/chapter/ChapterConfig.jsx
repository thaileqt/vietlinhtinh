import { Button, SvgIcon, Tooltip } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { LibraryBooksOutlined } from "@mui/icons-material";
import ChapterService from "../../services/chapter.service";
import { useState } from "react";
import paths from "../../commons/paths";


export default function ChapterConfig({ 
  seriesId,
  showSettings, 
  setShowSettings, 
  currentChapterNumber, 
  totalChapter, 
  handleClickNextChapter, 
  handleClickPrevChapter, 
  lineSpacing, 
  setLineSpacing, 
  backgroundColor, 
  setBackgroundColor, 
  fontSize, 
  setFontSize }) {

    const [chapters, setChapters] = useState([]);
    const [showAllChapters, setShowAllChapters] = useState(false);


    const handleShowAllChapters = () => {
      if (showAllChapters) {
        setShowAllChapters(false);
      } else {
        if (chapters.length > 0) {
          setShowAllChapters(true);
        } else {
          ChapterService.getAllChaptersBySeriesIdForNavigation(seriesId).then((res) => {
            setChapters(res.data);
            setShowAllChapters(true);
            console.log(res.data)
          }
          ).catch((err) => {
            console.log(err);
          });       
      }}

    }

    return (
    <div style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
      }}>

      <Tooltip title="Tất cả chương">
        <Button variant="primary" onClick={handleShowAllChapters} className="toolbar-item">
          <SvgIcon><LibraryBooksOutlined /></SvgIcon>
          {showAllChapters && (
            <div style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: "white", // Apply the background color here
              padding: '80px',
              borderRadius: '8px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
            }}>
              {chapters.map((chapter) => (
                <div key={chapter.id}>
                  <a href={paths.chapter(chapter.seriesSlug, chapter.chapterNumber)}>{chapter.title}</a>
                </div>
              ))}
            </div>
          )}
        </Button>
      </Tooltip>
    
      <Tooltip title="Tuỳ chỉnh">
        <Button variant="primary" onClick={() => setShowSettings(!showSettings)} className="toolbar-item">
          <SvgIcon><SettingsIcon /></SvgIcon>
        </Button>
      </Tooltip>

      <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'row' }}>
        {currentChapterNumber > 1 && (
          <Tooltip title="Quay về hương trước">
            <Button variant="primary" onClick={handleClickPrevChapter} style={{ marginRight: '5px' }}>
              <SvgIcon> <ArrowBackIosNewIcon /> </SvgIcon>
            </Button>
          </Tooltip>
        )}
        {currentChapterNumber < totalChapter && (
          <Tooltip title="Qua chương tiếp theo">
            <Button variant="primary" onClick={handleClickNextChapter}>
              <SvgIcon> <ArrowForwardIosIcon /> </SvgIcon>
            </Button>
          </Tooltip>
        )}
      </div>

      {showSettings && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: "white", // Apply the background color here
          padding: '80px',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        }}>
          <h5>Font Size</h5>
          <Button onClick={(e) => setFontSize(fontSize-2)} style={{backgroundColor: 'transparent', color: 'green', borderColor: 'transparent'}}>{"<"}</Button>
          <input
            disabled={true}
            type="number"
            value={fontSize}
            onChange={(e) => document.body.style.fontSize = `${e.target.value}px`}
          />
          <Button onClick={(e) => setFontSize(fontSize+2)} style={{backgroundColor: 'transparent', color: 'green', borderColor: 'transparent'}}>{">"}</Button>
          <h3>Line Spacing</h3>
          <select value={lineSpacing} onChange={(e) => setLineSpacing(e.target.value)}>
            <option value={1}>Single</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>Double</option>
          </select>

          <h3>Background Color</h3>
          {/* <SketchPicker color={backgroundColor} onChange={handleColorChange} /> */}
          
          <Button 
              className="btn btn-primary p-4 rounded-0"  
              onClick={() => setBackgroundColor('#FFFFFF')} 
              style={{backgroundColor: '#FFFFFF', marginRight: '5px', marginLeft: '5px', borderColor: 'transparent'}} />
            <Button 
              className="btn btn-primary p-4 rounded-0"  
              onClick={() => setBackgroundColor('#F0F8FF')} 
              style={{backgroundColor: '#F0F8FF', marginRight: '5px', marginLeft: '5px', borderColor: 'transparent'}} />
            <Button 
              className="btn btn-primary p-4 rounded-0"  
              onClick={() => setBackgroundColor('#F5F5DC')} 
              style={{backgroundColor: '#F5F5DC', marginRight: '5px', marginLeft: '5px', borderColor: 'transparent'}} />
            <Button 
              className="btn btn-primary p-4 rounded-0"  
              onClick={() => setBackgroundColor('#F5F5F5')} 
              style={{backgroundColor: '#F5F5F5', marginRight: '5px', marginLeft: '5px', borderColor: 'transparent'}} />

        </div>
      )} 
      </div>
    )
}