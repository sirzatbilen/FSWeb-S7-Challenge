import React from "react";
import Header from "./Header";
import resim from "./images/koppernik.jpg";
import resim2 from "./images/koppernikmağaza.jpg";
import resim3 from "./images/koppernikmağaza3.jpg";
import "./about.css";

function About() {
  return (
    <div>
      <Header />
      <div className="ana-container">
        <div className="img-container">
          <img src={resim} alt="" />
        </div>
        <div className="bilgi">
          <h1>Koppernik Pizza</h1>
          <p>
            1974 yılından beri lorem ipsum dolor sit amet consectetur
            adipisicing elit. Aspernatur corrupti autem alias voluptatum enim
            odio dicta excepturi, perferendis hic labore officia facere nostrum
            fugit ratione eaque, in quo porro expedita! Harum commodi, explicabo
            adipisci voluptates nobis fuga! Nostrum et assumenda deserunt quae,
            quas ut obcaecati, adipisci, necessitatibus quos sed optio veritatis
            nobis repudiandae eveniet? Labore minus mollitia velit aliquid
            consectetur nostrum dolorum distinctio in praesentium natus minima
            assumenda, dolores repudiandae commodi reprehenderit. Distinctio rem
            minima molestias sunt quos aliquid officiis, quia quidem incidunt,
            quaerat cumque? Itaque odio veniam, ea iure voluptatem perferendis
            laborum dolorem alias mollitia ipsa tenetur voluptates unde?
          </p>
        </div>
      </div>
      <div className="fotolar">
        <div className="resim2">
          <h3>Lorem ipsum dolor sit amet.</h3>
          <img src={resim2} alt="" />
        </div>
        <div className="resim3">
          <h3>Lorem ipsum dolor sit amet.</h3>
          <img src={resim3} alt="" />
        </div>
      </div>
    </div>
  );
}

export default About;
