import React, { useState, useRef } from "react";
import './App.css'
import { FaPause, FaStop, FaPlay } from "react-icons/fa";
import { MdRestartAlt } from "react-icons/md";

function App() {

  const [time, setTime] = useState(0); // Time in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]); // Array to store lap times
  const [previousLapTime, setPreviousLapTime] = useState(0); // Last recorded lap time
  const timerRef = useRef(null); // Reference to the timer interval

  // Start or Resume the stopwatch
  const startStopwatch = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Increment by 10ms
      }, 10);
    }
  };

  // Pause the stopwatch
  const pauseStopwatch = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
  };

 // Stop the stopwatch and save the final time as a lap
  const stopStopwatch = () => {
    if (isRunning) {
      clearInterval(timerRef.current);  
      setIsRunning(false);
    }
  };


   // Reset the stopwatch and clear laps
   const resetStopwatch = () => {
    setTime(0);
    setLaps([]);
    clearInterval(timerRef.current);
    setIsRunning(false);
    setPreviousLapTime(0);
  };

   // Record a lap
   const recordLap = () => {
    const currentLapTime = time - previousLapTime; // Calculate the current lap time
    setLaps((prevLaps) => [
      ...prevLaps,
      {
        lapNumber: prevLaps.length + 1,
        lapTime: time,
        difference: currentLapTime,
      },
    ]);
    setPreviousLapTime(time); // Update the previous lap time to the current time
  };
  
  // Update formatTime to accept a time argument
const formatTime = (timeToFormat = time) => {
  const minutes = Math.floor(timeToFormat / 60000);
  const seconds = Math.floor((timeToFormat % 60000) / 1000);
  const milliseconds = Math.floor((timeToFormat % 1000) / 10);

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(2, "0")}`;
};

  return (
    <div className="w-screen h-screen bg-gray-300 pt-20 md:pt-12 lg:pt-2">
    <div className="w-full bg-gray-300 mx-auto text-center items-center py-24">
      <h1 className="text-4xl text-fuchsia-950">Stopwatch</h1>
      <div className="mt-10 text-6xl flex w-4/6 mx-auto text-center items-center justify-center">{formatTime()}</div>
      <div className="mt-20 w-full grid grid-cols-5 gap-4 px-2 md:px-0 md:w-4/6 mx-auto lg:w-3/6">
        <button onClick={startStopwatch} disabled={isRunning} className="h-[70px] w-[70px] md:w-[90px] md:h-[90px] bg-red-800 rounded-full text-base text-white md:text-2xl lg:text-3xl">
          <FaPlay className="w-auto mx-auto"/>
        </button>
        <button onClick={pauseStopwatch} disabled={!isRunning} className="h-[70px] w-[70px] md:w-[90px] md:h-[90px] bg-orange-800 rounded-full text-base text-white md:text-2xl lg:text-3xl">
          <FaPause className="w-auto mx-auto"/>
        </button>
        <button onClick={recordLap} disabled={!isRunning && time === 0} className="h-[70px] md:w-[90px] md:h-[90px] w-[70px] bg-yellow-800 rounded-full text-base text-white md:text-2xl lg:text-4+3xl">
          Lap
        </button>
        <button onClick={resetStopwatch} className="h-[70px] w-[70px] md:w-[90px] md:h-[90px] bg-green-800 rounded-full text-base text-white md:text-2xl lg:text-3xl">
          <MdRestartAlt className="w-auto mx-auto"/>
        </button>
        <button onClick={stopStopwatch} disabled={!isRunning && time === 0} className="h-[70px] w-[70px] md:w-[90px] md:h-[90px] bg-blue-800 rounded-full text-base text-white md:text-2xl lg:text-3xl text-center">
          <FaStop className="w-auto mx-auto"/>
        </button>
      </div>

      {laps.length > 0 && (
        <div className="laps-container mt-14">
          <h2 className="text-xl text-fuchsia-800 font-bold">Laps Recorded</h2>
          <ul className="mt-5 flex flex-col gap-1">
            {laps.map((lap) => (
              <li key={lap.lapNumber} className="text-gray-600 text-sm md:text-xl">
                <span>Lap {lap.lapNumber} - </span>
                <span>Total: {formatTime(lap.lapTime)}, </span>  
                <span>Interval: {formatTime(lap.difference)}</span>            
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </div>
  )
}

export default App
