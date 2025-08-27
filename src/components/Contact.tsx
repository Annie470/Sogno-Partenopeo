import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { BsCheckCircleFill } from "react-icons/bs";
import emailjs from "emailjs-com";

const Contact = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_9e059qy", // Service ID
        "template_ekeah9e", // Template ID
        {
          from_name: fullName,
          from_email: email,
          message: message,
        },
        "ejwf3msLrge5TCuoi" // Public Key
      )
      .then(() => {
        setSent(true);
        setLoading(false);
        setFullName("");
        setEmail("");
        setMessage("");
      })
      .catch((err) => {
        console.error("Errore invio email:", err);
        setLoading(false);
      });
  };

  return (
    <Container className=" contTert py-5" fluid>
      <Row className="d-flex justify-content-center mb-5 gy-3">
        <Col className="text-center" xs={12}><h2 className="mb-4">Contattaci</h2></Col>
        <Col xs={12} md={6}>
          {" "}
          <Form onSubmit={handleSubmit}>
            
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label><strong>Nome</strong></Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il tuo nome"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                 className="border  border-primary"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label><strong>Email</strong></Form.Label>
              <Form.Control
                type="email"
                placeholder="Inserisci la tua email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                 className="border  border-primary"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label><strong>Messaggio</strong></Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Scrivi qui il tuo messaggio"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                 className="border  border-primary"
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading} className="my-4">
              {loading ? "Invio..." : "Invia"}
            </Button>

            {sent && (
              <p className="mt-3 text-success">
                  <BsCheckCircleFill className="me-2" size={20} /> Email <strong>inviata </strong>con successo!
              </p>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
