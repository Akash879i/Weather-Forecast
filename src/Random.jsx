import * as React from "react";
import WeatherStat from "./WeatherStat";

const weatherStats = [
  { label: "Temperature", value: "23 c (Haza)" },
  { label: "Humidity", value: "38%" },
  { label: "Visibility", value: "3000 ml" },
  { label: "Wind speed", value: "3 km/h" }
];

function WeatherCard() {
  return (
    <div className="flex overflow-hidden flex-col bg-white">
      <div className="flex relative flex-col justify-center items-center px-16 py-20 w-full min-h-[750px] max-md:px-5 max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/fcca4f03f8a4dfab433a0c33bd668bf1bdc93204f8dc5c61f80ce3086cb1a7fb?placeholderIfAbsent=true&apiKey=f918f3ecbedd435cbe97acbb095aac50"
          alt=""
          className="object-cover absolute inset-0 size-full"
        />
        <div className="relative max-w-full bg-black w-[788px]">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-[61%] max-md:ml-0 max-md:w-full">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3be9b44cad33fe372167463c0dd7e33a13eaad5a5ddf7e13b7063df258d1a778?placeholderIfAbsent=true&apiKey=f918f3ecbedd435cbe97acbb095aac50"
                alt="Weather visualization"
                className="object-contain grow w-full aspect-[2.07] max-md:max-w-full"
              />
            </div>
            <div className="flex flex-col ml-5 w-[39%] max-md:ml-0 max-md:w-full">
              <div className="flex relative flex-col items-center px-5 py-32 mx-auto w-full text-sm font-light text-white bg-black max-md:py-24">
                <div className="text-3xl font-semibold text-center">Haza</div>
                <div className="shrink-0 self-stretch mt-5 mr-4 ml-4 w-full border border-white border-solid h-[3px] max-md:mx-2.5" />
                <div className="mt-3 text-base font-semibold text-center">
                  search any city
                </div>
                <div className="shrink-0 mt-3.5 h-px border border-white border-solid w-[158px]" />
                <div className="mt-12 font-semibold text-center max-md:mt-10">
                  Delhi, IN
                </div>
                <div className="shrink-0 self-stretch mt-5 h-1 border border-white border-solid" />
                {weatherStats.map((stat, index) => (
                  <WeatherStat
                    key={index}
                    label={stat.label}
                    value={stat.value}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;