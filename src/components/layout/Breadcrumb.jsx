import { useLocation } from 'react-router-dom';
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types';
import { Breadcrumbs, Link } from '@mui/material';
import { Home } from '@mui/icons-material';


const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591



const MyBreadcrumb = ({items}) => {
  MyBreadcrumb.propTypes = {
    items: PropTypes.array,
  }
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x); // Split the URL path
  const mapper = {
    "profile": "Hồ sơ",
    "series": "Truyện",
    "search": "Tìm kiếm",
    "genre": "Thể loại",
    "compose": "Soạn truyện",
  };
  const breadcrumbs = [];
  
  breadcrumbs.push(
    <StyledBreadcrumb
      key={0}
      component="a"
      href="#"
      label="Home"
      icon={<Home fontSize="small" />}
    />
  )
  breadcrumbs.push(
    <StyledBreadcrumb
      key={1}
      component="a"
      href="#"
      label={mapper[pathnames[0]]}
    />
  )
  for (let i = 0; i < items.length; i++) {
    breadcrumbs.push(<StyledBreadcrumb
      key={i+2}
      component="a"
      href="#"
      label={items[i]}
    />);
  }


    
    
  
  return (
    <div className="container">
      <Breadcrumbs separator="/" aria-label="breadcrumb" sx={{padding: "10px 0"}}>
        {/* <Link underline="hover" key="1" color="inherit" href="/">
          MUI
        </Link>, */}
          {breadcrumbs}
      </Breadcrumbs>
    </div>
    
  );
};

export default MyBreadcrumb;
