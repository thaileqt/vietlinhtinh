import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IconButton, Avatar, Stack } from '@mui/material';
import { PermContactCalendarOutlined, Search } from '@mui/icons-material';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';

import { InputGroup, Nav, NavDropdown, Container, Navbar, Form } from 'react-bootstrap';

import UserService from '../../services/user.service';
import TransparentButton from '../button/TransparentButton';
import Notification from '../misc/Notification';

import utils from '../../commons/utils';
import paths from '../../commons/paths';
import "../../App.css";
import "./Navbar.css";
import PropType from 'prop-types';
import LoginForm from '../form/LoginForm';
import RegistrationForm from '../form/RegistrationForm';
import NavbarGenres from './NavbarGenres';




export default function MyNavbar ({ currentUser, logOut }) {
  const [genres, setGenres] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const [showLoginForm, setShowLoginForm] = useState(false);
  const loginFormRef = useRef(null);

  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const registrationFormRef = useRef(null);

  const [clicking, setClicking] = useState(null);

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setClicking("login")
  };

  const handleRegisterClick = () => {
    setShowRegistrationForm(true);
    setClicking("register")
  };

  const handleClickOutside = (event) => {
    if (loginFormRef.current && !loginFormRef.current.contains(event.target)) {
      setShowLoginForm(false);
      return
    }
    if (registrationFormRef.current && !registrationFormRef.current.contains(event.target)) {
      setShowRegistrationForm(false);
      return
    }
  };
  
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    UserService.getGenres()
      .then((response) => {
        setGenres(response.data);
      })
      .catch((error) => {
        console.error('Error fetching series details:', error);
      });
      
    if (showLoginForm || showRegistrationForm) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      setClicking(null);
    }
   
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      
    };
  }, [showLoginForm, showRegistrationForm]);

  const handleInputChange = (e) => {
    setSearchKeyword(e.target.value);
  }

  const handleSearch = () => {
    if (searchKeyword === "") {
      alert("Vui lòng nhập từ khoá tìm kiếm");
      return;
    }
    navigate(`/search?keyword=${searchKeyword}`);
    window.location.reload();
  }

  const handleMenuOpen = (event, menuType) => {
    if (menuType === 'notification') {
      setNotificationAnchorEl(event.currentTarget);
    }
  };

  const handleMenuClose = (menuType) => {
    if (menuType === 'notification') {
      setNotificationAnchorEl(null);
    }
  };



  return (
    <>
    <Navbar className="navbar-header">
      <Container>
        <Navbar.Brand href={paths.home} className="navbar-brand" 
            style={{
              color: "rgb(233, 233, 233)",
              position: "relative",
              top: "5px",
              padding: "0px",
              fontSize: "30px",
            }}>
              VietLinhTinh
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
            {/* <NavDropdown title="Thể loại" id="basic-nav-dropdown" className="navbar-dropdown">
                {genres.map((genre, index) => (
                  <NavDropdown.Item key={index} href={`/genre/${genre.name.toLowerCase()}`} className="navbar-dropdown-item">
                    {utils.genre_name_mapper[genre.name]}
                  </NavDropdown.Item>
                ))}
            </NavDropdown> */}
            
              <NavbarGenres genres={genres.map(genre => genre.name)} />
            
         

            <Nav.Link href="#">
              <InputGroup>
                <IconButton onClick={() => setShowSearch(!showSearch)} style={{color: "rgb(233, 233, 233"}}>
                  <Search />
                </IconButton>
                {showSearch && (
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      onChange={handleInputChange}
                    />
                    <IconButton useSubmit={handleSearch}>
                      <Search />
                    </IconButton>
                  </Form>
                )}
            
              </InputGroup>
            </Nav.Link>


        
       
        </Navbar.Collapse>
       
             

          <Navbar.Collapse className="justify-content-end">
            {currentUser ? (
              <Stack direction="row" spacing={1}
                sx={{
                  alignItems: 'center',
                  '& > :not(style)': { m: 1 },
                }}
              >
                
                {/* <PermContactCalendarOutlined sx={{color: 'rgb(233, 233, 233)'}}/> */}
                <NavDropdown title={currentUser.username} className="navbar-dropdown">
                  <NavDropdown.Item href={paths.profile(currentUser.username)} className="navbar-dropdown-item">Trang cá nhân</NavDropdown.Item>
                  <NavDropdown.Item className="navbar-dropdown-item">Account Settings</NavDropdown.Item>
                  <NavDropdown.Item className="navbar-dropdown-item">Reading List</NavDropdown.Item>
                  <NavDropdown.Item onClick={logOut} className="navbar-dropdown-item">Đăng xuất</NavDropdown.Item>
                </NavDropdown>

                <Notification 
                  notificationAnchorEl={notificationAnchorEl} 
                  handleMenuClose={handleMenuClose} 
                  handleMenuOpen={handleMenuOpen}/>

                <TransparentButton name="Viết" color="rgb(233, 233, 233)" onClick={() => navigate(paths.compose.composePage())}/>
                
              </Stack>
            ) : (
                <>
                    <Stack direction="row" sx={{ alignItems: 'center', '& > :not(style)': { m: 1 } }}>
                      <Nav.Item onClick={handleLoginClick} style={{ 
                        color: "rgb(233, 233, 233)", 
                        position: 'relative',
                        cursor: 'pointer'
                      }}>
                        Đăng nhập
                        {/* {clicking === "login" && <ArrowDropDownOutlinedIcon style={{ color: "rgb(233, 233, 233)", position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)', cursor: 'pointer' }} onClick={handleLoginClick} />} */}
                        {clicking === "login" && <ArrowDropUpOutlinedIcon fontSize="large" style={{ color: "rgb(100, 0, 50)", position: 'absolute', bottom: '-70px', left: '50%', transform: 'translateX(-50%)', fontSize:"6rem" }} onClick={handleLoginClick} />}
                        {showLoginForm && (
                            <LoginForm setShowLoginForm={setShowLoginForm} loginFormRef={loginFormRef} />
                        )}
                      </Nav.Item>
                    
                    </Stack >
                    
                    <Stack direction="row" sx={{ alignItems: 'center', '& > :not(style)': { m: 1 } }}>
                      <Nav.Item onClick={handleRegisterClick} style={{ color: "rgb(233, 233, 233)", position: 'relative', cursor: 'pointer' }}>
                        Đăng ký
                        {clicking === "register" && <ArrowDropUpOutlinedIcon fontSize="large" style={{ color: "rgb(100, 0, 50)", position: 'absolute', bottom: '-70px', left: '50%', transform: 'translateX(-50%)', fontSize: "6rem" }} onClick={handleRegisterClick} />}
                        {showRegistrationForm && (
                            <RegistrationForm setShowRegistrationForm={setShowRegistrationForm} registrationFormRef={registrationFormRef} />
                        )}
                      </Nav.Item>
                    </Stack >
                    
                </>
            )}
        
        </Navbar.Collapse>
      </Container>
      
      
    </Navbar>
    </>
  );
}

MyNavbar.propTypes = {
  currentUser: PropType.object,
  logOut: PropType.func.isRequired,
};