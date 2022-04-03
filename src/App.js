import React from "react";
import { useState } from "react";
import { LogineContext } from "./Contexts/LogineContext";
import Weather from "./components/Weather/Weather";
import Header from "./components/Header/Header";
import Favorites from "./components/Favorites/Favorites";
import IconImg from "./assets/IconImg"
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Link,
  withRouter,
  Route,
} from "react-router-dom";

function App() {

 //main app code
  const [temps, setTemps] = useState([]);
  const [mode, setMode] = useState([]);
  const [city, setCity] = useState('');
  const [favourites, setFavourites] = useState([]);
  const [days, setDays] = useState([]);
  const [units, setUnits] = useState([]);

  return (
    <div className="App" >
      <LogineContext.Provider
        value={{
          city,
          setCity,
          temps,
          setTemps,
          mode,
          setMode,
          favourites,
          setFavourites,
          days, 
          setDays,  
          units,
          setUnits          
        }}
      >
        <Router>
          <Header />

          <Switch>
            <Favorites path="/Favorites" component={withRouter(Favorites)} />
            <Weather path="/Weather" component={withRouter(Weather)} />
            

          </Switch>
        </Router>



      </LogineContext.Provider>
    </div>
  );
}

export default App;


/* link to gh pages - https://ronmadar.github.io/appWeather/ */