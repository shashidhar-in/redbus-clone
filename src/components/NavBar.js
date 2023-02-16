import { Image } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaUser } from "react-icons/fa"
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const navigate=useNavigate();
    function signOut(){
        localStorage.removeItem("token");
        navigate("/login")
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="danger" variant="dark">
            <Container>
                <Image src="https://www.redbus.in/i/59538b35953097248522a65b4b79650e.png" style={{cursor:"pointer"}} onClick={(()=>{
                                navigate("/") 
                            })}/>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features" className="ms-2">Bus Tickets</Nav.Link>

                    </Nav>
                    <Nav>
                        <NavDropdown title={<FaUser style={{ fontSize: 16 }} />} id="collasible-nav-dropdown">
                            <NavDropdown.Item  onClick={signOut}>Sign In/Sign Out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;