import { useState } from "react";

export default function useCountdown(endTime) {
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();

  setInterval(() => {
    const countTime = new Date(endTime);
    const currentTime = new Date();

    const diffInSec = (countTime - currentTime) / 1000; 

    if ( diffInSec >= 0) {  
      setDays(Math.floor(diffInSec / (60 * 60 * 24)));
      setHours(Math.floor((diffInSec % (60 * 60 * 24)) / (60 * 60)));
      setMinutes(Math.floor((diffInSec % (60 * 60)) / 60));
      setSeconds(Math.floor(diffInSec % 60));
    }
  
  }, 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}
