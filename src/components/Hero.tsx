import { Card } from "react-bootstrap";

const Hero: React.FC = () => {
  return (
    <Card className=" bg-transparent border-0">
      <Card.Title className="mb-3">
        Riserva subito un posto con <strong>TheFork</strong>
      </Card.Title>
      <iframe
        src="https://widget.thefork.com/a647c4af-ca58-4d2e-8369-3534945bd01f"
        allow="payment *"
        className="thefork-iframe "
        title="TheFork Widget"
        style={{
          borderRadius: "10px",
        }}
      />
    </Card>
  );
};

export default Hero;
