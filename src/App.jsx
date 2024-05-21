import React, { useEffect, useState } from "react";
import './App.css'

const App = () => {
  const [time, setTime] = useState(0)
  const [laps, setLaps] = useState([])
  const [isRunning, setIsRunning] = useState(false)

  const getMinutes = ms => ("0" + Math.floor((ms / 60 / 1000) % 60)).slice(-2)
  const getSeconds = ms => ("0" + Math.floor((ms / 1000) % 60)).slice(-2)
  const getMilliSeconds = ms => ("0" + (ms / 10) % 100).slice(-2)

  const formatTime = ms => `${getMinutes(ms)}:${getSeconds(ms)}.${getMilliSeconds(ms)}`

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => setTime(time => time + 10), 10);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (time) {
      const rest = laps.slice(0, laps.length - 1)
      let last = time - rest.reduce((acc, x) => acc + x, 0)
      setLaps([...rest, last])
    }

  }, [time])

  return (
    <div className="App text-center mt-5 p-5 ">
      <div className="contianer">
        <h1 className="text-center">Stopwatch</h1>
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4">
            <div className="display py-3 fs-1 rounded  ">{formatTime(time)}

              <div className="buttons fs-5">
                {!isRunning && !time && <button className="btn btn-success m-1" onClick={() => setIsRunning(true)}>Start</button>}
                {!isRunning && time > 0 && <button className="btn btn-primary m-1" onClick={() => setIsRunning(true)}>Resume</button>}
                {isRunning && <button className="btn btn-danger m-1" onClick={() => setIsRunning(false)}>Stop</button>}
                {!isRunning && time > 0 && <button className="btn btn-warning m-1" onClick={() => setTime(0)}>Reset</button>}
              </div>
            </div>
          </div>
          <div className="col-4"></div>
        </div>
      </div>

    </div>
  );
};

export default App;