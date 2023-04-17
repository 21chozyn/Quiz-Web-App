import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import { useTimer } from "react-timer-hook";

function milliseconds(seconds, minutes = 0) {
    
  return minutes * 60 + seconds;
}

const MyTimer = ({expiryTimestamp, time = 30}) => {
  const [ringColor, setRingColor] = useState("amber");
  const [dashArrayValue, setDashArrayValue] = useState(283);
  const [labelClassname, setLabelClass] = useState("base-timer__label");
  const [timeLeft, setTimeLeft] = useState(time);
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });
  const restartTimer = () => {
    const timE = new Date();
    timE.setSeconds(timE.getSeconds() + time);
    restart(timE)}

  useEffect(() => {
    setTimeLeft(milliseconds(seconds, minutes));
  }, [seconds]);

  useEffect(() => {
    const dashArrayVal = (timeLeft / time) * 283;
    if (timeLeft > 0) {
      setDashArrayValue(dashArrayVal);
    } 
    if (dashArrayVal > 140) {
      setRingColor("green");
    } else if (dashArrayVal > 70) {
      setRingColor("orange");
    } else {
      setRingColor("red");
    }
  }, [seconds]);

  useEffect(() => {
    setLabelClass("base-timer__label bounceAnimation");
    setTimeout(() => {
      setLabelClass("base-timer__label");
    }, 1200);
  }, [ringColor]);
  return (
    <>
      <div className={`timer-container `}>
        <div className="base-timer">
          <svg
            className="base-timer__svg"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g className="base-timer__circle">
              <circle
                className="base-timer__path-elapsed"
                cx="50"
                cy="50"
                r="45"
              />
              <path
                id="base-timer-path-remaining"
                strokeDasharray="283"
                className={`base-timer__path-remaining ${ringColor}`}
                style={{
                  stroke: ringColor,
                  strokeDasharray: `${dashArrayValue} 283`,
                }}
                d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0

        "
              ></path>
            </g>
          </svg>
          <span className={labelClassname}>{`${minutes}:${seconds}`}</span>
        </div>
      </div>
      {/* <div className="btn" onClick={start}>
        start
      </div>
      <div className="btn" onClick={() => {
        // Restarts to 5 minutes timer
        const timE = new Date();
        timE.setSeconds(timE.getSeconds() + time);
        restart(timE)
      }}>
        reset
      </div>
      <div className="btn" onClick={pause}>
        pause
      </div> */}
    </>
  );
};

export default MyTimer;
