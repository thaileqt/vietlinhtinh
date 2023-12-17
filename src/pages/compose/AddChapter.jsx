import { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/AddChapter.css'; // Import CSS for styling
import ChapterService from '../../services/chapter.service';
import paths from '../../commons/paths';

const AddChapter = () => {
  const { slug } = useParams(); // Get series slug from URL params
  const [chapterData, setChapterData] = useState({
    title: '',
    content: '',
    seriesSlug: slug,
    status: 'draft', // Add status field with initial value as 'draft'
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChapterData({
      ...chapterData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setError('');
    console.log(chapterData)

    ChapterService.addChapter(chapterData)
      .then(() => {
        window.location.href(paths.compose.allChapter(slug));
      })
      .catch((error) => {
        setIsSubmitting(false);
        setError('Error adding chapter. Please try again.');
        console.error('Error adding chapter:', error);
      });
  };

  return (
    <div className="add-chapter-container">
      <h2>Add Chapter</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={chapterData.title}
            onChange={handleChange}
            // required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={chapterData.content}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <div>
            <label>
              <input
                type="radio"
                name="status"
                value="draft"
                checked={chapterData.status === 'draft'}
                onChange={handleChange}
              />
              Draft
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="published"
                checked={chapterData.status === 'published'}
                onChange={handleChange}
              />
              Published
            </label>
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Chapter'}
        </button>
      </form>
    </div>
  );
};

export default AddChapter;
