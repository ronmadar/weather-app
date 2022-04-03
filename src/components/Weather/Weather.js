import React from "react";
import { useState, useEffect, useContext } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import axios from "axios";
import { LogineContext } from "../../Contexts/LogineContext";
import "./Weather.css";
import IconImg from "../../assets/IconImg.js";
import AddCity from "../AddCity/AddCity";


function Weather() {
  const { city, setCity } = useContext(LogineContext);
  const { setMode } = useContext(LogineContext);
  const { days, setDays } = useContext(LogineContext);
  const { temps, setTemps } = useContext(LogineContext);
  const { units, setUnits } = useContext(LogineContext);
  const [icons, setIcon] = useState([]);


  const [citiesList, setCitiesList] = useState([]);

  let location_key = "";
  let city_name = ``;
  let icon_char = null;
  useEffect(() => {
    city_name = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=h5P50KKnVPvfpH6wGpj4n0HRDXUGzJlL
     &q=${city}`;
  });

 
  const handleSubmit = (event) => {
    event.preventDefault();
    cleanAllState();
    axios
      .get(city_name)
      .then((response) => {
        if (response.data[0].Key !== undefined) {
          location_key = response.data[0].Key;
        }
      })
      .then(() => {
        axios
          .get(
            `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${location_key}?apikey=h5P50KKnVPvfpH6wGpj4n0HRDXUGzJlL`
          )
          .then((res) => {
            axiosResult(res);
          });
      });
  };


  const axiosResult = (res) => {

    res.data.DailyForecasts.forEach((element) => {
      const tmp_date = element.Date;

      const tmp_icon = element.Day.Icon;

      icon_char = Object.keys(IconImg).map(iconSearch);
      const temp_to_send ="icon" + icon_char.indexOf(tmp_icon.toString()).toString();

      for (const [key, value] of Object.entries(IconImg)) {
        const isExists = (`${key}` == temp_to_send);
        if ((isExists) == true) {
          setIcon((arr) => [...arr, `${value}`]);
        }
        if(`${key}` == "icon44" && isExists == false){
         setIcon((arr) => [...arr, `${value}`]);

        }
      }

      const tmp_day = new Date(tmp_date);
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };

      const tmp_date_name = tmp_day.toLocaleDateString(
        "en-US",
        options
      );
      const myMode = element.Day.IconPhrase;
      const day = tmp_date_name.split(",")[0];
      const tmp_unit = element.Temperature.Maximum.Unit;
      const temp = element.Temperature.Maximum.Value;   
      setUnits((arr) => [...arr, tmp_unit]);
      setDays((arr) => [...arr, day]);
      setTemps((arr) => [...arr, temp]);
      setMode((arr) => [...arr, myMode]);
    });

  }
  const iconSearch = (icon) => {
    let split_char1 = "";
    let split_char2 = "";
    let sum_char = "";
    if (icon.length < 5) {
      split_char1 = icon.charAt(4);
      sum_char = split_char1;
    } else if (icon.length > 4) {
      split_char1 = icon.charAt(4);
      split_char2 = icon.charAt(5);
      sum_char = split_char1 + split_char2;
    }

    return sum_char;
  };
  //auto complete settings

  const handleOnSearch = (string, results) => {
    setCity(string);
  };

  const handleOnHover = (result) => {
    // the item hovered
    // console.log(result);
  };

  const handleOnSelect = (item) => {
    // the item selected
    // console.log(item)
  };

  const cleanAllState = ()=>{
    setDays([]);
    setTemps([]);
    setMode([]);
    setIcon([]);
  }

  const handleOnFocus = (event) => {

    cleanAllState();
    axios
      .get(city_name)
      .then((response) => {
        location_key = response.data[0].Key;
      })
      .then(() => {
        axios
          .get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${location_key}?apikey=h5P50KKnVPvfpH6wGpj4n0HRDXUGzJlL`)
          .then((res) => {
            axiosResult(res);

          });
      });
  };

  let count = 0;
  const formatResult = (setCitiesList) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }} key={count + 1}>
          name: {setCitiesList}
        </span>
      </>
    );
  };

  return (
    <div className="weather-container">

      <form className="search" onSubmit={handleSubmit}>
        <h3 className="search-title">Search City Weather : </h3>
        <label className="w-25">
          <ReactSearchAutocomplete
            items={citiesList[0]}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
          />
        </label>
      </form>

      <AddCity />


      <div className="wrap-cards">
        {days.map((tmp_city_name, index) => (
          <div className="card">

            <div className="icon-weather">
              <img src={icons[index]} alt="" />
            </div>

            <div className="card-body">
              <h5 className="card-title">
                <p>{tmp_city_name}</p>
              </h5>
              <p className="card-temperature">{temps[index]}{units[index]}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
export default Weather;


   