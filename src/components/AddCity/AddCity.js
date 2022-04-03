import React, { useContext } from "react";
import "./AddCity.css";

import { LogineContext } from "../../Contexts/LogineContext";

function AddCity() {
  const { favourites, setFavourites } = useContext(LogineContext);
  const { city } = useContext(LogineContext);

  return (
    <button
      className="add_to_favourites btn btn-dark"
      onClick={() => {
        if (favourites.includes(city) == true) {
          alert("city already exists in your favourites.");
        } else {
          setFavourites((arr) => [...arr, city]);
        }
      }}
    >
      Add To Your Favorits
    </button>
  );
}
export default AddCity;
