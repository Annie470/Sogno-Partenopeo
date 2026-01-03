import { Card, Button } from "react-bootstrap";

const Geo: React.FC = () => {
  const address = "Via Croce Rossa Arenella 13/15, Napoli";
  const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    address
  )}&t=&z=15&ie=UTF8&iwloc=B&output=embed`;
   const mapsUrl =
    "https://www.google.com/maps?q=Via+Croce+Rossa+Arenella+13%2F15";

  return (
    <Card className="border-0 my-4">
          <Card.Header className="text-center">
       <Button
  as="a"
  href={mapsUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="btn-outline-tertiary mb-2 fly"
>
  📍 Apri in Maps
</Button>
      </Card.Header>
      <Card.Body className="p-0">
        <iframe
          src={mapsEmbedUrl}
          width="100%"
          height="400"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps"
        />
      </Card.Body>
    </Card>
  );
};

export default Geo;
