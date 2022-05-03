import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
export default function Banner() {
  return (
    <div className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        {[
          <div key={1}>
            <img src="https://links.papareact.com/gi1" loading="lazy" alt="" />
          </div>,
          <div key={2}>
            <img src="https://links.papareact.com/6ff" loading="lazy" alt="" />
          </div>,
          <div key={3}>
            <img src="https://links.papareact.com/7ma" loading="lazy" alt="" />
          </div>,
        ]}
      </Carousel>
    </div>
  );
}
