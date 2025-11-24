import React from 'react'
import Clear from './icons/clear.svg';
import background2 from './image/city.png';
import wheathericon from './image/weathericons.gif';

function Errorpage() {
  return (
   
    <div className='w-full  flex flex-col  items-center justify-center'>
    <div className='w-fit h-96 flex items-center justify-center'>
      <img className='' src={wheathericon} alt="Weather Icon" />
      </div>
    <div className="text-red-600 text-2xl " >
    "Location not found error"
    </div>
    <div className='text-gray-300 '>This website shows Weather detail using your location <br/>Enable location and reload page to use this app</div>
  </div>

  )
}

export default Errorpage
