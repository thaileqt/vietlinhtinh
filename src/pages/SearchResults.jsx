import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import SeriesService from "../services/series.service";
import paths from "../commons/paths";
import MyBreadcrumb from "../components/layout/Breadcrumb";

const SearchResults = () => {
  const [series, setSeries] = useState([]);
  // get keyword from url
  const {keyword} = useParams()

  useEffect(() => {
    SeriesService.searchSeries(keyword).then(
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
  }, [keyword]);

  return (
    <div className="container">
      <MyBreadcrumb items={[keyword]} />
      <header className="jumbotron">
        <h1>Từ khoá: {keyword}</h1>


        <div className="series-list">
        {series.map((series) => (
          <div key={series.id} className="series-item">
            <img src={series.cover} alt={`Cover of ${series.title}`} className="series-cover" />
            <p className="series-title"><Link to={paths.series(series.slug)}>{series.title}</Link></p>
          </div>
        ))}
      </div>
      </header> /
    </div>
  );
};

export default SearchResults;
