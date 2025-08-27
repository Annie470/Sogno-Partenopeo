import Hero from "./Hero";
import Orari from "./Orari";
import Geo from "./Geo";
import CarouselPhoto from "./CarouselPhoto";
import { Container, Row, Col } from "react-bootstrap";
const HomeContainer = () => {
  return (
    <>
      {" "}
      <Container fluid className="bg-light contTert">
        <Row className="my-0 my-md-3">
          <Col xs={12} className="p-0">
            <CarouselPhoto />
          </Col>
        </Row>
        
         <Row className="d-flex justify-content-center pt-4 fs-6 fs-md-5">
          <Col xs={12} md={5} className="text-center">
            <Hero />
          </Col>
           <Col xs={12} md={5} className="d-flex flex-column align-items-center">
          <Orari/>
          </Col>
        </Row>{" "}
         <Row className="my-3">
          <Col xs={12}>
          <Geo/>
          </Col>
         </Row>
      </Container>
    </>
  );
};
export default HomeContainer;
