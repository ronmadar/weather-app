import React, { useContext, useEffect, useState } from "react";
import "./Card.css";

import { LogineContext } from "../../Contexts/LogineContext";

function Card() {
  const { favourites, setFavourites } = useContext(LogineContext);
  const { temps } = useContext(LogineContext);
  const { mode } = useContext(LogineContext);
  const { units } = useContext(LogineContext);

  const removeCard = (e) => {
    const name = e.target.getAttribute("name");
    setFavourites(favourites.filter((item) => item !== name));
  };

  return (
    <div className="wrap-cards">
      {favourites.map((city_name, index) => (
        <div className="card">
          <h5 className="card-title">
            <p>{city_name}</p>
          </h5>
          <p className="card-temperature">{temps[index]}{units[index]}</p>

          <h2 className="card-mode">{mode[index]}</h2>
          
          <button

            className="button-remove btn btn-dark" 
            onClick={removeCard}
            name={city_name}
          >
            remove card
          </button>
        </div>
      ))}
    </div>
  );
}
export default Card;
