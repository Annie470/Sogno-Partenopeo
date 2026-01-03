import { Carousel, Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import sl1 from "../assets/img/sala/sl1.jpg";
import sl2 from "../assets/img/sala/sl2.jpg";
import l3 from "../assets/img/sala/l3.jpg";
import all2 from "../assets/img/sala/all2.jpg";

const images: string[] = [sl1, sl2, l3, all2];

type SalaProps = {
  onClose: () => void;
};

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

