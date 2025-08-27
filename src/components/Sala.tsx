import { Carousel, Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";

type SalaProps = {
  onClose: () => void;
};

const images: string[] = [
  "src/assets/img/sala/sl1.jpg",
  "src/assets/img/sala/sl2.jpg",
  "src/assets/img/sala/l3.jpg",
  "src/assets/img/sala/all2.jpg",
];

const Sala = ({ onClose }: SalaProps) => {
  return (
    <div className="sala-overlay" onClick={onClose}>
      <div className="sala-content" onClick={(e) => e.stopPropagation()}>
        <Button
          variant="light"
          className="sala-close"
          onClick={onClose}
        >
          <FaTimes size={22} />
        </Button>

        <Carousel indicators={false}>
          {images.map((src, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block"
                src={src}
                alt={`slide-${index}`}
        style={{
    maxHeight: "500px",   
    objectFit: "cover",   
    objectPosition: "center" 
  }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Sala;

