import { Container, Row, Col } from "react-bootstrap";
import stf from "../assets/img/STF.png";
import st from "../assets/img/ST.png";
import duf from "../assets/img/DUF.png";
import du from "../assets/img/DU.png";

const About = () => {
  return (
    <>
      <Container fluid className="contTert">
        <Row className=" d-flex justify-content-center py-4">
          <Col xs={12} md={6} className="text-center">
            <h3 className="display-5">
              La <strong>nostra</strong> storia
            </h3>
            <p className="fs-5">
              Un <strong>"Sogno Partenopeo"</strong> che nasce all’ombra del
              Vesuvio e prende vita tra i vicoli assolati di{" "}
              <strong>Napoli</strong>, là dove il tempo sembra scorrere al ritmo
              lento delle tradizioni e dei profumi che invadono l’aria. È un
              sogno fatto di <strong>sapori</strong> antichi, che affondano le
              radici in secoli di storia, cultura e passione per il cibo. Dalla{" "}
              <strong>pizza</strong> napoletana, vera regina della tavola,
              fragrante e leggera, con il suo cornicione alto e morbido, fino ai piatti della cucina{" "}
              <strong>mediterranea</strong>, intreccio perfetto di terra e mare,
              sole e vento, semplicità e ricchezza.
            </p>
            <p className="fs-5">
              Ogni ingrediente è un tributo alla terra: il{" "}
              <strong>pomodoro</strong> rosso come un tramonto sul golfo, l’
              <strong>olio</strong> extravergine dorato come i raggi del sole,
              il <strong>basilico</strong> che profuma di giardini nascosti e
              d’estate eterna. In questo sogno culinario si incontrano la poesia
              dei sapori autentici e la musica delle emozioni, perché mangiare
              non è solo nutrirsi, ma celebrare la vita, riscoprire la memoria,
              sedersi a tavola come atto d’<strong>amore</strong>.
            </p>
            <p className="fs-5">
              È un viaggio sensoriale che avvolge e incanta, un invito a
              rallentare, ad ascoltare il silenzio tra un boccone e l’altro, a
              lasciarsi trasportare dalla magia di una cucina che è cuore, anima
              e <strong>identità</strong>. Così si compie Sogno Partenopeo:
              attraverso la bellezza della sua cucina, che accoglie, conforta e
              racconta — con ogni piatto — una <strong>storia</strong> di
              calore, passione e profonda umanità.
            </p>
          </Col>
        </Row>
        <Row className=" d-flex justify-content-center align-items-center py-4">
          <Col xs={12} md={6} className="text-center mt-2">
           <img src={stf} alt="avatar" style={{ width: "200px" }} />
<div className="sign-cont">
  <img src={st} alt="firma" />
</div>
          </Col>
          <Col xs={12} md={6} className="text-center mt-2">
            <img src={duf} alt="avatar" style={{ width: "200px" }} />
<div className="sign-cont">
  <img src={du} alt="firma" />
</div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default About;
