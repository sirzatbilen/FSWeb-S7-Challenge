import React from "react";
import { CardSection } from "./Card";
import Header from "./Header";
import Slider from "./Slider";
import "./card.css";

function Home() {
  return (
    <div>
      <Header />
      <Slider />
      <div className="cardDiv">
        <CardSection />
      </div>
    </div>
  );
}
export default Home;
