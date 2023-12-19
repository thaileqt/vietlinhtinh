import { useLocation } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import HomeIcon from '@mui/icons-material/Home';


const MyBreadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x); // Split the URL path
  
  return (
    <div className="container">
    {location.pathname === "/" ? null : (
      <Breadcrumb>
      <Breadcrumb.Item href="/"><HomeIcon /></Breadcrumb.Item>
      {pathnames.map((path, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        return (
          <Breadcrumb.Item key={index} href={routeTo}>
            {path}
          </Breadcrumb.Item>
        );
      })};
    </Breadcrumb>
    )}
    </div>
    
  );
};

export default MyBreadcrumb;
