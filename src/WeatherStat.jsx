import * as React from "react";

function WeatherStat({ label, value }) {
  return (
    <>
    <div className="shrink-0 self-stretch mt-4 border border-white border-solid h-[1px] opacity-30 " />
      <div className="flex gap-5 justify-between mt-2.5 max-w-full w-[239px]">
        <div className="">{label}</div>
        <div className="text-right">{value}</div>
      </div>
      
    </>
  );
}

export default WeatherStat;