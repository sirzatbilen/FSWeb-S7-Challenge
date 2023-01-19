import React from "react";
import { Link } from "react-router-dom";
import logo from "./../pizza-logo-asıl.png";

export default function Header() {
  return (
    <header>
      <nav>
        <div className="div-link">
          <Link to="/" className="navlink">
            Ana Sayfa
          </Link>
          <Link to="/pizza" className="navlink">
            Sipariş Ver
          </Link>
        </div>
        <Link to="/">
          <img src={logo} />
        </Link>
        <div className="div-link">
          <Link to="/About" className="navlink">
            Hakkımızda
          </Link>
          <Link to="/Contact" className="navlink">
            İletişim
          </Link>
        </div>
      </nav>
    </header>
  );
}
