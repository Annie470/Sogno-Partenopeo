import Carousel from "react-bootstrap/Carousel";
import Marquee from "react-fast-marquee";
import img1 from "../assets/img/custom/425879450_1441140876612255_4279876720431297903_n.jpeg";
import img2 from "../assets/img/custom/spaghetti-con-vongole.jpg";
import img3 from "../assets/img/custom/440114382_446279247905142_4486865179385448861_n.jpeg";
import img4 from "../assets/img/custom/490111885_653863847573792_6760672300408343407_n.jpeg";
import img5 from "../assets/img/custom/FB_IMG_1756059189941.jpg";
import img6 from "../assets/img/custom/FB_IMG_1756059321956.jpg";
import img7 from "../assets/img/custom/FB_IMG_1756059337112.jpg";
import img8 from "../assets/img/custom/FB_IMG_1756059396781.jpg";
import img9 from "../assets/img/custom/FB_IMG_1756059170350.jpg";

const images: string[] = [img1, img2, img3, img4, img5, img6, img7, img8, img9];


const CarouselPhoto = () => {
  return (
    <>
      {/* Versione Mobile: Carousel */}
      <div className="d-block d-md-none">
        <Carousel indicators={false} controls={false}>
          {images.map((src, index) => (
            <Carousel.Item key={index} interval={2000}>
              <img className="d-block w-100" src={src} alt={`slide-${index}`} />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      {/* Versione Desktop: Rullo */}
      <div className="d-none d-md-block">
        <Marquee pauseOnHover={true} speed={50} gradient={false}>
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`slide-${index}`}
              style={{
                height: "300px",
                marginRight: "15px",
                borderRadius: "10px",
                objectFit: "cover",
              }}
            />
          ))}
        </Marquee>
      </div>
    </>
  );
};

export default CarouselPhoto;
