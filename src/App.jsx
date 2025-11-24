import React, { useState, useEffect } from 'react';
import background from './image/background.png';
import background2 from './image/city.png';
import WeatherStat from './WeatherStat';
import Errorpage from './Errorpage';
import axios from 'axios';
import { API_KEY } from './apikey';
import { FaSearchLocation } from "react-icons/fa";
import clear from './icons/clear.svg';


function App() {
  const [weatherStats, setWeatherStats] = useState([]);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);
  const [value, setValue] = useState("");
  const [temp, setTemp] = useState(0);
  const [datetime, setDateTime] = useState(new Date());
  const [permissionStatus, setPermissionStatus] = useState();
  const [icons, setIcons] = useState();
  const [iconName, setIconName] = useState();




  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        setPermissionStatus(result.state);
        if (result.state === 'granted') {
          getLocation();
        } else if (result.state === 'prompt') {
          getLocation();
        } else if (result.state === 'denied') {
          setError("Geolocation permission denied");
          console.error("Geolocation permission denied");
        }
      });
    } else {
      getLocation(); // Fallback for browsers that do not support the Permissions API
    }
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setError(error.message);
          console.error(error.message); // Log the error message to the console
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      console.error("Geolocation is not supported by this browser.");
    }
  };




  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
      console.log(response.data);
      const data = response.data;
      setCity(data.name);
      setIconName(data.weather[0].main);
      setIcons(`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
      setCountry(data.sys.country);
      const Temperature = data.main.temp - 273.15
      setTemp(Temperature);
      setWeatherStats([
        { label: "Temperature", value: Temperature.toFixed(2) + "°C" },
        { label: "Humidity", value: data.main.humidity + "%" },
        { label: "Visibility", value: data.visibility + "m" },
        { label: "Wind speed", value: data.wind.speed + " km/h" },
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=1&appid=${API_KEY}`);
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setLocation({ latitude: lat, longitude: lon });
      } else {
        console.log("City not found");
      }
    } catch (error) {
      setError("Error fetching location data");
    }
  };

  useEffect(() => {
    if (location.latitude && location.longitude) {
      fetchWeatherData(location.latitude, location.longitude);
    }
  }, [location]);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString();
  };
  return (
    <div className='flex overflow-hidden flex-col bg-white '>
      <div className='text-black flex relative flex-col justify-center items-center px-16 py-20 w-full min-h-[750px] max-md:px-5 max-md:max-w-full'>
        <img src={background} alt="background" className='object-cover absolute inset-0 size-full ' />
        <div className='relative max-w-full bg-white w-[788px] overflow-hidden '
          style={{
            background: 'linear-gradient(to right, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0.4) 40%)'
          }}>
          {permissionStatus === "granted" ?
            (
              <div className='flex  max-md:flex-col'>
                <div className='flex flex-col w-[60%] max-md:ml-0 max-md:w-full relative'>
                  <img src={background2} alt="" className='object-cover grow w-full aspect-[2.07] max-md:h-96' />
                  <span className='absolute top-3 right-5 text-white text-2xl'>{city} </span>
                  <span className='absolute top-10 right-5 text-white text-2xl'>{country} </span>
                  <span className='absolute bottom-7 right-5 text-white text-5xl'>{temp.toFixed()}°C</span>
                  <span className='absolute bottom-15 left-7 text-white text-xl'>{formatTime(datetime)}</span>
                  <span className='absolute bottom-7 left-5 text-[17px] text-white text-xl'>{formatDate(datetime)}</span>
                </div>
                <div className='w-[40%] max-md:ml-0 max-md:w-full  relative bg-gray-900'>
                  <div className='flex flex-col items-center px-5 md:py-10 pt-1 mx-auto w-full text-sm font-light text-white relative  max-md:py-5 '>
                    <img className='w-44 h-32 relative' src={iconName === "Clear" ? clear : icons} alt="Cloudy Weather" />

                    <div className='text-3xl font-semibold text-center'>{iconName} </div>
                    <div className="shrink-0 self-stretch mt-5 mr-4 ml-4 border border-white border-solid h-[2px] max-md:mx-2.5" />
                    <div className="mt-4 text-base font-semibold text-center">
                      <input className='' type="text" value={value} onChange={handleInputChange} placeholder='search any city' />
                      <button onClick={handleSearch} ><FaSearchLocation /></button>
                    </div>
                    <div className="shrink-0 mt-3.5 h-px border border-white border-solid w-[158px]" />
                    <div className="mt-10 font-semibold text-center max-md:mt-8">
                      {city}, {country}
                    </div>
                    {weatherStats.map((stat, index) => (
                      <WeatherStat key={index} label={stat.label} value={stat.value} />
                    ))}
                  </div>
                </div>
              </div>
            ) : (<Errorpage />)}
        </div>
        <div className='relative text-gray-800  '>Weather App created by <span className='text-blue-200'>Akash Prajapati</span></div>
      </div>
    </div>
  );
}

export default App;
