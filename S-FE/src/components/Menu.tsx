import { Carousel } from "react-bootstrap";
import antipasti from "../assets/img/menu/antipasti.jpg";
import primi from "../assets/img/menu/primi.jpg";
import secondi from "../assets/img/menu/secondi.jpg";
import pizze1 from "../assets/img/menu/pizze1.jpg";
import pizze2 from "../assets/img/menu/pizze2.jpg";
import pizze3 from "../assets/img/menu/pizze3.jpg";

const images: string[] = [antipasti, primi, secondi, pizze1, pizze2, pizze3];

const Menu = () => {
  return (
    <div id="menu-carousel" className="d-flex justify-content-center">
<Carousel  controls
        indicators={false}
        interval={null} 
        slide={false}  
      >
          {images.map((src, index) => (
            <Carousel.Item key={index} >
              <img src={src} alt={`slide-${index}`} />
            </Carousel.Item>
          ))}
        </Carousel>

    </div>
  );
};

export default Menu;
