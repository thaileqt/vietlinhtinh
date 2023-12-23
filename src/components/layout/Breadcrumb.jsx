import { useLocation } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import HomeIcon from '@mui/icons-material/Home';
import PropTypes from 'prop-types';


const MyBreadcrumb = ({items}) => {
  MyBreadcrumb.propTypes = {
    items: PropTypes.array,
  }
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x); // Split the URL path
  const breadcrumb = [];
  if (pathnames[0] === "profile") {
    pathnames[0] = "Hồ sơ";
    breadcrumb.push("Hồ sơ")
  } else if (pathnames[0] === "series") {
    pathnames[0] = "Truyện";
    breadcrumb.push("Truyện")
  } else if (pathnames[0] === "search") {
    pathnames[0] = "Tìm kiếm";
    breadcrumb.push("Tìm kiếm")
  } else if (pathnames[0] === "genre") {
    pathnames[0] = "Thể loại";
    breadcrumb.push("Thể loại")
  } else if (pathnames[0] == "compose") {
    pathnames[0] = "Soạn truyện";
    breadcrumb.push("Soạn truyện")
  }
  for (let i = 0; i < items.length; i++) {
    breadcrumb.push(items[i]);
  }

    
    
  
  return (
    <div className="container">
    {location.pathname === "/" ? null : (
      <Breadcrumb>
      <Breadcrumb.Item href="/"><HomeIcon /></Breadcrumb.Item>
      {breadcrumb.map((item, index) => {
        // const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        return (
          <Breadcrumb.Item key={index} 
            // href={routeTo}
          >
            {item}
          </Breadcrumb.Item>
        );
      })};
    </Breadcrumb>
    )}
    </div>
    
  );
};

export default MyBreadcrumb;
