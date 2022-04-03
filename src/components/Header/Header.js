import React from "react";
import './Header.css';
import { Link } from 'react-router-dom';
import Weather from '../Weather/Weather'
import Favorites from "../Favorites/Favorites";

function Header() {

  return (

    <div className="container-header">
      <h1 className="header">Herolo Weather Task</h1>
      
      <div className="links-container">
       <Link id="favorites_btn" className="btn btn-primary" to="/Weather">Weather</Link>
       <Link className="btn btn-primary" id="home_btn" to="/Favorites">Favorites</Link>
      </div>
       
   
    </div>

 
  );
}

export default Header;
