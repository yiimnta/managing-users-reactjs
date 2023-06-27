import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export default function NavBar() {
    return (
        <Navbar className="color-nav" variant='light' expand="lg">
            <Container>
                <Navbar.Brand href="#home">User Manager</Navbar.Brand>
            </Container>
        </Navbar>
    )
}