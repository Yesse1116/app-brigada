import { useState, useEffect } from "react";
import foto1 from "../../img/foto_1.jpg";
import foto2 from "../../img/foto_2.jpg";
import foto3 from "../../img/foto_3.jpg";
import foto4 from "../../img/foto_4.jpg";
import foto5 from "../../img/foto_5.jpg";
import "./Carrusel.css";

function Carrusel() {
  const images = [foto1, foto2, foto3, foto4, foto5];
  const [selectIndex, setSelectIndex] = useState(0);

  const selectNewImage = (index, next = true) => {
    let nextIndex;
    if (next) {
      nextIndex = index < images.length - 1 ? index + 1 : 0;
    } else {
      nextIndex = index > 0 ? index - 1 : images.length - 1;
    }
    setSelectIndex(nextIndex);
  };

  const previous = () => selectNewImage(selectIndex, false);
  const next = () => selectNewImage(selectIndex);

  useEffect(() => {
    const interval = setInterval(() => {
      selectNewImage(selectIndex);
    }, 4500);

    return () => clearInterval(interval);
  }, [selectIndex]);

  return (
    <div className="carousel">
      <button className="carousel-button left" onClick={previous}>
        ◀
      </button>
      <div className="carousel-content">
        <img
          src={images[selectIndex]}
          alt={`Imagen ${selectIndex + 1}`}
          className="carousel-image"
        />
      </div>
      <button className="carousel-button right" onClick={next}>
        ▶
      </button>
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === selectIndex ? "active" : ""}`}
            onClick={() => setSelectIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Carrusel;
