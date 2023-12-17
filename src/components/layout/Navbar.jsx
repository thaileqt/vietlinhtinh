import { React, useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown, Container, Button, Form, Col } from 'react-bootstrap';
import UserService from '../../services/user.service';
import "bootstrap/dist/css/bootstrap.min.css";
import utils from '../../commons/utils'; 
import "../../App.css";
import { useNavigate } from 'react-router-dom';


const MyNavbar = ({ currentUser, logOut }) => {
  const [genres, setGenres] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  


  useEffect(() => {
    UserService.getGenres()
        .then((response) => {
            setGenres(response.data);
        })
        .catch((error) => {
            console.error('Error fetching series details:', error);
        });
}, []);

// get form input
const handleInputChange = (e) => {
  setSearchKeyword(e.target.value);
}

const handleSearch = () => {
  console.log(searchKeyword);
  if (searchKeyword === "") {
    alert("Vui lòng nhập từ khoá tìm kiếm");
    return;
  }
  
  navigate(`/search?keyword=${searchKeyword}`);
  window.location.reload();
}

  

  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
       
        <Col>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Col>
            <Form className="d-flex ">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={handleInputChange}
              />
              <Button variant="outline-success " 
                      className='me-auto my-2 my-lg-0'
                      onClick={handleSearch}
                >Search
              </Button>
              
              
            </Form>
            </Col>
            <Col className='justify-content-end'>
            <Nav className="me-auto my-2 my-lg-0 " style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link href="/compose">Viết</Nav.Link>
              {/* Dropdown Menu */}
              <NavDropdown title="Thể loại" id="navbarScrollingDropdown">
              {genres.map((genre, index) => (
                  <NavDropdown.Item key={index} href={`/genre/${genre.name.toLowerCase()}`}>{utils.genre_name_mapper[genre.name]}</NavDropdown.Item>
                ))}
                {/* <NavDropdown.Divider /> */}
              </NavDropdown>
              {/* End dropdown menu */}
              
            </Nav>
            </Col>
          </Navbar.Collapse>
        </Col>
        <Col md="auto">
          <Navbar.Brand className="mx-auto" href="/">VietLinhTinh.vn</Navbar.Brand>
        </Col>
        
        <Col>
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
          {currentUser ?  (
            <>
            
            <NavDropdown title={currentUser.name} id="navbarScrollingDropdown">
              <NavDropdown.Item key={1} href={`/profile/${currentUser.username}`}>Trang cá nhân</NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item key={"logout"} href={`/login`} onClick={logOut}>Đăng xuất</NavDropdown.Item>
            </NavDropdown>
            
            </>
            
          ) : (
            <>
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            </>
          )}
          </Nav>
          </Navbar.Collapse>
        </Col>
      </Container>

      

    </Navbar>
    </>

  );
};

export default MyNavbar;