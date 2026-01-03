import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaInstagram } from "react-icons/fa";


const Footer = () => {
  return (
    <Container fluid className="bg-grad text-white py-3">
      <Row className="gy-4 text-center">
        <Col xs={12} md={4} className="text-center">
          <a
            href="https://www.facebook.com/sognopartenopeo.ristorante.pizzeria/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white fs-3 me-3"
          >
            <FaFacebook className="fly" />
          </a>
          <a
            href="https://www.instagram.com/sognopartenopeo.ristorante/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white fs-3"
          >
            <FaInstagram  className="fly"/>
          </a>
        </Col>
        <Col xs={12} md={4} className="text-center">
          <p className="mb-0">Via Croce Rossa All'arenella 13/15</p>
          <p className="mb-0">081 3503082 - 3914198685</p>
     <p className="mb-0 fly">
  <a
    href="mailto:info@sognopartenopeo.it"
    className="text-light"
  >
    info@sognopartenopeo.it
  </a>
</p>
        </Col>
        <Col xs={12} md={4}>
        <a
            href="https://www.tripadvisor.it/Restaurant_Review-g187785-d23831069-Reviews-Sogno_Partenopeo-Naples_Province_of_Naples_Campania.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white fs-3"
          >
            <img src="TripAdvisor.png" alt="TripAdvisor Logo" id="trip-adv" className="fly" />
          </a></Col>

        
      </Row>
    </Container>
  );
};

export default Footer;
