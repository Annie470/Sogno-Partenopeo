import { Carousel } from "react-bootstrap";
const images: string[] = [
 "src/assets/img/menu/antipasti.jpg",
 "src/assets/img/menu/primi.jpg",
"src/assets/img/menu/secondi.jpg",
"src/assets/img/menu/pizze1.jpg",
"src/assets/img/menu/pizze2.jpg",
"src/assets/img/menu/pizze3.jpg",
];


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
